import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Palette,
  Type,
  ZoomIn,
  ZoomOut,
  Download,
  Plus,
  FileSpreadsheet
} from "lucide-react";

interface SpreadsheetToolbarProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onExportCSV: () => void;
  onAddRow: () => void;
  onAddColumn: () => void;
}

export const SpreadsheetToolbar = ({
  zoom,
  onZoomIn,
  onZoomOut,
  onExportCSV,
  onAddRow,
  onAddColumn,
}: SpreadsheetToolbarProps) => {
  return (
    <div className="border-b border-border bg-card">
      {/* Header with title */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">Xcel</h1>
          </div>
          <div className="h-6 w-px bg-border" />
          <span className="text-sm text-muted-foreground">Professional Spreadsheet</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onAddRow}>
            <Plus className="h-4 w-4 mr-2" />
            Add Row
          </Button>
          <Button variant="outline" size="sm" onClick={onAddColumn}>
            <Plus className="h-4 w-4 mr-2" />
            Add Column
          </Button>
          <Button onClick={onExportCSV} size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Main toolbar */}
      <div className="flex items-center gap-4 px-4 py-3">
        {/* Font and Size */}
        <div className="flex items-center gap-2">
          <Select defaultValue="arial">
            <SelectTrigger className="w-32">
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
            <SelectTrigger className="w-16">
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
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Text Formatting */}
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

        <Separator orientation="vertical" className="h-6" />

        {/* Colors */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm">
            <Type className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Palette className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Alignment */}
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

        <Separator orientation="vertical" className="h-6" />

        {/* Zoom Controls */}
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" size="sm" onClick={onZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium min-w-[3rem] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <Button variant="ghost" size="sm" onClick={onZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};