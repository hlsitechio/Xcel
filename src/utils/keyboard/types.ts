export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  description: string;
  action: (context: SpreadsheetContext) => void;
  category: 'navigation' | 'editing' | 'formatting' | 'formulas' | 'worksheet' | 'misc';
}

export interface SpreadsheetContext {
  selectedCell: { row: number; col: number } | null;
  selectedRanges: Array<{
    startRow: number;
    startCol: number;
    endRow: number;
    endCol: number;
  }>;
  data: string[][];
  imageData: string[][];
  onCellChange: (row: number, col: number, value: string) => void;
  onCellSelect: (row: number, col: number, event?: React.MouseEvent) => void;
  onDeleteSelectedCells: () => void;
  onExtendSelection: (direction: 'up' | 'down' | 'left' | 'right', toEdge?: boolean) => void;
  onSelectAll: () => void;
  onSelectRow: (row: number) => void;
  onSelectColumn: (col: number) => void;
  onFillDown: () => void;
  onFillRight: () => void;
  onInsertCurrentDate: () => void;
  onInsertCurrentTime: () => void;
  onToggleBold: () => void;
  onToggleItalic: () => void;
  onToggleUnderline: () => void;
  onCopy: () => void;
  onCut: () => void;
  onPaste: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onFind: () => void;
  onReplace: () => void;
  onPrint: () => void;
  onSave: () => void;
  gridRef?: React.RefObject<HTMLDivElement>;
}

export interface CellCoordinate {
  row: number;
  col: number;
}