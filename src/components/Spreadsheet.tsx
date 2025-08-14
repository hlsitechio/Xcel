import { useState, useCallback, useEffect } from "react";
import { FileMenu } from "./FileMenu";
import { FormulaBar } from "./FormulaBar";
import { ResizableSpreadsheetGrid } from "./ResizableSpreadsheetGrid";
import { ResponsiveLayout } from "./ResponsiveLayout";
import { AdaptiveToolbar } from "./AdaptiveToolbar";
import { FormulaParser } from "@/utils/formulaParser";
import { useToast } from "@/components/ui/use-toast";

const INITIAL_ROWS = 100;
const INITIAL_COLS = 26;

export const Spreadsheet = () => {
  const [data, setData] = useState<string[][]>(() =>
    Array(INITIAL_ROWS)
      .fill(null)
      .map(() => Array(INITIAL_COLS).fill(""))
  );
  const [imageData, setImageData] = useState<string[][]>([]);
  
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
  const { toast } = useToast();

  const handleCellChange = useCallback((row: number, col: number, value: string) => {
    setData(prevData => {
      const newData = prevData.map(r => [...r]);
      
      // Ensure the data array is large enough
      while (newData.length <= row) {
        newData.push(Array(newData[0]?.length || INITIAL_COLS).fill(""));
      }
      while (newData[row].length <= col) {
        newData[row].push("");
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
      
      return newData;
    });
  }, [toast]);

  const handleCellSelect = useCallback((row: number, col: number, event?: React.MouseEvent) => {
    if (row >= 0 && col >= 0) {
      const isCtrlKey = event?.ctrlKey || event?.metaKey;
      const isShiftKey = event?.shiftKey;
      
      if (isCtrlKey) {
        // Add new single-cell range to selection
        setSelectedRanges(prev => [...prev, {
          startRow: row,
          startCol: col,
          endRow: row,
          endCol: col
        }]);
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
    setData(prevData => {
      const newData = [
        ...prevData,
        Array(prevData[0]?.length || INITIAL_COLS).fill("")
      ];
      return newData;
    });
    toast({
      title: "Row Added",
      description: "New row added successfully",
    });
  }, [toast]);

  const addColumn = useCallback(() => {
    setData(prevData => {
      if (prevData.length === 0) {
        // If no data, create initial structure
        return Array(INITIAL_ROWS).fill(null).map(() => Array(1).fill(""));
      }
      return prevData.map(row => [...row, ""]);
    });
    toast({
      title: "Column Added", 
      description: "New column added successfully",
    });
  }, [toast]);

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
    return data[selectedCell.row]?.[selectedCell.col] || "";
  }, [selectedCell, data]);

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
    setData(prevData => {
      const currentCols = prevData[0]?.length || INITIAL_COLS;
      const newRows = Array(50).fill(null).map(() => Array(currentCols).fill(""));
      return [...prevData, ...newRows];
    });
  }, []);

  const handleLoadMoreCols = useCallback(() => {
    setData(prevData => {
      if (prevData.length === 0) {
        // If no data, create initial structure
        return Array(INITIAL_ROWS).fill(null).map(() => Array(10).fill(""));
      }
      return prevData.map(row => [...row, ...Array(10).fill("")]);
    });
  }, []);

  const handleImageUpload = useCallback((uploadedImageData: string[][], imageInfo: { width: number; height: number; cellsX: number; cellsY: number }) => {
    // Ensure data array is large enough to accommodate the image
    setData(prevData => {
      const newData = [...prevData];
      
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
      
      return newData;
    });

    // Set the image data
    setImageData(uploadedImageData);
    
    toast({
      title: "Image Loaded",
      description: `Image split into ${imageInfo.cellsX}×${imageInfo.cellsY} cells`,
    });
  }, [toast]);

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
      />
    </ResponsiveLayout>
  );
};