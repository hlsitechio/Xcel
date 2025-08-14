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
  onValueChange: (row: number, col: number, value: string) => void;
  onCellSelect: (row: number, col: number) => void;
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
  onValueChange,
  onCellSelect,
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
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  const handleSave = () => {
    onValueChange(rowIndex, colIndex, editValue);
    setIsEditing(false);
  };

  const handleClick = () => {
    if (!isResizing) {
      onCellSelect(rowIndex, colIndex);
    }
  };

  const handleMouseDown = (e: React.MouseEvent, type: 'column' | 'row') => {
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
            onMouseDown={(e) => handleMouseDown(e, 'column')}
          />
        )}
        
        {/* Row resize handle */}
        {rowIndex >= 0 && (
          <div
            className="absolute bottom-0 left-0 w-full h-2 cursor-row-resize hover:bg-primary/20"
            onMouseDown={(e) => handleMouseDown(e, 'row')}
          />
        )}
      </div>
    );
  }

  return (
    <div
      ref={cellRef}
      className={cn(
        "relative border-r border-b border-cell-border cursor-cell transition-colors flex items-center",
        isSelected ? "bg-cell-selected ring-1 ring-primary" : "hover:bg-cell-hover"
      )}
      style={{ width, height, minWidth: width, minHeight: height }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="w-full h-full px-2 text-sm bg-transparent outline-none"
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <div className="w-full h-full px-2 flex items-center text-sm text-foreground overflow-hidden">
          {value}
        </div>
      )}
    </div>
  );
};