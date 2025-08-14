import { Button } from "@/components/ui/button";
import { Save, Share2 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const FileMenuHeader = () => {
  return (
    <div className="flex items-center gap-2 ml-auto">
      <Button variant="ghost" size="sm">
        <Save className="h-4 w-4 mr-2" />
        Save
      </Button>
      <Button variant="ghost" size="sm">
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>
      <ThemeToggle />
    </div>
  );
};