import { useState, useCallback } from "react";
import { FileMenu } from "./FileMenu";
import { RibbonTabs } from "./ribbon/RibbonTabs";
import { FormulaBar } from "./FormulaBar";
import { ResizableSpreadsheetGrid } from "./ResizableSpreadsheetGrid";
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
  
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
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

  const handleCellSelect = useCallback((row: number, col: number) => {
    if (row >= 0 && col >= 0) {
      setSelectedCell({ row, col });
    }
  }, []);

  const handleFormulaSubmit = useCallback((formula: string) => {
    if (selectedCell) {
      handleCellChange(selectedCell.row, selectedCell.col, formula);
    }
  }, [selectedCell, handleCellChange]);

  const addRow = useCallback(() => {
    setData(prevData => [
      ...prevData,
      Array(prevData[0]?.length || INITIAL_COLS).fill("")
    ]);
    toast({
      title: "Row Added",
      description: "New row added successfully",
    });
  }, [toast]);

  const addColumn = useCallback(() => {
    setData(prevData => prevData.map(row => [...row, ""]));
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

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(2, prev + 0.1));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(0.5, prev - 0.1));
  }, []);

  const handleLoadMoreRows = useCallback(() => {
    setData(prevData => [
      ...prevData,
      ...Array(50).fill(null).map(() => Array(prevData[0]?.length || INITIAL_COLS).fill(""))
    ]);
  }, []);

  const handleLoadMoreCols = useCallback(() => {
    setData(prevData => prevData.map(row => [...row, ...Array(10).fill("")]));
  }, []);

  return (
    <div className="h-screen flex flex-col bg-background">
      <FileMenu onExportCSV={exportCSV} />
      
      <RibbonTabs
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onExportCSV={exportCSV}
        onAddRow={addRow}
        onAddColumn={addColumn}
        selectedCell={selectedCell}
      />
      
      <FormulaBar
        selectedCell={selectedCell}
        cellValue={getCurrentCellValue()}
        onFormulaSubmit={handleFormulaSubmit}
      />
      
      <ResizableSpreadsheetGrid
        data={data}
        selectedCell={selectedCell}
        onCellChange={handleCellChange}
        onCellSelect={handleCellSelect}
        zoom={zoom}
        onLoadMoreRows={handleLoadMoreRows}
        onLoadMoreCols={handleLoadMoreCols}
      />
    </div>
  );
};