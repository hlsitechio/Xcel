import { Button } from "@/components/ui/button";
import { Save, Download } from "lucide-react";

interface SaveSectionProps {
  onExportCSV: () => void;
}

export const SaveSection = ({ onExportCSV }: SaveSectionProps) => {
  return (
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
  );
};