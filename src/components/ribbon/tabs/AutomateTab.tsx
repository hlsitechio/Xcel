import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Play,
  Pause,
  Square,
  Settings,
  Zap,
  Code,
  Bot,
  Workflow
} from "lucide-react";

export const AutomateTab = () => {
  return (
    <div className="flex items-center gap-6">
      {/* Scripts Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Scripts</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <Code className="h-4 w-4" />
            <span className="text-xs">Script Editor</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <Play className="h-4 w-4" />
            <span className="text-xs">Run</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      {/* Power Platform Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Power Platform</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <Workflow className="h-4 w-4" />
            <span className="text-xs">Power Automate</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <Bot className="h-4 w-4" />
            <span className="text-xs">Power Apps</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      {/* Macros Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Macros</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
            <Play className="h-4 w-4" />
            <span className="text-xs">Record</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
            <Pause className="h-4 w-4" />
            <span className="text-xs">Pause</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
            <Square className="h-4 w-4" />
            <span className="text-xs">Stop</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      {/* AI Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">AI</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <Zap className="h-4 w-4" />
            <span className="text-xs">AI Assistant</span>
          </Button>
        </div>
      </div>
    </div>
  );
};