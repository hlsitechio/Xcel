import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SpreadsheetCellProps {
  value: string;
  rowIndex: number;
  colIndex: number;
  isSelected: boolean;
  isHeader?: boolean;
  onValueChange: (row: number, col: number, value: string) => void;
  onCellSelect: (row: number, col: number) => void;
}

export const SpreadsheetCell = ({
  value,
  rowIndex,
  colIndex,
  isSelected,
  isHeader = false,
  onValueChange,
  onCellSelect,
}: SpreadsheetCellProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

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
    onCellSelect(rowIndex, colIndex);
  };

  if (isHeader) {
    return (
      <div
        className="h-8 min-w-20 flex items-center justify-center border-r border-b border-header-border bg-header-bg text-sm font-medium text-foreground cursor-default"
        onClick={handleClick}
      >
        {value}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "h-8 min-w-20 border-r border-b border-cell-border relative cursor-cell transition-colors",
        isSelected ? "bg-cell-selected ring-1 ring-primary" : "hover:bg-cell-hover"
      )}
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
        />
      ) : (
        <div className="h-full px-2 flex items-center text-sm text-foreground">
          {value}
        </div>
      )}
    </div>
  );
};