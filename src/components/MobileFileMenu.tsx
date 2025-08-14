import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { 
  Menu, 
  Download, 
  FileSpreadsheet, 
  Plus, 
  Settings,
  Palette,
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface MobileFileMenuProps {
  onExportCSV: () => void;
  onAddRow: () => void;
  onAddColumn: () => void;
}

export const MobileFileMenu = ({ onExportCSV, onAddRow, onAddColumn }: MobileFileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-primary" />
            Xcel Mobile
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {/* Quick Actions */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={onAddRow} className="h-12 flex-col gap-1">
                <Plus className="h-4 w-4" />
                <span className="text-xs">Add Row</span>
              </Button>
              <Button variant="outline" size="sm" onClick={onAddColumn} className="h-12 flex-col gap-1">
                <Plus className="h-4 w-4" />
                <span className="text-xs">Add Column</span>
              </Button>
              <Button variant="outline" size="sm" onClick={onExportCSV} className="h-12 flex-col gap-1">
                <Download className="h-4 w-4" />
                <span className="text-xs">Export CSV</span>
              </Button>
              <Button variant="outline" size="sm" className="h-12 flex-col gap-1">
                <Settings className="h-4 w-4" />
                <span className="text-xs">Settings</span>
              </Button>
            </div>
          </div>
          
          <Separator />
          
          {/* Formatting */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Formatting</h3>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="ghost" size="sm" className="h-10 flex-col gap-1">
                <Bold className="h-4 w-4" />
                <span className="text-xs">Bold</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-10 flex-col gap-1">
                <Italic className="h-4 w-4" />
                <span className="text-xs">Italic</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-10 flex-col gap-1">
                <Palette className="h-4 w-4" />
                <span className="text-xs">Color</span>
              </Button>
            </div>
          </div>
          
          <Separator />
          
          {/* Alignment */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Alignment</h3>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="ghost" size="sm" className="h-10 flex-col gap-1">
                <AlignLeft className="h-4 w-4" />
                <span className="text-xs">Left</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-10 flex-col gap-1">
                <AlignCenter className="h-4 w-4" />
                <span className="text-xs">Center</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-10 flex-col gap-1">
                <AlignRight className="h-4 w-4" />
                <span className="text-xs">Right</span>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};