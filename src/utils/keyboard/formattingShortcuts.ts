import { KeyboardShortcut } from './types';

export const formattingShortcuts: KeyboardShortcut[] = [
  {
    key: 'b',
    ctrlKey: true,
    description: 'Toggle bold',
    category: 'formatting',
    action: (context) => {
      context.onToggleBold();
    }
  },
  {
    key: 'i',
    ctrlKey: true,
    description: 'Toggle italic',
    category: 'formatting',
    action: (context) => {
      context.onToggleItalic();
    }
  },
  {
    key: 'u',
    ctrlKey: true,
    description: 'Toggle underline',
    category: 'formatting',
    action: (context) => {
      context.onToggleUnderline();
    }
  },
  {
    key: '1',
    ctrlKey: true,
    description: 'Open Format Cells dialog',
    category: 'formatting',
    action: (context) => {
      // TODO: Implement format cells dialog
      console.log('Format Cells dialog not yet implemented');
    }
  },
  {
    key: '5',
    ctrlKey: true,
    description: 'Apply strikethrough',
    category: 'formatting',
    action: (context) => {
      // TODO: Implement strikethrough
      console.log('Strikethrough not yet implemented');
    }
  }
];