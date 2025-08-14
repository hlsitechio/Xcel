import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PageLayoutControls } from "@/components/controls/layout/PageLayoutControls";
import { 
  Rows,
  Columns,
  AlignHorizontalJustifyCenter,
  Grid
} from "lucide-react";

export const PageLayoutTab = () => {
  return (
    <div className="flex items-center gap-6">
      {/* Themes Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Themes</div>
        <div className="flex items-center gap-1">
          <PageLayoutControls />
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      {/* Page Setup Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Page Setup</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <AlignHorizontalJustifyCenter className="h-4 w-4" />
            <span className="text-xs">Margins</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      {/* Scale to Fit Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Scale to Fit</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <Columns className="h-4 w-4" />
            <span className="text-xs">Width</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <Rows className="h-4 w-4" />
            <span className="text-xs">Height</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      {/* Sheet Options Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Sheet Options</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <Grid className="h-4 w-4" />
            <span className="text-xs">Gridlines</span>
          </Button>
        </div>
      </div>
    </div>
  );
};