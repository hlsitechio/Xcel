import React from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { 
  Copy, 
  Scissors, 
  ClipboardPaste, 
  Trash2, 
  Plus, 
  Minus,
  Type,
  RotateCcw,
  Palette,
  Calculator
} from 'lucide-react';

interface SpreadsheetContextMenuProps {
  children: React.ReactNode;
  onCopy: () => void;
  onCut: () => void;
  onPaste: () => void;
  onDelete: () => void;
  onInsertRow: () => void;
  onInsertColumn: () => void;
  onDeleteRow: () => void;
  onDeleteColumn: () => void;
  onFormatCells: () => void;
  onUndo: () => void;
}

export const SpreadsheetContextMenu: React.FC<SpreadsheetContextMenuProps> = ({
  children,
  onCopy,
  onCut,
  onPaste,
  onDelete,
  onInsertRow,
  onInsertColumn,
  onDeleteRow,
  onDeleteColumn,
  onFormatCells,
  onUndo,
}) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger 
        asChild
        onContextMenu={(e) => {
          console.log('Context menu triggered', e);
        }}
      >
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onClick={onCopy}>
          <Copy className="mr-2 h-4 w-4" />
          Copy
          <ContextMenuShortcut>Ctrl+C</ContextMenuShortcut>
        </ContextMenuItem>
        
        <ContextMenuItem onClick={onCut}>
          <Scissors className="mr-2 h-4 w-4" />
          Cut
          <ContextMenuShortcut>Ctrl+X</ContextMenuShortcut>
        </ContextMenuItem>
        
        <ContextMenuItem onClick={onPaste}>
          <ClipboardPaste className="mr-2 h-4 w-4" />
          Paste
          <ContextMenuShortcut>Ctrl+V</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem onClick={onDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Content
          <ContextMenuShortcut>Del</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem onClick={onUndo}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Undo
          <ContextMenuShortcut>Ctrl+Z</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem onClick={onInsertRow}>
          <Plus className="mr-2 h-4 w-4" />
          Insert Row
        </ContextMenuItem>

        <ContextMenuItem onClick={onInsertColumn}>
          <Plus className="mr-2 h-4 w-4" />
          Insert Column
        </ContextMenuItem>

        <ContextMenuItem onClick={onDeleteRow}>
          <Minus className="mr-2 h-4 w-4" />
          Delete Row
        </ContextMenuItem>

        <ContextMenuItem onClick={onDeleteColumn}>
          <Minus className="mr-2 h-4 w-4" />
          Delete Column
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem onClick={onFormatCells}>
          <Palette className="mr-2 h-4 w-4" />
          Format Cells
          <ContextMenuShortcut>Ctrl+1</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};