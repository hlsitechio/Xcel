import { Button } from "@/components/ui/button";
import { Settings, Info } from "lucide-react";

export const AccountSection = () => {
  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-3">Account</h3>
      <div className="space-y-2">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="h-4 w-4 mr-3" />
          Options
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Info className="h-4 w-4 mr-3" />
          About
        </Button>
      </div>
    </div>
  );
};