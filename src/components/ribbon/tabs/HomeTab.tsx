import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Copy, 
  Clipboard, 
  Scissors, 
  Bold, 
  Italic, 
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Palette,
  PaintBucket,
  Percent,
  DollarSign,
  Hash,
  Plus,
  Download,
  Upload,
  Save,
  FolderOpen
} from "lucide-react";

interface HomeTabProps {
  onExportCSV: () => void;
  onAddRow: () => void;
  onAddColumn: () => void;
  selectedCell: { row: number; col: number } | null;
}

export const HomeTab = ({ onExportCSV, onAddRow, onAddColumn, selectedCell }: HomeTabProps) => {
  return (
    <div className="flex items-center gap-6">
      {/* File Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">File</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
            <Save className="h-4 w-4" />
            <span className="text-xs">Save</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
            <FolderOpen className="h-4 w-4" />
            <span className="text-xs">Open</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1" onClick={onExportCSV}>
            <Download className="h-4 w-4" />
            <span className="text-xs">Export</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      {/* Clipboard Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Clipboard</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
            <Copy className="h-4 w-4" />
            <span className="text-xs">Copy</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
            <Clipboard className="h-4 w-4" />
            <span className="text-xs">Paste</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
            <Scissors className="h-4 w-4" />
            <span className="text-xs">Cut</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      {/* Font Group */}
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

      <Separator orientation="vertical" className="h-16" />

      {/* Alignment Group */}
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

      <Separator orientation="vertical" className="h-16" />

      {/* Number Format Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Number</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
            <Percent className="h-4 w-4" />
            <span className="text-xs">%</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
            <DollarSign className="h-4 w-4" />
            <span className="text-xs">$</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
            <Hash className="h-4 w-4" />
            <span className="text-xs">#</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      {/* Cells Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Cells</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1" onClick={onAddRow}>
            <Plus className="h-4 w-4" />
            <span className="text-xs">Row</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1" onClick={onAddColumn}>
            <Plus className="h-4 w-4" />
            <span className="text-xs">Col</span>
          </Button>
        </div>
      </div>
    </div>
  );
};