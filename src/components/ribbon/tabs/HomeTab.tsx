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
}

export const HomeTab = ({ onExportCSV, onAddRow, onAddColumn, selectedCell }: HomeTabProps) => {
  return (
    <div className="flex items-center gap-6">
      <FileControls onExportCSV={onExportCSV} />
      <Separator orientation="vertical" className="h-16" />
      <ClipboardControls />
      <Separator orientation="vertical" className="h-16" />
      <FontControls />
      <Separator orientation="vertical" className="h-16" />
      <AlignmentControls />
      <Separator orientation="vertical" className="h-16" />
      <NumberControls />
      <Separator orientation="vertical" className="h-16" />
      <CellControls onAddRow={onAddRow} onAddColumn={onAddColumn} />
    </div>
  );
};