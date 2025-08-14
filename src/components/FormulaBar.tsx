import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, Check, X } from "lucide-react";

interface FormulaBarProps {
  selectedCell: { row: number; col: number } | null;
  cellValue: string;
  selectedInfo?: string;
  onFormulaSubmit: (formula: string) => void;
}

export const FormulaBar = ({ selectedCell, cellValue, selectedInfo, onFormulaSubmit }: FormulaBarProps) => {
  const [formula, setFormula] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setFormula(cellValue);
    setIsEditing(false);
  }, [cellValue, selectedCell]);

  const getCellAddress = () => {
    if (!selectedCell || selectedCell.row === -1 || selectedCell.col === -1) {
      return "";
    }
    return `${String.fromCharCode(65 + selectedCell.col)}${selectedCell.row + 1}`;
  };

  const handleSubmit = () => {
    onFormulaSubmit(formula);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormula(cellValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 border-b border-border bg-muted/30 text-xs md:text-sm md:gap-3 md:p-3">
      <div className="flex items-center gap-1 px-1 py-1 bg-muted/30 border-r border-border min-w-[80px] md:min-w-[120px] md:gap-2 md:px-2">
        <span className="text-xs font-medium text-muted-foreground hidden md:inline">Cell:</span>
        <span className="text-xs font-mono md:text-sm">
          {selectedInfo || getCellAddress()}
        </span>
      </div>

      <div className="flex-1 flex items-center gap-1 md:gap-2">
        <Input
          value={formula}
          onChange={(e) => {
            setFormula(e.target.value);
            setIsEditing(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Enter value or formula"
          className="flex-1 text-xs md:text-sm"
        />
        {isEditing && (
          <div className="flex gap-1">
            <Button size="sm" variant="outline" onClick={handleSubmit} className="h-7 w-7 p-0 md:h-8 md:w-8">
              <Check className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel} className="h-7 w-7 p-0 md:h-8 md:w-8">
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};