import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  ZoomIn,
  ZoomOut,
  Grid3x3,
  Eye,
  EyeOff,
  Maximize,
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
      {/* Views Group */}
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

      {/* Zoom Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Zoom</div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium min-w-[3rem] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <Button variant="ghost" size="sm" onClick={onZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>

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