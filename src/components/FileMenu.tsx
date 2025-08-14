import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  FileSpreadsheet, 
  Save, 
  FolderOpen, 
  Upload, 
  Download, 
  FileText, 
  Settings, 
  Share2,
  Grid3x3,
  Printer,
  Info
} from "lucide-react";

interface FileMenuProps {
  onExportCSV: () => void;
}

export const FileMenu = ({ onExportCSV }: FileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-card">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 text-primary font-semibold">
            <Grid3x3 className="h-4 w-4" />
            <FileSpreadsheet className="h-5 w-5" />
            <span>Xcel</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-primary" />
              Xcel
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            {/* New Section */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">New</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                  <FileText className="h-4 w-4 mr-3" />
                  Blank workbook
                </Button>
              </div>
            </div>

            <Separator />

            {/* Open Section */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Open</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <FolderOpen className="h-4 w-4 mr-3" />
                  Browse
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Upload className="h-4 w-4 mr-3" />
                  Upload
                </Button>
              </div>
            </div>

            <Separator />

            {/* Save Section */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Save</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Save className="h-4 w-4 mr-3" />
                  Save as
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={onExportCSV}>
                  <Download className="h-4 w-4 mr-3" />
                  Export as CSV
                </Button>
              </div>
            </div>

            <Separator />

            {/* Print Section */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Print</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Printer className="h-4 w-4 mr-3" />
                  Print
                </Button>
              </div>
            </div>

            <Separator />

            {/* Share Section */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Share</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Share2 className="h-4 w-4 mr-3" />
                  Share
                </Button>
              </div>
            </div>

            <Separator />

            {/* Account Section */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Account</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-3" />
                  Options
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Info className="h-4 w-4 mr-3" />
                  About
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex items-center gap-2 ml-auto">
        <Button variant="ghost" size="sm">
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
};