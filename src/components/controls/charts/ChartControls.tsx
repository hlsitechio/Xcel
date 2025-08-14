import { Button } from "@/components/ui/button";
import { BarChart3, LineChart, PieChart } from "lucide-react";

export const ChartControls = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-xs text-muted-foreground font-medium">Charts</div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
          <BarChart3 className="h-4 w-4" />
          <span className="text-xs">Bar</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
          <LineChart className="h-4 w-4" />
          <span className="text-xs">Line</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
          <PieChart className="h-4 w-4" />
          <span className="text-xs">Pie</span>
        </Button>
      </div>
    </div>
  );
};