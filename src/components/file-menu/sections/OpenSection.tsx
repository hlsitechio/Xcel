import { Button } from "@/components/ui/button";
import { FolderOpen, Upload } from "lucide-react";

export const OpenSection = () => {
  return (
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
  );
};