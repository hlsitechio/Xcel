import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface NewSectionProps {
  onClose: () => void;
}

export const NewSection = ({ onClose }: NewSectionProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-3">New</h3>
      <div className="space-y-2">
        <Button variant="ghost" className="w-full justify-start" onClick={onClose}>
          <FileText className="h-4 w-4 mr-3" />
          Blank workbook
        </Button>
      </div>
    </div>
  );
};