import { Button } from "@/components/ui/button";
import { Copy, Clipboard, Scissors } from "lucide-react";

interface ClipboardControlsProps {
  onCopy: () => void;
  onCut: () => void;
  onPaste: () => void;
}

export const ClipboardControls = ({ onCopy, onCut, onPaste }: ClipboardControlsProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-xs text-muted-foreground font-medium">Clipboard</div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1" onClick={onCopy}>
          <Copy className="h-4 w-4" />
          <span className="text-xs">Copy</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1" onClick={onPaste}>
          <Clipboard className="h-4 w-4" />
          <span className="text-xs">Paste</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1" onClick={onCut}>
          <Scissors className="h-4 w-4" />
          <span className="text-xs">Cut</span>
        </Button>
      </div>
    </div>
  );
};