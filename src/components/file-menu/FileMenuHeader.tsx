import { Button } from "@/components/ui/button";
import { Save, Share2 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const FileMenuHeader = () => {
  return (
    <div className="flex items-center gap-1 md:gap-2 ml-auto">
      <Button variant="ghost" size="sm" className="hidden md:flex">
        <Save className="h-4 w-4 mr-2" />
        Save
      </Button>
      <Button variant="ghost" size="sm" className="hidden md:flex">
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>
      {/* Mobile Save/Share icons */}
      <Button variant="ghost" size="sm" className="md:hidden h-8 w-8 p-0">
        <Save className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" className="md:hidden h-8 w-8 p-0">
        <Share2 className="h-4 w-4" />
      </Button>
      <ThemeToggle />
    </div>
  );
};