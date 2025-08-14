import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, Check, X } from "lucide-react";

interface FormulaBarProps {
  selectedCell: { row: number; col: number } | null;
  cellValue: string;
  onFormulaSubmit: (formula: string) => void;
}

export const FormulaBar = ({ selectedCell, cellValue, onFormulaSubmit }: FormulaBarProps) => {
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
    <div className="flex items-center gap-3 p-3 border-b border-border bg-muted/30">
      <div className="flex items-center gap-2 min-w-20">
        <Calculator className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">
          {getCellAddress()}
        </span>
      </div>

      <div className="flex-1 flex items-center gap-2">
        <Input
          value={formula}
          onChange={(e) => {
            setFormula(e.target.value);
            setIsEditing(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Enter value or formula (e.g., =SUM(A1:A5))"
          className="flex-1"
        />
        {isEditing && (
          <div className="flex gap-1">
            <Button size="sm" variant="outline" onClick={handleSubmit}>
              <Check className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};