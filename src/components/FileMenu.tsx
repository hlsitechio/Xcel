import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";
import { FileSpreadsheet, Grid3x3 } from "lucide-react";
import { FileMenuSheet } from "./file-menu/FileMenuSheet";
import { FileMenuHeader } from "./file-menu/FileMenuHeader";

interface FileMenuProps {
  onExportCSV: () => void;
}

export const FileMenu = ({ onExportCSV }: FileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-card">
      <FileMenuSheet 
        isOpen={isOpen} 
        onOpenChange={setIsOpen} 
        onExportCSV={onExportCSV} 
      />
      <SheetTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 text-primary font-semibold">
          <Grid3x3 className="h-4 w-4" />
          <FileSpreadsheet className="h-5 w-5" />
          <span>Xcel</span>
        </Button>
      </SheetTrigger>

      <FileMenuHeader />
    </div>
  );
};