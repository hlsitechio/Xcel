import { Button } from "@/components/ui/button";
import { Grid3x3, Maximize, Eye } from "lucide-react";

export const ViewModeControls = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-xs text-muted-foreground font-medium">Views</div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
          <Grid3x3 className="h-4 w-4" />
          <span className="text-xs">Normal</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
          <Maximize className="h-4 w-4" />
          <span className="text-xs">Full</span>
        </Button>
      </div>
    </div>
  );
};