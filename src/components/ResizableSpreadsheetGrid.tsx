import { useState, useCallback, useRef, useEffect, useMemo } from "react";
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
  const [baseColumnWidths, setBaseColumnWidths] = useState<number[]>([]);
  const [baseRowHeights, setBaseRowHeights] = useState<number[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const lastVisibleRangeRef = useRef({ startRow: 0, endRow: 50, startCol: 0, endCol: 26 });
  const [visibleRange, setVisibleRange] = useState({ 
    startRow: 0, 
    endRow: 50, 
    startCol: 0, 
    endCol: 26 
  });

  // Memoize scaled dimensions
  const columnWidths = useMemo(() => 
    baseColumnWidths.map(width => width * zoom), 
    [baseColumnWidths, zoom]
  );
  
  const rowHeights = useMemo(() => 
    baseRowHeights.map(height => height * zoom), 
    [baseRowHeights, zoom]
  );

  // Initialize base column widths and row heights (without zoom)
  useEffect(() => {
    const cols = Math.max(data[0]?.length || 26, 26);
    const rows = Math.max(data.length, 100);
    
    setBaseColumnWidths(prev => {
      if (prev.length < cols) {
        return [...prev, ...Array(cols - prev.length).fill(120)];
      }
      return prev;
    });
    
    setBaseRowHeights(prev => {
      if (prev.length < rows) {
        return [...prev, ...Array(rows - prev.length).fill(32)];
      }
      return prev;
    });
  }, [data, baseColumnWidths.length, baseRowHeights.length]);

  // Stable scroll handling to prevent flashing
  useEffect(() => {
    const handleScroll = () => {
      if (!gridRef.current) return;
      
      const { scrollTop, scrollLeft, clientHeight, clientWidth, scrollHeight, scrollWidth } = gridRef.current;
      
      // Calculate visible range with larger buffer to prevent constant updates
      const rowHeight = 32 * zoom;
      const colWidth = 120 * zoom;
      const headerHeight = 32 * zoom;
      const headerWidth = 60 * zoom;
      
      // Calculate with more generous buffers
      const bufferRows = 20;
      const bufferCols = 10;
      
      const startRow = Math.max(0, Math.floor((scrollTop - headerHeight) / rowHeight) - bufferRows);
      const endRow = Math.min(data.length + 50, startRow + Math.ceil(clientHeight / rowHeight) + bufferRows * 2);
      
      const startCol = Math.max(0, Math.floor((scrollLeft - headerWidth) / colWidth) - bufferCols);
      const endCol = Math.min((data[0]?.length || 26) + 30, startCol + Math.ceil(clientWidth / colWidth) + bufferCols * 2);
      
      const newRange = { startRow, endRow, startCol, endCol };
      const lastRange = lastVisibleRangeRef.current;
      
      // Only update if there's a really significant change to prevent flashing
      const shouldUpdate = 
        Math.abs(newRange.startRow - lastRange.startRow) > 10 ||
        Math.abs(newRange.endRow - lastRange.endRow) > 10 ||
        Math.abs(newRange.startCol - lastRange.startCol) > 5 ||
        Math.abs(newRange.endCol - lastRange.endCol) > 5;
      
      if (shouldUpdate) {
        lastVisibleRangeRef.current = newRange;
        setVisibleRange(newRange);
      }
      
      // Load more data when near the end (with very large buffer)
      if (scrollTop > scrollHeight - clientHeight - 3000) {
        onLoadMoreRows();
      }
      
      if (scrollLeft > scrollWidth - clientWidth - 3000) {
        onLoadMoreCols();
      }
    };

    const gridElement = gridRef.current;
    if (gridElement) {
      // Use passive scrolling for better performance
      gridElement.addEventListener('scroll', handleScroll, { passive: true });
      
      // Throttled initial call
      const timeoutId = setTimeout(handleScroll, 100);
      
      return () => {
        gridElement.removeEventListener('scroll', handleScroll);
        clearTimeout(timeoutId);
      };
    }
  }, [data, zoom, onLoadMoreRows, onLoadMoreCols]);

  const handleColumnResize = useCallback((colIndex: number, newWidth: number) => {
    const baseWidth = newWidth / zoom;
    setBaseColumnWidths(prev => {
      const newWidths = [...prev];
      // Ensure array is large enough
      while (newWidths.length <= colIndex) {
        newWidths.push(120);
      }
      newWidths[colIndex] = Math.max(50, baseWidth);
      return newWidths;
    });
  }, [zoom]);

  const handleRowResize = useCallback((rowIndex: number, newHeight: number) => {
    const baseHeight = newHeight / zoom;
    setBaseRowHeights(prev => {
      const newHeights = [...prev];
      // Ensure array is large enough
      while (newHeights.length <= rowIndex) {
        newHeights.push(32);
      }
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

  // Memoize total dimensions for better performance
  const totalWidth = useMemo(() => 
    columnWidths.reduce((sum, width) => sum + width, 60 * zoom), 
    [columnWidths, zoom]
  );
  
  const totalHeight = useMemo(() => 
    rowHeights.reduce((sum, height) => sum + height, 32 * zoom), 
    [rowHeights, zoom]
  );

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
          
          {/* Column headers - stable rendering */}
          {Array.from({ length: Math.min(visibleRange.endCol - visibleRange.startCol, 50) }, (_, i) => {
            const colIndex = visibleRange.startCol + i;
            return (
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
            );
          })}
        </div>

        {/* Data rows - stable rendering without excessive memoization */}
        {Array.from({ length: Math.min(visibleRange.endRow - visibleRange.startRow, 100) }, (_, i) => {
          const rowIndex = visibleRange.startRow + i;
          return (
            <div key={`row-${rowIndex}`} className="flex">
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
              {Array.from({ length: Math.min(visibleRange.endCol - visibleRange.startCol, 50) }, (_, j) => {
                const colIndex = visibleRange.startCol + j;
                return (
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
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};