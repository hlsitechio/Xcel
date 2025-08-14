import { KeyboardShortcut, SpreadsheetContext } from './types';

export const navigationShortcuts: KeyboardShortcut[] = [
  {
    key: 'ArrowUp',
    description: 'Move one cell up',
    category: 'navigation',
    action: (context) => {
      if (!context.selectedCell) return;
      const newRow = Math.max(0, context.selectedCell.row - 1);
      context.onCellSelect(newRow, context.selectedCell.col);
    }
  },
  {
    key: 'ArrowDown',
    description: 'Move one cell down',
    category: 'navigation',
    action: (context) => {
      if (!context.selectedCell) return;
      const newRow = Math.min(context.data.length - 1, context.selectedCell.row + 1);
      context.onCellSelect(newRow, context.selectedCell.col);
    }
  },
  {
    key: 'ArrowLeft',
    description: 'Move one cell left',
    category: 'navigation',
    action: (context) => {
      if (!context.selectedCell) return;
      const newCol = Math.max(0, context.selectedCell.col - 1);
      context.onCellSelect(context.selectedCell.row, newCol);
    }
  },
  {
    key: 'ArrowRight',
    description: 'Move one cell right',
    category: 'navigation',
    action: (context) => {
      if (!context.selectedCell) return;
      const maxCol = context.data[0]?.length || 26;
      const newCol = Math.min(maxCol - 1, context.selectedCell.col + 1);
      context.onCellSelect(context.selectedCell.row, newCol);
    }
  },
  {
    key: 'ArrowUp',
    ctrlKey: true,
    description: 'Jump to top of data region',
    category: 'navigation',
    action: (context) => {
      if (!context.selectedCell) return;
      let newRow = 0;
      const col = context.selectedCell.col;
      
      // Find first non-empty cell above or go to top
      for (let row = context.selectedCell.row - 1; row >= 0; row--) {
        if (context.data[row]?.[col] && context.data[row][col].trim() !== '') {
          newRow = row;
          break;
        }
      }
      context.onCellSelect(newRow, col);
    }
  },
  {
    key: 'ArrowDown',
    ctrlKey: true,
    description: 'Jump to bottom of data region',
    category: 'navigation',
    action: (context) => {
      if (!context.selectedCell) return;
      let newRow = context.data.length - 1;
      const col = context.selectedCell.col;
      
      // Find last non-empty cell below or go to bottom
      for (let row = context.selectedCell.row + 1; row < context.data.length; row++) {
        if (context.data[row]?.[col] && context.data[row][col].trim() !== '') {
          newRow = row;
        }
      }
      context.onCellSelect(newRow, col);
    }
  },
  {
    key: 'ArrowLeft',
    ctrlKey: true,
    description: 'Jump to leftmost cell in data row',
    category: 'navigation',
    action: (context) => {
      if (!context.selectedCell) return;
      let newCol = 0;
      const row = context.selectedCell.row;
      
      // Find first non-empty cell to the left or go to column A
      for (let col = context.selectedCell.col - 1; col >= 0; col--) {
        if (context.data[row]?.[col] && context.data[row][col].trim() !== '') {
          newCol = col;
          break;
        }
      }
      context.onCellSelect(row, newCol);
    }
  },
  {
    key: 'ArrowRight',
    ctrlKey: true,
    description: 'Jump to rightmost cell in data row',
    category: 'navigation',
    action: (context) => {
      if (!context.selectedCell) return;
      const row = context.selectedCell.row;
      const maxCol = context.data[0]?.length || 26;
      let newCol = maxCol - 1;
      
      // Find last non-empty cell to the right
      for (let col = context.selectedCell.col + 1; col < maxCol; col++) {
        if (context.data[row]?.[col] && context.data[row][col].trim() !== '') {
          newCol = col;
        }
      }
      context.onCellSelect(row, newCol);
    }
  },
  {
    key: 'Home',
    ctrlKey: true,
    description: 'Go to cell A1',
    category: 'navigation',
    action: (context) => {
      context.onCellSelect(0, 0);
    }
  },
  {
    key: 'End',
    ctrlKey: true,
    description: 'Go to last cell with data',
    category: 'navigation',
    action: (context) => {
      let lastRow = 0;
      let lastCol = 0;
      
      // Find the last cell with data
      for (let row = 0; row < context.data.length; row++) {
        for (let col = 0; col < (context.data[row]?.length || 0); col++) {
          if (context.data[row][col] && context.data[row][col].trim() !== '') {
            lastRow = Math.max(lastRow, row);
            lastCol = Math.max(lastCol, col);
          }
        }
      }
      
      context.onCellSelect(lastRow, lastCol);
    }
  },
  {
    key: 'ArrowUp',
    shiftKey: true,
    description: 'Extend selection up',
    category: 'navigation',
    action: (context) => {
      context.onExtendSelection('up');
    }
  },
  {
    key: 'ArrowDown',
    shiftKey: true,
    description: 'Extend selection down',
    category: 'navigation',
    action: (context) => {
      context.onExtendSelection('down');
    }
  },
  {
    key: 'ArrowLeft',
    shiftKey: true,
    description: 'Extend selection left',
    category: 'navigation',
    action: (context) => {
      context.onExtendSelection('left');
    }
  },
  {
    key: 'ArrowRight',
    shiftKey: true,
    description: 'Extend selection right',
    category: 'navigation',
    action: (context) => {
      context.onExtendSelection('right');
    }
  },
  {
    key: 'ArrowUp',
    ctrlKey: true,
    shiftKey: true,
    description: 'Extend selection to data edge up',
    category: 'navigation',
    action: (context) => {
      context.onExtendSelection('up', true);
    }
  },
  {
    key: 'ArrowDown',
    ctrlKey: true,
    shiftKey: true,
    description: 'Extend selection to data edge down',
    category: 'navigation',
    action: (context) => {
      context.onExtendSelection('down', true);
    }
  },
  {
    key: 'ArrowLeft',
    ctrlKey: true,
    shiftKey: true,
    description: 'Extend selection to data edge left',
    category: 'navigation',
    action: (context) => {
      context.onExtendSelection('left', true);
    }
  },
  {
    key: 'ArrowRight',
    ctrlKey: true,
    shiftKey: true,
    description: 'Extend selection to data edge right',
    category: 'navigation',
    action: (context) => {
      context.onExtendSelection('right', true);
    }
  },
  {
    key: ' ',
    ctrlKey: true,
    description: 'Select entire column',
    category: 'navigation',
    action: (context) => {
      if (!context.selectedCell) return;
      context.onSelectColumn(context.selectedCell.col);
    }
  },
  {
    key: ' ',
    shiftKey: true,
    description: 'Select entire row',
    category: 'navigation',
    action: (context) => {
      if (!context.selectedCell) return;
      context.onSelectRow(context.selectedCell.row);
    }
  },
  {
    key: 'a',
    ctrlKey: true,
    description: 'Select all cells',
    category: 'navigation',
    action: (context) => {
      context.onSelectAll();
    }
  }
];