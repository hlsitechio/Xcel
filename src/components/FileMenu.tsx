import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FileSpreadsheet, Grid3x3 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { FileMenuHeader } from "./file-menu/FileMenuHeader";
import { NewSection } from "./file-menu/sections/NewSection";
import { OpenSection } from "./file-menu/sections/OpenSection";
import { SaveSection } from "./file-menu/sections/SaveSection";
import { PrintSection } from "./file-menu/sections/PrintSection";
import { ShareSection } from "./file-menu/sections/ShareSection";
import { AccountSection } from "./file-menu/sections/AccountSection";

interface FileMenuProps {
  onExportCSV: () => void;
}

export const FileMenu = ({ onExportCSV }: FileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <div className="flex items-center gap-2 px-2 md:px-4 py-2 border-b border-border bg-card">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-1 md:gap-2 text-primary font-semibold text-sm md:text-base">
            <Grid3x3 className="h-3 w-3 md:h-4 md:w-4" />
            <FileSpreadsheet className="h-4 w-4 md:h-5 md:w-5" />
            <span className="hidden sm:inline">Xcel</span>
          </Button>
        </SheetTrigger>
        
        <SheetContent side="left" className="w-72 md:w-80">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-primary" />
              Xcel
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            <NewSection onClose={handleClose} />
            <Separator />
            <OpenSection />
            <Separator />
            <SaveSection onExportCSV={onExportCSV} />
            <Separator />
            <PrintSection />
            <Separator />
            <ShareSection />
            <Separator />
            <AccountSection />
          </div>
        </SheetContent>
      </Sheet>

      <FileMenuHeader />
    </div>
  );
};