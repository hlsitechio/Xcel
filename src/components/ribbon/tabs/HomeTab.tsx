import { Separator } from "@/components/ui/separator";
import { FileControls } from "@/components/controls/file/FileControls";
import { ClipboardControls } from "@/components/controls/clipboard/ClipboardControls";
import { FontControls } from "@/components/controls/font/FontControls";
import { AlignmentControls } from "@/components/controls/alignment/AlignmentControls";
import { NumberControls } from "@/components/controls/number/NumberControls";
import { CellControls } from "@/components/controls/cells/CellControls";

interface HomeTabProps {
  onExportCSV: () => void;
  onAddRow: () => void;
  onAddColumn: () => void;
  selectedCell: { row: number; col: number } | null;
  // Formatting handlers
  onFontFamilyChange: (fontFamily: string) => void;
  onFontSizeChange: (fontSize: string) => void;
  onBoldToggle: () => void;
  onItalicToggle: () => void;
  onUnderlineToggle: () => void;
  onAlignmentChange: (alignment: 'left' | 'center' | 'right') => void;
  onNumberFormatChange: (format: 'general' | 'percentage' | 'currency' | 'number') => void;
  onTextColorChange: (color: string) => void;
  onBackgroundColorChange: (color: string) => void;
  onCopy: () => void;
  onCut: () => void;
  onPaste: () => void;
}

export const HomeTab = ({ 
  onExportCSV, 
  onAddRow, 
  onAddColumn, 
  selectedCell,
  onFontFamilyChange,
  onFontSizeChange,
  onBoldToggle,
  onItalicToggle,
  onUnderlineToggle,
  onAlignmentChange,
  onNumberFormatChange,
  onTextColorChange,
  onBackgroundColorChange,
  onCopy,
  onCut,
  onPaste
}: HomeTabProps) => {
  return (
    <div className="flex items-center gap-6">
      <FileControls onExportCSV={onExportCSV} />
      <Separator orientation="vertical" className="h-16" />
      <ClipboardControls 
        onCopy={onCopy}
        onCut={onCut}
        onPaste={onPaste}
      />
      <Separator orientation="vertical" className="h-16" />
      <FontControls 
        onFontFamilyChange={onFontFamilyChange}
        onFontSizeChange={onFontSizeChange}
        onBoldToggle={onBoldToggle}
        onItalicToggle={onItalicToggle}
        onUnderlineToggle={onUnderlineToggle}
        onTextColorChange={onTextColorChange}
        onBackgroundColorChange={onBackgroundColorChange}
      />
      <Separator orientation="vertical" className="h-16" />
      <AlignmentControls onAlignmentChange={onAlignmentChange} />
      <Separator orientation="vertical" className="h-16" />
      <NumberControls onNumberFormatChange={onNumberFormatChange} />
      <Separator orientation="vertical" className="h-16" />
      <CellControls onAddRow={onAddRow} onAddColumn={onAddColumn} />
    </div>
  );
};