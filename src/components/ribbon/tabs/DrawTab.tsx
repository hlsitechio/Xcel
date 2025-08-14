import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Pen,
  Highlighter,
  Eraser,
  Circle,
  Square,
  Triangle,
  Pencil,
  PaintBucket
} from "lucide-react";

export const DrawTab = () => {
  return (
    <div className="flex items-center gap-6">
      {/* Tools Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Tools</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
            <Pen className="h-4 w-4" />
            <span className="text-xs">Draw</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
            <Pencil className="h-4 w-4" />
            <span className="text-xs">Pen</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
            <Highlighter className="h-4 w-4" />
            <span className="text-xs">Highlight</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
            <Eraser className="h-4 w-4" />
            <span className="text-xs">Erase</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      {/* Shapes Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Shapes</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
            <Circle className="h-4 w-4" />
            <span className="text-xs">Circle</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
            <Square className="h-4 w-4" />
            <span className="text-xs">Square</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
            <Triangle className="h-4 w-4" />
            <span className="text-xs">Triangle</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      {/* Formatting Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Formatting</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
            <PaintBucket className="h-4 w-4" />
            <span className="text-xs">Fill</span>
          </Button>
        </div>
      </div>
    </div>
  );
};