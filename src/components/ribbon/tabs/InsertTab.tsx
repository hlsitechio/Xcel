import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChartControls } from "@/components/controls/charts/ChartControls";
import { 
  Table,
  Image,
  Link,
  Calendar,
  Clock,
  Sigma,
  MessageCircle
} from "lucide-react";

export const InsertTab = () => {
  return (
    <div className="flex items-center gap-6">
      {/* Tables Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Tables</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <Table className="h-4 w-4" />
            <span className="text-xs">Table</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      <ChartControls />

      <Separator orientation="vertical" className="h-16" />

      {/* Illustrations Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Illustrations</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
            <Image className="h-4 w-4" />
            <span className="text-xs">Image</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      {/* Links Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Links</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
            <Link className="h-4 w-4" />
            <span className="text-xs">Link</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      {/* Text Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Text</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
            <Calendar className="h-4 w-4" />
            <span className="text-xs">Date</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
            <Clock className="h-4 w-4" />
            <span className="text-xs">Time</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      {/* Symbols Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Symbols</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
            <Sigma className="h-4 w-4" />
            <span className="text-xs">Symbol</span>
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
            <span className="text-xs">Comment</span>
          </Button>
        </div>
      </div>
    </div>
  );
};