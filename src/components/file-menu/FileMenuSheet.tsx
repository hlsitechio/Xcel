import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FileSpreadsheet } from "lucide-react";
import { NewSection } from "./sections/NewSection";
import { OpenSection } from "./sections/OpenSection";
import { SaveSection } from "./sections/SaveSection";
import { PrintSection } from "./sections/PrintSection";
import { ShareSection } from "./sections/ShareSection";
import { AccountSection } from "./sections/AccountSection";

interface FileMenuSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onExportCSV: () => void;
}

export const FileMenuSheet = ({ isOpen, onOpenChange, onExportCSV }: FileMenuSheetProps) => {
  const handleClose = () => onOpenChange(false);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-80">
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
  );
};