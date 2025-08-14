import { useState, useCallback, useEffect, useRef } from "react";
import { FileMenu } from "./FileMenu";
import { FormulaBar } from "./FormulaBar";
import { ResizableSpreadsheetGrid } from "./ResizableSpreadsheetGrid";
import { ResponsiveLayout } from "./ResponsiveLayout";
import { AdaptiveToolbar } from "./AdaptiveToolbar";
import { FormulaParser } from "@/utils/formulaParser";
import { useToast } from "@/components/ui/use-toast";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useUndoRedo } from "@/hooks/useUndoRedo";

const INITIAL_ROWS = 100;
const INITIAL_COLS = 26;

export const Spreadsheet = () => {
  // Initialize default data structure
  const initialData = Array(INITIAL_ROWS)
    .fill(null)
    .map(() => Array(INITIAL_COLS).fill(""));
  
  // Undo/Redo state management with 50 levels of history
  const {
    currentState: data,
    pushState: pushDataState,
    undo,
    redo,
    canUndo,
    canRedo,
    historySize,
    currentPosition,
  } = useUndoRedo(initialData, 50);

  const [imageData, setImageData] = useState<string[][]>([]);
  const [clipboardData, setClipboardData] = useState<{
    values: string[][];
    images: string[][];
    type: 'copy' | 'cut';
    sourceRange: { startRow: number; startCol: number; endRow: number; endCol: number } | null;
  } | null>(null);
  
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [selectedRanges, setSelectedRanges] = useState<Array<{
    startRow: number;
    startCol: number;
    endRow: number;
    endCol: number;
  }>>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<{ row: number; col: number } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [currentEditingValue, setCurrentEditingValue] = useState<string>("");
  const { toast } = useToast();
  const gridRef = useRef<HTMLDivElement>(null);

  const handleCellChange = useCallback((row: number, col: number, value: string) => {
    const newData = data.map(r => [...r]);
    
    // Ensure the data array is large enough
    while (newData.length <= row) {
      newData.push(Array(newData[0]?.length || INITIAL_COLS).fill(""));
    }
    while (newData[row].length <= col) {
      newData[row].push("");
    }
    
    // If value is empty and there's image data, clear the image data too
    if (value === "" && imageData[row]?.[col]) {
      setImageData(prevImageData => {
        const newImageData = [...prevImageData];
        if (newImageData[row]) {
          newImageData[row] = [...newImageData[row]];
          newImageData[row][col] = "";
        }
        return newImageData;
      });
    }
    
    // Evaluate formula if it starts with =
    if (value.startsWith("=")) {
      try {
        const result = FormulaParser.evaluate(value, newData);
        newData[row][col] = result;
      } catch (error) {
        newData[row][col] = "#ERROR";
        toast({
          title: "Formula Error",
          description: "Invalid formula syntax",
          variant: "destructive",
        });
      }
    } else {
      newData[row][col] = value;
    }
    
    // Push to undo history
    pushDataState(newData);
    
    // Show warning when approaching history limit
    if (historySize >= 45) {
      toast({
        title: "History Nearly Full",
        description: `${50 - historySize} actions remaining in undo history`,
        variant: "default",
      });
    }
  }, [data, imageData, toast, pushDataState, historySize]);

  const handleCellSelect = useCallback((row: number, col: number, event?: React.MouseEvent) => {
    if (row >= 0 && col >= 0) {
      const isCtrlKey = event?.ctrlKey || event?.metaKey;
      const isShiftKey = event?.shiftKey;
      
      if (isCtrlKey) {
        // Check if this cell is within any existing range
        const cellInRangeIndex = selectedRanges.findIndex(range => 
          row >= range.startRow && row <= range.endRow &&
          col >= range.startCol && col <= range.endCol
        );
        
        if (cellInRangeIndex !== -1) {
          // Cell is within an existing range, remove it by creating individual cells for the rest
          const range = selectedRanges[cellInRangeIndex];
          const newRanges: typeof selectedRanges = [];
          
          // Create individual cell ranges for all cells in the original range except the clicked one
          for (let r = range.startRow; r <= range.endRow; r++) {
            for (let c = range.startCol; c <= range.endCol; c++) {
              // Skip the cell we want to deselect
              if (r === row && c === col) continue;
              
              // Add each remaining cell as an individual range
              newRanges.push({
                startRow: r,
                startCol: c,
                endRow: r,
                endCol: c
              });
            }
          }
          
          // Replace the original range with the new individual cell ranges
          setSelectedRanges(prev => [
            ...prev.slice(0, cellInRangeIndex),
            ...newRanges,
            ...prev.slice(cellInRangeIndex + 1)
          ]);
        } else {
          // Add new single-cell range to selection
          setSelectedRanges(prev => [...prev, {
            startRow: row,
            startCol: col,
            endRow: row,
            endCol: col
          }]);
        }
      } else if (isShiftKey && selectedCell) {
        // Extend selection from last selected cell
        const newRange = {
          startRow: Math.min(selectedCell.row, row),
          startCol: Math.min(selectedCell.col, col),
          endRow: Math.max(selectedCell.row, row),
          endCol: Math.max(selectedCell.col, col)
        };
        setSelectedRanges([newRange]);
      } else {
        // Normal single cell selection
        setSelectedRanges([{
          startRow: row,
          startCol: col,
          endRow: row,
          endCol: col
        }]);
      }
      
      setSelectedCell({ row, col });
    }
  }, [selectedCell]);

  const handleCellMouseDown = useCallback((row: number, col: number, event?: React.MouseEvent) => {
    if (row >= 0 && col >= 0 && !event?.ctrlKey && !event?.metaKey && !event?.shiftKey) {
      setIsSelecting(true);
      setSelectionStart({ row, col });
      handleCellSelect(row, col, event);
    }
  }, [handleCellSelect]);

  const handleCellMouseOver = useCallback((row: number, col: number) => {
    if (isSelecting && selectionStart) {
      const newRange = {
        startRow: Math.min(selectionStart.row, row),
        startCol: Math.min(selectionStart.col, col),
        endRow: Math.max(selectionStart.row, row),
        endCol: Math.max(selectionStart.col, col)
      };
      setSelectedRanges([newRange]);
    }
  }, [isSelecting, selectionStart]);

  const handleMouseUp = useCallback(() => {
    setIsSelecting(false);
    setSelectionStart(null);
  }, []);

  // Add global mouse up listener
  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp]);

  const isCellSelected = useCallback((row: number, col: number) => {
    return selectedRanges.some(range => 
      row >= range.startRow && row <= range.endRow &&
      col >= range.startCol && col <= range.endCol
    );
  }, [selectedRanges]);

  const handleFormulaSubmit = useCallback((formula: string) => {
    if (selectedCell) {
      handleCellChange(selectedCell.row, selectedCell.col, formula);
    }
  }, [selectedCell, handleCellChange]);

  const addRow = useCallback(() => {
    const newData = [
      ...data,
      Array(data[0]?.length || INITIAL_COLS).fill("")
    ];
    pushDataState(newData);
    
    toast({
      title: "Row Added",
      description: "New row added successfully",
    });
  }, [data, pushDataState, toast]);

  const addColumn = useCallback(() => {
    let newData;
    if (data.length === 0) {
      // If no data, create initial structure
      newData = Array(INITIAL_ROWS).fill(null).map(() => Array(1).fill(""));
    } else {
      newData = data.map(row => [...row, ""]);
    }
    pushDataState(newData);
    
    toast({
      title: "Column Added", 
      description: "New column added successfully",
    });
  }, [data, pushDataState, toast]);

  const exportCSV = useCallback(() => {
    const csvContent = data
      .map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(","))
      .join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "spreadsheet.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export Successful",
      description: "CSV file downloaded successfully",
    });
  }, [data, toast]);

  const getCurrentCellValue = useCallback(() => {
    if (!selectedCell || selectedCell.row < 0 || selectedCell.col < 0) {
      return "";
    }
    // Return the current editing value if available, otherwise return the stored data
    return currentEditingValue || data[selectedCell.row]?.[selectedCell.col] || "";
  }, [selectedCell, data, currentEditingValue]);

  const getSelectedCellsInfo = useCallback(() => {
    if (selectedRanges.length === 0) return "";
    
    if (selectedRanges.length === 1) {
      const range = selectedRanges[0];
      if (range.startRow === range.endRow && range.startCol === range.endCol) {
        return `${String.fromCharCode(65 + range.startCol)}${range.startRow + 1}`;
      } else {
        return `${String.fromCharCode(65 + range.startCol)}${range.startRow + 1}:${String.fromCharCode(65 + range.endCol)}${range.endRow + 1}`;
      }
    }
    
    return `${selectedRanges.length} ranges selected`;
  }, [selectedRanges]);

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(2, prev + 0.1));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(0.5, prev - 0.1));
  }, []);

  const handleLoadMoreRows = useCallback(() => {
    const currentCols = data[0]?.length || INITIAL_COLS;
    const newRows = Array(50).fill(null).map(() => Array(currentCols).fill(""));
    const newData = [...data, ...newRows];
    pushDataState(newData);
  }, [data, pushDataState]);

  const handleLoadMoreCols = useCallback(() => {
    let newData;
    if (data.length === 0) {
      // If no data, create initial structure
      newData = Array(INITIAL_ROWS).fill(null).map(() => Array(10).fill(""));
    } else {
      newData = data.map(row => [...row, ...Array(10).fill("")]);
    }
    pushDataState(newData);
  }, [data, pushDataState]);

  const handleImageUpload = useCallback((uploadedImageData: string[][], imageInfo: { width: number; height: number; cellsX: number; cellsY: number }) => {
    // Ensure data array is large enough to accommodate the image
    const newData = [...data];
    
    // Extend rows if needed
    while (newData.length < uploadedImageData.length) {
      const currentCols = newData[0]?.length || INITIAL_COLS;
      newData.push(Array(currentCols).fill(""));
    }
    
    // Extend columns if needed
    const maxCols = Math.max(imageInfo.cellsX, newData[0]?.length || 0);
    newData.forEach(row => {
      while (row.length < maxCols) {
        row.push("");
      }
    });
    
    pushDataState(newData);

    // Set the image data (ensure proper array structure)
    setImageData(prevImageData => {
      const newImageData = [...prevImageData];
      
      // Ensure imageData array is large enough
      while (newImageData.length < uploadedImageData.length) {
        newImageData.push([]);
      }
      
      uploadedImageData.forEach((row, rowIndex) => {
        if (!newImageData[rowIndex]) {
          newImageData[rowIndex] = [];
        }
        row.forEach((cellImage, colIndex) => {
          newImageData[rowIndex][colIndex] = cellImage;
        });
      });
      
      return newImageData;
    });
    
    toast({
      title: "Image Loaded",
      description: `Image split into ${imageInfo.cellsX}×${imageInfo.cellsY} cells. Press Delete to clear cell images.`,
    });
  }, [data, pushDataState, toast]);

  const handleDeleteSelectedCells = useCallback(() => {
    // Handle case when no selection exists
    if (selectedRanges.length === 0 && !selectedCell) return;

    const newData = data.map(row => [...row]);
    let cellsCleared = 0;
    
    // Handle selected ranges (multiple cells)
    if (selectedRanges.length > 0) {
      selectedRanges.forEach(range => {
        for (let row = range.startRow; row <= range.endRow; row++) {
          for (let col = range.startCol; col <= range.endCol; col++) {
            if (newData[row] && newData[row][col] !== undefined) {
              newData[row][col] = "";
              cellsCleared++;
            }
          }
        }
      });
    } 
    // Handle single selected cell
    else if (selectedCell) {
      if (newData[selectedCell.row] && newData[selectedCell.row][selectedCell.col] !== undefined) {
        newData[selectedCell.row][selectedCell.col] = "";
        cellsCleared = 1;
      }
    }
    
    pushDataState(newData);

    setImageData(prevImageData => {
      const newImageData = [...prevImageData];
      
      // Handle selected ranges (multiple cells)
      if (selectedRanges.length > 0) {
        selectedRanges.forEach(range => {
          for (let row = range.startRow; row <= range.endRow; row++) {
            for (let col = range.startCol; col <= range.endCol; col++) {
              if (newImageData[row] && newImageData[row][col] !== undefined) {
                newImageData[row][col] = "";
              }
            }
          }
        });
      } 
      // Handle single selected cell
      else if (selectedCell) {
        if (newImageData[selectedCell.row] && newImageData[selectedCell.row][selectedCell.col] !== undefined) {
          newImageData[selectedCell.row][selectedCell.col] = "";
        }
      }
      
      return newImageData;
    });

    toast({
      title: "Cells Cleared",
      description: `${cellsCleared} cell${cellsCleared > 1 ? 's' : ''} cleared successfully`,
    });
  }, [selectedRanges, selectedCell, data, pushDataState, toast]);

  // Enhanced selection functions for keyboard shortcuts
  const handleExtendSelection = useCallback((direction: 'up' | 'down' | 'left' | 'right', toEdge?: boolean) => {
    if (!selectedCell) return;

    let newRow = selectedCell.row;
    let newCol = selectedCell.col;

    if (toEdge) {
      // Extend to data edge
      switch (direction) {
        case 'up':
          newRow = 0;
          for (let row = selectedCell.row - 1; row >= 0; row--) {
            if (data[row]?.[selectedCell.col] && data[row][selectedCell.col].trim() !== '') {
              newRow = row;
              break;
            }
          }
          break;
        case 'down':
          newRow = data.length - 1;
          for (let row = selectedCell.row + 1; row < data.length; row++) {
            if (data[row]?.[selectedCell.col] && data[row][selectedCell.col].trim() !== '') {
              newRow = row;
            }
          }
          break;
        case 'left':
          newCol = 0;
          for (let col = selectedCell.col - 1; col >= 0; col--) {
            if (data[selectedCell.row]?.[col] && data[selectedCell.row][col].trim() !== '') {
              newCol = col;
              break;
            }
          }
          break;
        case 'right':
          const maxCol = data[0]?.length || 26;
          newCol = maxCol - 1;
          for (let col = selectedCell.col + 1; col < maxCol; col++) {
            if (data[selectedCell.row]?.[col] && data[selectedCell.row][col].trim() !== '') {
              newCol = col;
            }
          }
          break;
      }
    } else {
      // Extend by one cell
      switch (direction) {
        case 'up':
          newRow = Math.max(0, selectedCell.row - 1);
          break;
        case 'down':
          newRow = Math.min(data.length - 1, selectedCell.row + 1);
          break;
        case 'left':
          newCol = Math.max(0, selectedCell.col - 1);
          break;
        case 'right':
          const maxCol = data[0]?.length || 26;
          newCol = Math.min(maxCol - 1, selectedCell.col + 1);
          break;
      }
    }

    // Create extended selection range
    const newRange = {
      startRow: Math.min(selectedCell.row, newRow),
      startCol: Math.min(selectedCell.col, newCol),
      endRow: Math.max(selectedCell.row, newRow),
      endCol: Math.max(selectedCell.col, newCol)
    };

    setSelectedRanges([newRange]);
  }, [selectedCell, data]);

  const handleSelectAll = useCallback(() => {
    // Find the actual data bounds
    let maxRow = 0;
    let maxCol = 0;
    
    for (let row = 0; row < data.length; row++) {
      for (let col = 0; col < (data[row]?.length || 0); col++) {
        if (data[row][col] && data[row][col].trim() !== '') {
          maxRow = Math.max(maxRow, row);
          maxCol = Math.max(maxCol, col);
        }
      }
    }

    setSelectedRanges([{
      startRow: 0,
      startCol: 0,
      endRow: Math.max(maxRow, 20), // Minimum selection size
      endCol: Math.max(maxCol, 10)
    }]);
  }, [data]);

  const handleSelectRow = useCallback((row: number) => {
    const maxCol = data[0]?.length || 26;
    setSelectedRanges([{
      startRow: row,
      startCol: 0,
      endRow: row,
      endCol: maxCol - 1
    }]);
  }, [data]);

  const handleSelectColumn = useCallback((col: number) => {
    console.log('Selecting column:', col); // Debug log
    setSelectedRanges([{
      startRow: 0,
      startCol: col,
      endRow: data.length - 1,
      endCol: col
    }]);
    toast({
      title: "Column Selected",
      description: `Column ${String.fromCharCode(65 + col)} selected`,
    });
  }, [data, toast]);

  // Copy functionality
  const handleCopy = useCallback(() => {
    if (selectedRanges.length === 0 && selectedCell) {
      // Copy single cell
      const cellData = [[data[selectedCell.row]?.[selectedCell.col] || ""]];
      const cellImage = [[imageData[selectedCell.row]?.[selectedCell.col] || ""]];
      setClipboardData({
        values: cellData,
        images: cellImage,
        type: 'copy',
        sourceRange: {
          startRow: selectedCell.row,
          startCol: selectedCell.col,
          endRow: selectedCell.row,
          endCol: selectedCell.col
        }
      });
      toast({
        title: "Copied",
        description: "Cell copied to clipboard",
      });
    } else if (selectedRanges.length > 0) {
      // Copy selected range
      const range = selectedRanges[0];
      const copiedValues: string[][] = [];
      const copiedImages: string[][] = [];
      
      for (let row = range.startRow; row <= range.endRow; row++) {
        const rowValues: string[] = [];
        const rowImages: string[] = [];
        for (let col = range.startCol; col <= range.endCol; col++) {
          rowValues.push(data[row]?.[col] || "");
          rowImages.push(imageData[row]?.[col] || "");
        }
        copiedValues.push(rowValues);
        copiedImages.push(rowImages);
      }
      
      setClipboardData({
        values: copiedValues,
        images: copiedImages,
        type: 'copy',
        sourceRange: range
      });
      
      toast({
        title: "Copied",
        description: `${copiedValues.length}x${copiedValues[0]?.length || 0} range copied to clipboard`,
      });
    }
  }, [selectedCell, selectedRanges, data, imageData, toast]);

  // Cut functionality
  const handleCut = useCallback(() => {
    handleCopy(); // First copy the data
    if (clipboardData) {
      setClipboardData(prev => prev ? { ...prev, type: 'cut' } : null);
    }
    // Clear the cut cells
    handleDeleteSelectedCells();
    toast({
      title: "Cut",
      description: "Cells cut to clipboard",
    });
  }, [handleCopy, clipboardData, handleDeleteSelectedCells, toast]);

  // Paste functionality
  const handlePaste = useCallback(() => {
    if (!clipboardData || !selectedCell) {
      toast({
        title: "Nothing to Paste",
        description: "No data in clipboard or no cell selected",
        variant: "destructive"
      });
      return;
    }

    const startRow = selectedCell.row;
    const startCol = selectedCell.col;
    
    // Create new data arrays
    const newData = [...data];
    const newImageData = [...imageData];
    
    // Ensure arrays are large enough
    const requiredRows = startRow + clipboardData.values.length;
    const requiredCols = startCol + (clipboardData.values[0]?.length || 0);
    
    // Extend data arrays if needed
    while (newData.length < requiredRows) {
      newData.push(Array(INITIAL_COLS).fill(""));
    }
    while (newImageData.length < requiredRows) {
      newImageData.push(Array(INITIAL_COLS).fill(""));
    }
    
    // Paste the data
    clipboardData.values.forEach((row, rowOffset) => {
      row.forEach((value, colOffset) => {
        const targetRow = startRow + rowOffset;
        const targetCol = startCol + colOffset;
        
        if (targetRow < newData.length && targetCol < newData[targetRow].length) {
          newData[targetRow][targetCol] = value;
          newImageData[targetRow][targetCol] = clipboardData.images[rowOffset]?.[colOffset] || "";
        }
      });
    });
    
    pushDataState(newData);
    setImageData(newImageData);
    
    toast({
      title: "Pasted",
      description: `${clipboardData.values.length}x${clipboardData.values[0]?.length || 0} range pasted`,
    });
    
    // Clear clipboard if it was cut
    if (clipboardData.type === 'cut') {
      setClipboardData(null);
    }
  }, [clipboardData, selectedCell, data, imageData, toast, pushDataState]);

  // Initialize keyboard shortcuts with all functionality
  useKeyboardShortcuts({
    selectedCell,
    selectedRanges,
    data,
    imageData,
    onCellChange: handleCellChange,
    onCellSelect: handleCellSelect,
    onDeleteSelectedCells: handleDeleteSelectedCells,
    onExtendSelection: handleExtendSelection,
    onSelectAll: handleSelectAll,
    onSelectRow: handleSelectRow,
    onSelectColumn: handleSelectColumn,
    onUndo: undo,
    onRedo: redo,
    onCopy: handleCopy,
    onCut: handleCut,
    onPaste: handlePaste,
    gridRef
  });

  return (
    <ResponsiveLayout>
      {/* File Menu - Always visible */}
      <FileMenu onExportCSV={exportCSV} />
      
      {/* Adaptive Toolbar - Shows full ribbon on desktop, compact on mobile */}
      <AdaptiveToolbar
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onExportCSV={exportCSV}
        onAddRow={addRow}
        onAddColumn={addColumn}
        selectedCell={selectedCell}
        onImageUpload={handleImageUpload}
      />
      
      {/* Formula Bar - Responsive sizing */}
      <FormulaBar
        selectedCell={selectedCell}
        cellValue={getCurrentCellValue()}
        selectedInfo={getSelectedCellsInfo()}
        onFormulaSubmit={handleFormulaSubmit}
      />
      
      {/* Spreadsheet Grid - Adaptive sizing */}
      <ResizableSpreadsheetGrid
        ref={gridRef}
        data={data}
        selectedCell={selectedCell}
        selectedRanges={selectedRanges}
        onCellChange={handleCellChange}
        onCellSelect={handleCellSelect}
        onCellMouseDown={handleCellMouseDown}
        onCellMouseOver={handleCellMouseOver}
        isCellSelected={isCellSelected}
        zoom={zoom}
        onLoadMoreRows={handleLoadMoreRows}
        onLoadMoreCols={handleLoadMoreCols}
        imageData={imageData}
        onDeleteSelectedCells={handleDeleteSelectedCells}
        onEditingValueChange={setCurrentEditingValue}
      />
    </ResponsiveLayout>
  );
};