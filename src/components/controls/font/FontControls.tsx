import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bold, Italic, Underline, Type, PaintBucket } from "lucide-react";

export const FontControls = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs text-muted-foreground font-medium text-center">Font</div>
      <div className="flex items-center gap-2">
        <Select defaultValue="arial">
          <SelectTrigger className="w-32 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="arial">Arial</SelectItem>
            <SelectItem value="helvetica">Helvetica</SelectItem>
            <SelectItem value="times">Times New Roman</SelectItem>
            <SelectItem value="courier">Courier New</SelectItem>
          </SelectContent>
        </Select>
        
        <Select defaultValue="11">
          <SelectTrigger className="w-16 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="8">8</SelectItem>
            <SelectItem value="9">9</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="11">11</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="14">14</SelectItem>
            <SelectItem value="16">16</SelectItem>
            <SelectItem value="18">18</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm">
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Underline className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm">
            <Type className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <PaintBucket className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};