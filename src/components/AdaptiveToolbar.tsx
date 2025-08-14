import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { 
  ChevronDown, 
  ChevronUp,
  Menu,
  Download,
  Plus,
  ZoomIn,
  ZoomOut,
  Upload
} from "lucide-react";
import { RibbonTabs } from "./ribbon/RibbonTabs";
import { ImageUpload } from "./ImageUpload";
import { cn } from "@/lib/utils";

interface AdaptiveToolbarProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onExportCSV: () => void;
  onAddRow: () => void;
  onAddColumn: () => void;
  selectedCell: { row: number; col: number } | null;
  onImageUpload: (imageData: string[][], imageInfo: { width: number; height: number; cellsX: number; cellsY: number }) => void;
}

export const AdaptiveToolbar = ({
  zoom,
  onZoomIn,
  onZoomOut,
  onExportCSV,
  onAddRow,
  onAddColumn,
  selectedCell,
  onImageUpload
}: AdaptiveToolbarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Desktop/Tablet Ribbon - Always visible on larger screens */}
      <div className="hidden md:block">
        <RibbonTabs
          zoom={zoom}
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          onExportCSV={onExportCSV}
          onAddRow={onAddRow}
          onAddColumn={onAddColumn}
          selectedCell={selectedCell}
          onImageUpload={onImageUpload}
        />
      </div>

      {/* Mobile/Small Tablet Toolbar */}
      <div className="md:hidden">
        {/* Compact Toolbar */}
        <div className="bg-card border-b border-border px-2 py-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[60vh]">
                  <SheetHeader>
                    <SheetTitle>Formatting Tools</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">
                    <RibbonTabs
                      zoom={zoom}
                      onZoomIn={onZoomIn}
                      onZoomOut={onZoomOut}
                      onExportCSV={onExportCSV}
                      onAddRow={onAddRow}
                      onAddColumn={onAddColumn}
                      selectedCell={selectedCell}
                      onImageUpload={onImageUpload}
                    />
                    <div className="mt-4">
                      <ImageUpload onImageUpload={onImageUpload} />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Button variant="ghost" size="sm" onClick={onAddRow} className="h-8 px-2">
                <Plus className="h-3 w-3 mr-1" />
                <span className="text-xs">Row</span>
              </Button>

              <Button variant="ghost" size="sm" onClick={onAddColumn} className="h-8 px-2">
                <Plus className="h-3 w-3 mr-1" />
                <span className="text-xs">Col</span>
              </Button>
              
              <ImageUpload onImageUpload={onImageUpload} />
            </div>

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={onZoomOut} className="h-8 w-8 p-0">
                <ZoomOut className="h-3 w-3" />
              </Button>
              <span className="text-xs min-w-[2.5rem] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <Button variant="ghost" size="sm" onClick={onZoomIn} className="h-8 w-8 p-0">
                <ZoomIn className="h-3 w-3" />
              </Button>

              <Button variant="ghost" size="sm" onClick={onExportCSV} className="h-8 w-8 p-0">
                <Download className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Collapsible Extended Toolbar */}
        <div className={cn(
          "border-b border-border bg-muted/30 transition-all duration-200",
          isCollapsed ? "h-0 overflow-hidden" : "h-auto"
        )}>
          <div className="p-2">
            <div className="text-xs text-muted-foreground mb-2">Quick Format</div>
            {/* Add common formatting tools here in a compact layout */}
            <div className="flex flex-wrap gap-1">
              <Button variant="ghost" size="sm" className="h-8 text-xs">Bold</Button>
              <Button variant="ghost" size="sm" className="h-8 text-xs">Italic</Button>
              <Button variant="ghost" size="sm" className="h-8 text-xs">Left</Button>
              <Button variant="ghost" size="sm" className="h-8 text-xs">Center</Button>
              <Button variant="ghost" size="sm" className="h-8 text-xs">Right</Button>
            </div>
          </div>
        </div>

        {/* Toggle Button */}
        <div className="bg-muted/20 border-b border-border px-2 py-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full h-6 text-xs"
          >
            {isCollapsed ? (
              <>
                <ChevronDown className="h-3 w-3 mr-1" />
                Show Tools
              </>
            ) : (
              <>
                <ChevronUp className="h-3 w-3 mr-1" />
                Hide Tools
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};