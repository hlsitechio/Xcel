import { useState, useCallback, useRef, useEffect } from "react";
import { ResizableSpreadsheetCell } from "./ResizableSpreadsheetCell";

interface ResizableSpreadsheetGridProps {
  data: string[][];
  selectedCell: { row: number; col: number } | null;
  onCellChange: (row: number, col: number, value: string) => void;
  onCellSelect: (row: number, col: number) => void;
  zoom: number;
  onLoadMoreRows: () => void;
  onLoadMoreCols: () => void;
}

export const ResizableSpreadsheetGrid = ({
  data,
  selectedCell,
  onCellChange,
  onCellSelect,
  zoom,
  onLoadMoreRows,
  onLoadMoreCols,
}: ResizableSpreadsheetGridProps) => {
  const [columnWidths, setColumnWidths] = useState<number[]>([]);
  const [rowHeights, setRowHeights] = useState<number[]>([]);
  const [baseColumnWidths, setBaseColumnWidths] = useState<number[]>([]);
  const [baseRowHeights, setBaseRowHeights] = useState<number[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const [visibleRange, setVisibleRange] = useState({ 
    startRow: 0, 
    endRow: 50, 
    startCol: 0, 
    endCol: 26 
  });

  // Initialize base column widths and row heights (without zoom)
  useEffect(() => {
    const cols = Math.max(data[0]?.length || 26, 26);
    const rows = Math.max(data.length, 100);
    
    if (baseColumnWidths.length < cols) {
      setBaseColumnWidths(prev => [
        ...prev,
        ...Array(cols - prev.length).fill(120)
      ]);
    }
    
    if (baseRowHeights.length < rows) {
      setBaseRowHeights(prev => [
        ...prev,
        ...Array(rows - prev.length).fill(32)
      ]);
    }
  }, [data, baseColumnWidths.length, baseRowHeights.length]);

  // Update actual sizes when zoom or base sizes change
  useEffect(() => {
    setColumnWidths(baseColumnWidths.map(width => width * zoom));
    setRowHeights(baseRowHeights.map(height => height * zoom));
  }, [baseColumnWidths, baseRowHeights, zoom]);

  // Infinite scroll handling
  useEffect(() => {
    const handleScroll = () => {
      if (!gridRef.current) return;
      
      const { scrollTop, scrollLeft, clientHeight, clientWidth, scrollHeight, scrollWidth } = gridRef.current;
      
      // Calculate visible rows and columns based on scroll position (accounting for zoom)
      let currentRow = 0;
      let currentHeight = 32 * zoom; // header height
      
      while (currentHeight < scrollTop && currentRow < rowHeights.length) {
        currentHeight += rowHeights[currentRow] || (32 * zoom);
        currentRow++;
      }
      
      let currentCol = 0;
      let currentWidth = 60 * zoom; // row header width
      
      while (currentWidth < scrollLeft && currentCol < columnWidths.length) {
        currentWidth += columnWidths[currentCol] || (120 * zoom);
        currentCol++;
      }
      
      const visibleRows = Math.ceil(clientHeight / (32 * zoom)) + 10;
      const visibleCols = Math.ceil(clientWidth / (120 * zoom)) + 10;
      
      const newVisibleRange = {
        startRow: Math.max(0, currentRow - 5),
        endRow: Math.min(data.length + 20, currentRow + visibleRows),
        startCol: Math.max(0, currentCol - 5),
        endCol: Math.min((data[0]?.length || 26) + 20, currentCol + visibleCols)
      };
      
      // Only update if the range has changed significantly
      if (
        Math.abs(newVisibleRange.startRow - visibleRange.startRow) > 2 ||
        Math.abs(newVisibleRange.endRow - visibleRange.endRow) > 2 ||
        Math.abs(newVisibleRange.startCol - visibleRange.startCol) > 2 ||
        Math.abs(newVisibleRange.endCol - visibleRange.endCol) > 2
      ) {
        setVisibleRange(newVisibleRange);
      }
      
      // Load more data when near the end
      if (scrollTop > scrollHeight - clientHeight - 1000) {
        onLoadMoreRows();
      }
      
      if (scrollLeft > scrollWidth - clientWidth - 1000) {
        onLoadMoreCols();
      }
    };

    const gridElement = gridRef.current;
    if (gridElement) {
      gridElement.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial call
      
      return () => gridElement.removeEventListener('scroll', handleScroll);
    }
  }, [data, rowHeights, columnWidths, zoom, onLoadMoreRows, onLoadMoreCols, visibleRange]);

  const handleColumnResize = useCallback((colIndex: number, newWidth: number) => {
    const baseWidth = newWidth / zoom;
    setBaseColumnWidths(prev => {
      const newWidths = [...prev];
      newWidths[colIndex] = Math.max(50, baseWidth);
      return newWidths;
    });
  }, [zoom]);

  const handleRowResize = useCallback((rowIndex: number, newHeight: number) => {
    const baseHeight = newHeight / zoom;
    setBaseRowHeights(prev => {
      const newHeights = [...prev];
      newHeights[rowIndex] = Math.max(20, baseHeight);
      return newHeights;
    });
  }, [zoom]);

  const getColumnHeader = (index: number): string => {
    let result = '';
    let temp = index;
    
    do {
      result = String.fromCharCode(65 + (temp % 26)) + result;
      temp = Math.floor(temp / 26) - 1;
    } while (temp >= 0);
    
    return result;
  };

  // Calculate total dimensions for proper scrolling
  const totalWidth = columnWidths.reduce((sum, width) => sum + width, 60 * zoom);
  const totalHeight = rowHeights.reduce((sum, height) => sum + height, 32 * zoom);

  return (
    <div 
      ref={gridRef}
      className="flex-1 overflow-auto bg-background relative"
    >
      <div 
        className="relative"
        style={{ 
          width: totalWidth, 
          height: totalHeight,
          minWidth: '100%',
          minHeight: '100%'
        }}
      >
        {/* Header row */}
        <div className="flex sticky top-0 z-20 bg-background">
          {/* Empty corner cell */}
          <ResizableSpreadsheetCell
            value=""
            rowIndex={-1}
            colIndex={-1}
            isSelected={false}
            isHeader={true}
            width={60 * zoom}
            height={32 * zoom}
            onValueChange={onCellChange}
            onCellSelect={onCellSelect}
            onColumnResize={handleColumnResize}
            onRowResize={handleRowResize}
          />
          
          {/* Column headers */}
          {Array.from({ length: visibleRange.endCol }, (_, i) => i).slice(visibleRange.startCol).map((colIndex) => (
            <ResizableSpreadsheetCell
              key={`header-${colIndex}`}
              value={getColumnHeader(colIndex)}
              rowIndex={-1}
              colIndex={colIndex}
              isSelected={false}
              isHeader={true}
              width={columnWidths[colIndex] || (120 * zoom)}
              height={32 * zoom}
              onValueChange={onCellChange}
              onCellSelect={onCellSelect}
              onColumnResize={handleColumnResize}
              onRowResize={handleRowResize}
            />
          ))}
        </div>

        {/* Data rows */}
        {Array.from({ length: visibleRange.endRow }, (_, i) => i).slice(visibleRange.startRow).map((rowIndex) => (
          <div key={rowIndex} className="flex">
            {/* Row header */}
            <ResizableSpreadsheetCell
              value={(rowIndex + 1).toString()}
              rowIndex={rowIndex}
              colIndex={-1}
              isSelected={false}
              isHeader={true}
              width={60 * zoom}
              height={rowHeights[rowIndex] || (32 * zoom)}
              onValueChange={onCellChange}
              onCellSelect={onCellSelect}
              onColumnResize={handleColumnResize}
              onRowResize={handleRowResize}
            />
            
            {/* Data cells */}
            {Array.from({ length: visibleRange.endCol }, (_, i) => i).slice(visibleRange.startCol).map((colIndex) => (
              <ResizableSpreadsheetCell
                key={`${rowIndex}-${colIndex}`}
                value={data[rowIndex]?.[colIndex] || ""}
                rowIndex={rowIndex}
                colIndex={colIndex}
                isSelected={
                  selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                }
                width={columnWidths[colIndex] || (120 * zoom)}
                height={rowHeights[rowIndex] || (32 * zoom)}
                onValueChange={onCellChange}
                onCellSelect={onCellSelect}
                onColumnResize={handleColumnResize}
                onRowResize={handleRowResize}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};