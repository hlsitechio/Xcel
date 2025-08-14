import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CellControlsProps {
  onAddRow: () => void;
  onAddColumn: () => void;
}

export const CellControls = ({ onAddRow, onAddColumn }: CellControlsProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-xs text-muted-foreground font-medium">Cells</div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1" onClick={onAddRow}>
          <Plus className="h-4 w-4" />
          <span className="text-xs">Row</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1" onClick={onAddColumn}>
          <Plus className="h-4 w-4" />
          <span className="text-xs">Col</span>
        </Button>
      </div>
    </div>
  );
};