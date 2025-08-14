import { Button } from "@/components/ui/button";
import { Percent, DollarSign, Hash } from "lucide-react";

export const NumberControls = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-xs text-muted-foreground font-medium">Number</div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
          <Percent className="h-4 w-4" />
          <span className="text-xs">%</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
          <DollarSign className="h-4 w-4" />
          <span className="text-xs">$</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
          <Hash className="h-4 w-4" />
          <span className="text-xs">#</span>
        </Button>
      </div>
    </div>
  );
};