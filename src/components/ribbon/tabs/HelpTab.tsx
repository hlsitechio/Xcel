import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  HelpCircle,
  MessageCircle,
  Phone,
  BookOpen,
  Video,
  FileText,
  Info
} from "lucide-react";

export const HelpTab = () => {
  return (
    <div className="flex items-center gap-6">
      {/* Help Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Help</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <HelpCircle className="h-4 w-4" />
            <span className="text-xs">Help</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <BookOpen className="h-4 w-4" />
            <span className="text-xs">Docs</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      {/* Training Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Training</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <Video className="h-4 w-4" />
            <span className="text-xs">Videos</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <FileText className="h-4 w-4" />
            <span className="text-xs">Tutorials</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      {/* Support Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Support</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">Contact</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <Phone className="h-4 w-4" />
            <span className="text-xs">Phone</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      {/* About Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">About</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <Info className="h-4 w-4" />
            <span className="text-xs">About</span>
          </Button>
        </div>
      </div>
    </div>
  );
};