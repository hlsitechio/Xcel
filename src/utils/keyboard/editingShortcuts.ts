import { KeyboardShortcut } from './types';

export const editingShortcuts: KeyboardShortcut[] = [
  {
    key: 'F2',
    description: 'Edit active cell',
    category: 'editing',
    action: (context) => {
      // This will be handled by the cell component directly
      const event = new KeyboardEvent('keydown', { key: 'F2' });
      document.dispatchEvent(event);
    }
  },
  {
    key: 'Escape',
    description: 'Cancel cell entry',
    category: 'editing',
    action: (context) => {
      // This will be handled by the cell component directly
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);
    }
  },
  {
    key: 'Enter',
    description: 'Confirm entry; move down',
    category: 'editing',
    action: (context) => {
      if (!context.selectedCell) return;
      const newRow = Math.min(context.data.length - 1, context.selectedCell.row + 1);
      context.onCellSelect(newRow, context.selectedCell.col);
    }
  },
  {
    key: 'Enter',
    shiftKey: true,
    description: 'Confirm entry; move up',
    category: 'editing',
    action: (context) => {
      if (!context.selectedCell) return;
      const newRow = Math.max(0, context.selectedCell.row - 1);
      context.onCellSelect(newRow, context.selectedCell.col);
    }
  },
  {
    key: 'Tab',
    description: 'Confirm entry; move right',
    category: 'editing',
    action: (context) => {
      if (!context.selectedCell) return;
      const maxCol = context.data[0]?.length || 26;
      const newCol = Math.min(maxCol - 1, context.selectedCell.col + 1);
      context.onCellSelect(context.selectedCell.row, newCol);
    }
  },
  {
    key: 'Tab',
    shiftKey: true,
    description: 'Confirm entry; move left',
    category: 'editing',
    action: (context) => {
      if (!context.selectedCell) return;
      const newCol = Math.max(0, context.selectedCell.col - 1);
      context.onCellSelect(context.selectedCell.row, newCol);
    }
  },
  {
    key: 'd',
    ctrlKey: true,
    description: 'Fill down (copy cell above)',
    category: 'editing',
    action: (context) => {
      context.onFillDown();
    }
  },
  {
    key: 'r',
    ctrlKey: true,
    description: 'Fill right (copy cell left)',
    category: 'editing',
    action: (context) => {
      context.onFillRight();
    }
  },
  {
    key: ';',
    ctrlKey: true,
    description: 'Insert current date',
    category: 'editing',
    action: (context) => {
      context.onInsertCurrentDate();
    }
  },
  {
    key: ';',
    ctrlKey: true,
    shiftKey: true,
    description: 'Insert current time',
    category: 'editing',
    action: (context) => {
      context.onInsertCurrentTime();
    }
  },
  {
    key: 'Delete',
    description: 'Delete cell content',
    category: 'editing',
    action: (context) => {
      context.onDeleteSelectedCells();
    }
  },
  {
    key: 'Backspace',
    description: 'Delete cell content',
    category: 'editing',
    action: (context) => {
      context.onDeleteSelectedCells();
    }
  }
];