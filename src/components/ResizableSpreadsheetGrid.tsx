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

  // Optimized scroll handling with debouncing
  useEffect(() => {
    const handleScroll = () => {
      if (!gridRef.current) return;
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Debounce the scroll updates to reduce flashing
      scrollTimeoutRef.current = setTimeout(() => {
        if (!gridRef.current) return;
        
        const { scrollTop, scrollLeft, clientHeight, clientWidth, scrollHeight, scrollWidth } = gridRef.current;
        
        // Calculate visible rows and columns with buffer
        const rowHeight = 32 * zoom;
        const colWidth = 120 * zoom;
        const headerHeight = 32 * zoom;
        const headerWidth = 60 * zoom;
        
        const startRow = Math.max(0, Math.floor((scrollTop - headerHeight) / rowHeight) - 5);
        const endRow = Math.min(data.length + 20, startRow + Math.ceil(clientHeight / rowHeight) + 15);
        
        const startCol = Math.max(0, Math.floor((scrollLeft - headerWidth) / colWidth) - 5);
        const endCol = Math.min((data[0]?.length || 26) + 20, startCol + Math.ceil(clientWidth / colWidth) + 15);
        
        const newVisibleRange = { startRow, endRow, startCol, endCol };
        
        // Only update if the range has changed significantly (reduce flickering)
        setVisibleRange(prev => {
          const hasSignificantChange = 
            Math.abs(newVisibleRange.startRow - prev.startRow) > 3 ||
            Math.abs(newVisibleRange.endRow - prev.endRow) > 3 ||
            Math.abs(newVisibleRange.startCol - prev.startCol) > 3 ||
            Math.abs(newVisibleRange.endCol - prev.endCol) > 3;
            
          return hasSignificantChange ? newVisibleRange : prev;
        });
        
        // Load more data when near the end (with larger buffer to prevent frequent loads)
        if (scrollTop > scrollHeight - clientHeight - 2000) {
          onLoadMoreRows();
        }
        
        if (scrollLeft > scrollWidth - clientWidth - 2000) {
          onLoadMoreCols();
        }
      }, 16); // ~60fps debouncing
    };

    const gridElement = gridRef.current;
    if (gridElement) {
      gridElement.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial call
      
      return () => {
        gridElement.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
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
          
          {/* Column headers - memoized to prevent unnecessary re-renders */}
          {useMemo(() => 
            Array.from({ length: visibleRange.endCol }, (_, i) => i)
              .slice(visibleRange.startCol)
              .map((colIndex) => (
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
              )), [visibleRange.startCol, visibleRange.endCol, columnWidths, zoom, onCellChange, onCellSelect, handleColumnResize, handleRowResize]
          )}
        </div>

        {/* Data rows - memoized to prevent unnecessary re-renders */}
        {useMemo(() => 
          Array.from({ length: visibleRange.endRow }, (_, i) => i)
            .slice(visibleRange.startRow)
            .map((rowIndex) => (
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
                {Array.from({ length: visibleRange.endCol }, (_, i) => i)
                  .slice(visibleRange.startCol)
                  .map((colIndex) => (
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
            )), [visibleRange, data, selectedCell, columnWidths, rowHeights, zoom, onCellChange, onCellSelect, handleColumnResize, handleRowResize]
        )}
      </div>
    </div>
  );
};