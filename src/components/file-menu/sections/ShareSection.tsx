import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

export const ShareSection = () => {
  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-3">Share</h3>
      <div className="space-y-2">
        <Button variant="ghost" className="w-full justify-start">
          <Share2 className="h-4 w-4 mr-3" />
          Share
        </Button>
      </div>
    </div>
  );
};