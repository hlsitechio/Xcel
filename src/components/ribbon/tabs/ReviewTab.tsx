import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  MessageCircle,
  Users,
  Lock,
  Unlock,
  Eye,
  History,
  CheckCircle,
  BookOpen
} from "lucide-react";

export const ReviewTab = () => {
  return (
    <div className="flex items-center gap-6">
      {/* Proofing Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Proofing</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <CheckCircle className="h-4 w-4" />
            <span className="text-xs">Spelling</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <BookOpen className="h-4 w-4" />
            <span className="text-xs">Research</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      {/* Comments Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Comments</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">New Comment</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <Eye className="h-4 w-4" />
            <span className="text-xs">Show All</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      {/* Protect Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Protect</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <Lock className="h-4 w-4" />
            <span className="text-xs">Protect Sheet</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <Unlock className="h-4 w-4" />
            <span className="text-xs">Unprotect</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      {/* Changes Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Changes</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <Users className="h-4 w-4" />
            <span className="text-xs">Share</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <History className="h-4 w-4" />
            <span className="text-xs">Track Changes</span>
          </Button>
        </div>
      </div>
    </div>
  );
};