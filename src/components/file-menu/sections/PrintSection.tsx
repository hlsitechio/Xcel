import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export const PrintSection = () => {
  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-3">Print</h3>
      <div className="space-y-2">
        <Button variant="ghost" className="w-full justify-start">
          <Printer className="h-4 w-4 mr-3" />
          Print
        </Button>
      </div>
    </div>
  );
};