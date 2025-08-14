import { Button } from "@/components/ui/button";
import { Download, Plus, FileSpreadsheet } from "lucide-react";

interface SpreadsheetHeaderProps {
  onExportCSV: () => void;
  onAddRow: () => void;
  onAddColumn: () => void;
}

export const SpreadsheetHeader = ({ onExportCSV, onAddRow, onAddColumn }: SpreadsheetHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-card">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <img src="/lovable-uploads/f8a05b95-eea0-4f33-ad2f-4dccac2f41ec.png" alt="Xcel Logo" className="h-6 w-6" />
          <h1 className="text-xl font-semibold text-foreground">Xcel</h1>
        </div>
        <div className="h-6 w-px bg-border" />
        <span className="text-sm text-muted-foreground">Professional Spreadsheet</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onAddRow}>
          <Plus className="h-4 w-4 mr-2" />
          Add Row
        </Button>
        <Button variant="outline" size="sm" onClick={onAddColumn}>
          <Plus className="h-4 w-4 mr-2" />
          Add Column
        </Button>
        <Button onClick={onExportCSV} size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>
    </div>
  );
};