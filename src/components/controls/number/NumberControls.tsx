import { Button } from "@/components/ui/button";
import { Percent, DollarSign, Hash } from "lucide-react";

interface NumberControlsProps {
  onNumberFormatChange: (format: 'general' | 'percentage' | 'currency' | 'number') => void;
}

export const NumberControls = ({ onNumberFormatChange }: NumberControlsProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-xs text-muted-foreground font-medium">Number</div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1" onClick={() => onNumberFormatChange('percentage')}>
          <Percent className="h-4 w-4" />
          <span className="text-xs">%</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1" onClick={() => onNumberFormatChange('currency')}>
          <DollarSign className="h-4 w-4" />
          <span className="text-xs">$</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1" onClick={() => onNumberFormatChange('number')}>
          <Hash className="h-4 w-4" />
          <span className="text-xs">#</span>
        </Button>
      </div>
    </div>
  );
};