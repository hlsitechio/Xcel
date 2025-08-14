import { Button } from "@/components/ui/button";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

export const AlignmentControls = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-xs text-muted-foreground font-medium">Alignment</div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm">
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};