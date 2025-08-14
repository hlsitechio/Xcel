import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ResizableSpreadsheetCellProps {
  value: string;
  rowIndex: number;
  colIndex: number;
  isSelected: boolean;
  isHeader?: boolean;
  width: number;
  height: number;
  imageData?: string;
  onValueChange: (row: number, col: number, value: string) => void;
  onCellSelect: (row: number, col: number, event?: React.MouseEvent) => void;
  onCellMouseDown?: (row: number, col: number, event?: React.MouseEvent) => void;
  onCellMouseOver?: (row: number, col: number) => void;
  onColumnResize: (colIndex: number, newWidth: number) => void;
  onRowResize: (rowIndex: number, newHeight: number) => void;
}

export const ResizableSpreadsheetCell = ({
  value,
  rowIndex,
  colIndex,
  isSelected,
  isHeader = false,
  width,
  height,
  imageData,
  onValueChange,
  onCellSelect,
  onCellMouseDown,
  onCellMouseOver,
  onColumnResize,
  onRowResize,
}: ResizableSpreadsheetCellProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isResizing, setIsResizing] = useState<'column' | 'row' | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    if (!isHeader) {
      setIsEditing(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isEditing) {
      if (e.key === "Enter") {
        handleSave();
      } else if (e.key === "Escape") {
        setEditValue(value);
        setIsEditing(false);
      }
    } else {
      // Handle keys when not editing
      if (e.key === "Delete" || e.key === "Backspace") {
        // Clear both text and image data
        onValueChange(rowIndex, colIndex, "");
        setEditValue("");
      } else if (e.key === "Enter" || e.key === "F2") {
        setIsEditing(true);
      }
    }
  };

  const handleSave = () => {
    onValueChange(rowIndex, colIndex, editValue);
    setIsEditing(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isResizing) {
      onCellSelect(rowIndex, colIndex, e);
      // Focus the cell for keyboard events
      if (cellRef.current) {
        cellRef.current.focus();
      }
    }
  };

  const handleCellMouseDown = (e: React.MouseEvent) => {
    if (!isHeader && onCellMouseDown) {
      onCellMouseDown(rowIndex, colIndex, e);
    }
  };

  const handleCellMouseOver = () => {
    if (!isHeader && onCellMouseOver) {
      onCellMouseOver(rowIndex, colIndex);
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent, type: 'column' | 'row') => {
    if (!isHeader) return;
    
    e.preventDefault();
    setIsResizing(type);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = width;
    const startHeight = height;

    const handleMouseMove = (e: MouseEvent) => {
      if (type === 'column') {
        const newWidth = startWidth + (e.clientX - startX);
        onColumnResize(colIndex, newWidth);
      } else {
        const newHeight = startHeight + (e.clientY - startY);
        onRowResize(rowIndex, newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  if (isHeader) {
    return (
      <div
        ref={cellRef}
        className="relative border-r border-b border-header-border bg-header-bg text-sm font-medium text-foreground cursor-default flex items-center justify-center"
        style={{ width, height, minWidth: width, minHeight: height }}
        onClick={handleClick}
      >
        {value}
        
        {/* Column resize handle */}
        {colIndex >= 0 && (
          <div
            className="absolute right-0 top-0 w-2 h-full cursor-col-resize hover:bg-primary/20"
            onMouseDown={(e) => handleResizeMouseDown(e, 'column')}
          />
        )}
        
        {/* Row resize handle */}
        {rowIndex >= 0 && (
          <div
            className="absolute bottom-0 left-0 w-full h-2 cursor-row-resize hover:bg-primary/20"
            onMouseDown={(e) => handleResizeMouseDown(e, 'row')}
          />
        )}
      </div>
    );
  }

  return (
    <div
      ref={cellRef}
      className={cn(
        "relative border-r border-b border-cell-border cursor-cell transition-colors flex items-center select-none",
        isSelected ? "bg-cell-selected ring-1 ring-primary" : "hover:bg-cell-hover"
      )}
      style={{ width, height, minWidth: width, minHeight: height }}
      onClick={handleClick}
      onMouseDown={handleCellMouseDown}
      onMouseOver={handleCellMouseOver}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isSelected ? 0 : -1}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => {
            e.stopPropagation();
            handleKeyDown(e);
          }}
          onBlur={handleSave}
          className="w-full h-full px-2 text-sm bg-transparent outline-none"
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <div className="w-full h-full relative overflow-hidden">
          {imageData ? (
            <>
              <img
                src={imageData}
                alt="Cell content"
                className="w-full h-full object-cover pointer-events-none"
                style={{ objectFit: 'cover', objectPosition: 'top left' }}
              />
              {/* Overlay for interactions */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-colors">
                {value && (
                  <div className="px-1 text-xs text-white bg-black/70 rounded max-w-full truncate">
                    {value}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="w-full h-full px-2 flex items-center text-sm text-foreground">
              {value}
            </div>
          )}
        </div>
      )}
    </div>
  );
};