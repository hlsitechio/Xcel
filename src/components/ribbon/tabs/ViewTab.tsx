import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ZoomControls } from "@/components/controls/view/ZoomControls";
import { ViewModeControls } from "@/components/controls/view/ViewModeControls";
import { 
  Eye,
  Minimize,
  RotateCcw,
  Settings
} from "lucide-react";

interface ViewTabProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export const ViewTab = ({ zoom, onZoomIn, onZoomOut }: ViewTabProps) => {
  return (
    <div className="flex items-center gap-6">
      <ViewModeControls />

      <Separator orientation="vertical" className="h-16" />

      {/* Show Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Show</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <Eye className="h-4 w-4" />
            <span className="text-xs">Gridlines</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <Eye className="h-4 w-4" />
            <span className="text-xs">Headers</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      <ZoomControls zoom={zoom} onZoomIn={onZoomIn} onZoomOut={onZoomOut} />

      <Separator orientation="vertical" className="h-16" />

      {/* Window Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Window</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <Minimize className="h-4 w-4" />
            <span className="text-xs">Freeze</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <RotateCcw className="h-4 w-4" />
            <span className="text-xs">Split</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      {/* Macros Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Macros</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <Settings className="h-4 w-4" />
            <span className="text-xs">Macros</span>
          </Button>
        </div>
      </div>
    </div>
  );
};