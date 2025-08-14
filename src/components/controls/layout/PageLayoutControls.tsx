import { Button } from "@/components/ui/button";
import { Palette, FileText, Printer } from "lucide-react";

export const PageLayoutControls = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-xs text-muted-foreground font-medium">Page Setup</div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
          <Palette className="h-4 w-4" />
          <span className="text-xs">Themes</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
          <FileText className="h-4 w-4" />
          <span className="text-xs">Size</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
          <Printer className="h-4 w-4" />
          <span className="text-xs">Print</span>
        </Button>
      </div>
    </div>
  );
};