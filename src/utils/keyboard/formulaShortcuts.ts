import { KeyboardShortcut } from './types';

export const formulaShortcuts: KeyboardShortcut[] = [
  {
    key: '=',
    description: 'Start a formula',
    category: 'formulas',
    action: (context) => {
      // This will be handled by the cell component directly
      if (!context.selectedCell) return;
      // Start editing mode with = sign
      const event = new KeyboardEvent('keydown', { key: 'F2' });
      document.dispatchEvent(event);
    }
  },
  {
    key: '=',
    altKey: true,
    description: 'AutoSum (SUM formula)',
    category: 'formulas',
    action: (context) => {
      if (!context.selectedCell) return;
      // Insert SUM formula for selected range or adjacent cells
      let formula = '=SUM(';
      
      if (context.selectedRanges.length > 0) {
        const range = context.selectedRanges[0];
        const startCol = String.fromCharCode(65 + range.startCol);
        const endCol = String.fromCharCode(65 + range.endCol);
        formula += `${startCol}${range.startRow + 1}:${endCol}${range.endRow + 1}`;
      } else {
        // Default to cell above or range above
        const col = String.fromCharCode(65 + context.selectedCell.col);
        formula += `${col}${context.selectedCell.row}`;
      }
      
      formula += ')';
      context.onCellChange(context.selectedCell.row, context.selectedCell.col, formula);
    }
  },
  {
    key: 'F9',
    description: 'Recalculate all workbooks',
    category: 'formulas',
    action: (context) => {
      // TODO: Implement recalculation
      console.log('Recalculation not yet implemented');
    }
  },
  {
    key: 'F9',
    shiftKey: true,
    description: 'Recalculate current worksheet',
    category: 'formulas',
    action: (context) => {
      // TODO: Implement worksheet recalculation
      console.log('Worksheet recalculation not yet implemented');
    }
  },
  {
    key: "'",
    ctrlKey: true,
    description: 'Show formulas (toggle)',
    category: 'formulas',
    action: (context) => {
      // TODO: Implement formula view toggle
      console.log('Formula view toggle not yet implemented');
    }
  }
];