import { Button } from "@/components/ui/button";
import { Calculator, Sigma, TrendingUp, Calendar, Type } from "lucide-react";

export const FormulaControls = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-xs text-muted-foreground font-medium">Function Library</div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
          <Sigma className="h-4 w-4" />
          <span className="text-xs">Insert</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
          <Calculator className="h-4 w-4" />
          <span className="text-xs">Math</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
          <TrendingUp className="h-4 w-4" />
          <span className="text-xs">Stats</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
          <Calendar className="h-4 w-4" />
          <span className="text-xs">Date</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
          <Type className="h-4 w-4" />
          <span className="text-xs">Text</span>
        </Button>
      </div>
    </div>
  );
};