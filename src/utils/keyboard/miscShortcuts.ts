import { KeyboardShortcut } from './types';

export const miscShortcuts: KeyboardShortcut[] = [
  {
    key: 'z',
    ctrlKey: true,
    description: 'Undo',
    category: 'misc',
    action: (context) => {
      context.onUndo();
    }
  },
  {
    key: 'y',
    ctrlKey: true,
    description: 'Redo',
    category: 'misc',
    action: (context) => {
      context.onRedo();
    }
  },
  {
    key: 'c',
    ctrlKey: true,
    description: 'Copy',
    category: 'misc',
    action: (context) => {
      context.onCopy();
    }
  },
  {
    key: 'x',
    ctrlKey: true,
    description: 'Cut',
    category: 'misc',
    action: (context) => {
      context.onCut();
    }
  },
  {
    key: 'v',
    ctrlKey: true,
    description: 'Paste',
    category: 'misc',
    action: (context) => {
      context.onPaste();
    }
  },
  {
    key: 'f',
    ctrlKey: true,
    description: 'Find',
    category: 'misc',
    action: (context) => {
      context.onFind();
    }
  },
  {
    key: 'h',
    ctrlKey: true,
    description: 'Replace',
    category: 'misc',
    action: (context) => {
      context.onReplace();
    }
  },
  {
    key: 'p',
    ctrlKey: true,
    description: 'Print',
    category: 'misc',
    action: (context) => {
      context.onPrint();
    }
  },
  {
    key: 's',
    ctrlKey: true,
    description: 'Save',
    category: 'misc',
    action: (context) => {
      context.onSave();
    }
  },
  {
    key: 'F12',
    description: 'Save As',
    category: 'misc',
    action: (context) => {
      // TODO: Implement Save As
      console.log('Save As not yet implemented');
    }
  }
];