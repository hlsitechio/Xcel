import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormulaControls } from "@/components/controls/formulas/FormulaControls";
import { 
  Search,
  AlertTriangle,
  CheckCircle,
  Calculator
} from "lucide-react";

export const FormulasTab = () => {
  return (
    <div className="flex items-center gap-6">
      <FormulaControls />

      <Separator orientation="vertical" className="h-16" />

      {/* Defined Names Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Defined Names</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <Search className="h-4 w-4" />
            <span className="text-xs">Name</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      {/* Formula Auditing Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Formula Auditing</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xs">Trace</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <CheckCircle className="h-4 w-4" />
            <span className="text-xs">Check</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      {/* Calculation Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Calculation</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <Calculator className="h-4 w-4" />
            <span className="text-xs">Options</span>
          </Button>
        </div>
      </div>
    </div>
  );
};