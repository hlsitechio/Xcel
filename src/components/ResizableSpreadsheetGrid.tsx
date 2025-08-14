import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { ResizableSpreadsheetCell } from "./ResizableSpreadsheetCell";

interface ResizableSpreadsheetGridProps {
  data: string[][];
  selectedCell: { row: number; col: number } | null;
  selectedRanges: Array<{
    startRow: number;
    startCol: number;
    endRow: number;
    endCol: number;
  }>;
  onCellChange: (row: number, col: number, value: string) => void;
  onCellSelect: (row: number, col: number, event?: React.MouseEvent) => void;
  onCellMouseDown: (row: number, col: number, event?: React.MouseEvent) => void;
  onCellMouseOver: (row: number, col: number) => void;
  isCellSelected: (row: number, col: number) => boolean;
  zoom: number;
  onLoadMoreRows: () => void;
  onLoadMoreCols: () => void;
}

export const ResizableSpreadsheetGrid = ({
  data,
  selectedCell,
  selectedRanges,
  onCellChange,
  onCellSelect,
  onCellMouseDown,
  onCellMouseOver,
  isCellSelected,
  zoom,
  onLoadMoreRows,
  onLoadMoreCols,
}: ResizableSpreadsheetGridProps) => {
  // Base state for dimensions (without zoom applied)
  const [baseColumnWidths, setBaseColumnWidths] = useState<number[]>(() => 
    Array(Math.min(data[0]?.length || 26, 26)).fill(120)
  );
  const [baseRowHeights, setBaseRowHeights] = useState<number[]>(() => 
    Array(Math.min(data.length, 50)).fill(32)
  );
  
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const isScrollingRef = useRef(false);
  const [visibleRange, setVisibleRange] = useState({ 
    startRow: 0, 
    endRow: 30, 
    startCol: 0, 
    endCol: 20 
  });

  // Calculate scaled dimensions
  const columnWidths = useMemo(() => 
    baseColumnWidths.map(width => width * zoom), 
    [baseColumnWidths, zoom]
  );
  
  const rowHeights = useMemo(() => 
    baseRowHeights.map(height => height * zoom), 
    [baseRowHeights, zoom]
  );

  // Update base dimensions when data changes (throttled)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const cols = Math.min(Math.max(data[0]?.length || 26, 26), 100); // Cap at 100 columns
      const rows = Math.min(Math.max(data.length, 50), 1000); // Cap at 1000 rows
      
      setBaseColumnWidths(prev => {
        if (prev.length < cols) {
          return [...prev, ...Array(cols - prev.length).fill(120)];
        }
        return prev.slice(0, cols);
      });
      
      setBaseRowHeights(prev => {
        if (prev.length < rows) {
          return [...prev, ...Array(rows - prev.length).fill(32)];
        }
        return prev.slice(0, rows);
      });
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [data]);

  // Highly optimized scroll handling
  useEffect(() => {
    const handleScroll = () => {
      if (!gridRef.current || isScrollingRef.current) return;
      
      isScrollingRef.current = true;
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Throttle updates heavily
      scrollTimeoutRef.current = setTimeout(() => {
        if (!gridRef.current) {
          isScrollingRef.current = false;
          return;
        }
        
        const { scrollTop, scrollLeft, clientHeight, clientWidth, scrollHeight, scrollWidth } = gridRef.current;
        
        // Calculate with minimal rendering window
        const rowHeight = 32 * zoom;
        const colWidth = 120 * zoom;
        
        // Very small visible window to reduce DOM nodes
        const visibleRows = Math.ceil(clientHeight / rowHeight);
        const visibleCols = Math.ceil(clientWidth / colWidth);
        
        const startRow = Math.max(0, Math.floor(scrollTop / rowHeight) - 5);
        const endRow = Math.min(data.length, startRow + visibleRows + 10);
        
        const startCol = Math.max(0, Math.floor(scrollLeft / colWidth) - 3);
        const endCol = Math.min(data[0]?.length || 26, startCol + visibleCols + 6);
        
        // Update state in batches
        setVisibleRange(prev => {
          const newRange = { startRow, endRow, startCol, endCol };
          
          // Only update if there's a substantial change
          if (
            Math.abs(newRange.startRow - prev.startRow) > 8 ||
            Math.abs(newRange.endRow - prev.endRow) > 8 ||
            Math.abs(newRange.startCol - prev.startCol) > 4 ||
            Math.abs(newRange.endCol - prev.endCol) > 4
          ) {
            return newRange;
          }
          return prev;
        });
        
        // Load more data with large threshold
        if (scrollTop > scrollHeight - clientHeight - 5000) {
          onLoadMoreRows();
        }
        
        if (scrollLeft > scrollWidth - clientWidth - 5000) {
          onLoadMoreCols();
        }
        
        isScrollingRef.current = false;
      }, 50); // Increased throttle time
    };

    const gridElement = gridRef.current;
    if (gridElement) {
      gridElement.addEventListener('scroll', handleScroll, { passive: true });
      
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
            onCellMouseDown={onCellMouseDown}
            onCellMouseOver={onCellMouseOver}
            onColumnResize={handleColumnResize}
            onRowResize={handleRowResize}
          />
          
          {/* Column headers - minimal rendering */}
          {Array.from({ length: Math.min(visibleRange.endCol - visibleRange.startCol, 20) }, (_, i) => {
            const colIndex = visibleRange.startCol + i;
            if (colIndex >= (data[0]?.length || 26)) return null;
            
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
                  onCellMouseDown={onCellMouseDown}
                  onCellMouseOver={onCellMouseOver}
                  onColumnResize={handleColumnResize}
                  onRowResize={handleRowResize}
                />
            );
          })}
        </div>

        {/* Data rows - performance optimized */}
        {Array.from({ length: Math.min(visibleRange.endRow - visibleRange.startRow, 30) }, (_, i) => {
          const rowIndex = visibleRange.startRow + i;
          if (rowIndex >= data.length) return null;
          
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
                onCellMouseDown={onCellMouseDown}
                onCellMouseOver={onCellMouseOver}
                onColumnResize={handleColumnResize}
                onRowResize={handleRowResize}
              />
              
              {/* Data cells - limited count */}
              {Array.from({ length: Math.min(visibleRange.endCol - visibleRange.startCol, 20) }, (_, j) => {
                const colIndex = visibleRange.startCol + j;
                if (colIndex >= (data[0]?.length || 26)) return null;
                
                return (
                  <ResizableSpreadsheetCell
                    key={`${rowIndex}-${colIndex}`}
                    value={data[rowIndex]?.[colIndex] || ""}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    isSelected={isCellSelected(rowIndex, colIndex)}
                    width={columnWidths[colIndex] || (120 * zoom)}
                    height={rowHeights[rowIndex] || (32 * zoom)}
                    onValueChange={onCellChange}
                    onCellSelect={onCellSelect}
                    onCellMouseDown={onCellMouseDown}
                    onCellMouseOver={onCellMouseOver}
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