import { Button } from "@/components/ui/button";
import { Save, FolderOpen, Download } from "lucide-react";

interface FileControlsProps {
  onExportCSV: () => void;
}

export const FileControls = ({ onExportCSV }: FileControlsProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-xs text-muted-foreground font-medium">File</div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
          <Save className="h-4 w-4" />
          <span className="text-xs">Save</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
          <FolderOpen className="h-4 w-4" />
          <span className="text-xs">Open</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1" onClick={onExportCSV}>
          <Download className="h-4 w-4" />
          <span className="text-xs">Export</span>
        </Button>
      </div>
    </div>
  );
};