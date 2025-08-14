import { KeyboardShortcut, SpreadsheetContext } from './types';
import { navigationShortcuts } from './navigationShortcuts';
import { editingShortcuts } from './editingShortcuts';
import { formattingShortcuts } from './formattingShortcuts';
import { formulaShortcuts } from './formulaShortcuts';
import { miscShortcuts } from './miscShortcuts';

export class KeyboardManager {
  private shortcuts: KeyboardShortcut[] = [];
  private context: SpreadsheetContext | null = null;

  constructor() {
    this.shortcuts = [
      ...navigationShortcuts,
      ...editingShortcuts,
      ...formattingShortcuts,
      ...formulaShortcuts,
      ...miscShortcuts
    ];
  }

  public setContext(context: SpreadsheetContext) {
    this.context = context;
  }

  public handleKeyDown = (event: KeyboardEvent): boolean => {
    if (!this.context) return false;

    // Don't handle shortcuts if user is typing in an input field (except for specific cases)
    const target = event.target as HTMLElement;
    const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true';
    
    // Allow some shortcuts even in input fields
    const allowedInInput = ['Escape', 'Enter', 'Tab', 'F2'];
    if (isInput && !allowedInInput.includes(event.key)) {
      return false;
    }

    // Find matching shortcut
    const shortcut = this.shortcuts.find(s => 
      s.key === event.key &&
      !!s.ctrlKey === (event.ctrlKey || event.metaKey) &&
      !!s.shiftKey === event.shiftKey &&
      !!s.altKey === event.altKey
    );

    if (shortcut) {
      event.preventDefault();
      event.stopPropagation();
      
      try {
        shortcut.action(this.context);
        return true;
      } catch (error) {
        console.error('Error executing keyboard shortcut:', error);
      }
    }

    return false;
  };

  public getShortcutsByCategory(category: KeyboardShortcut['category']): KeyboardShortcut[] {
    return this.shortcuts.filter(s => s.category === category);
  }

  public getAllShortcuts(): KeyboardShortcut[] {
    return [...this.shortcuts];
  }

  public getShortcutDescription(key: string, modifiers: { ctrl?: boolean; shift?: boolean; alt?: boolean }): string | null {
    const shortcut = this.shortcuts.find(s => 
      s.key === key &&
      !!s.ctrlKey === !!modifiers.ctrl &&
      !!s.shiftKey === !!modifiers.shift &&
      !!s.altKey === !!modifiers.alt
    );
    
    return shortcut?.description || null;
  }

  public formatShortcutDisplay(shortcut: KeyboardShortcut): string {
    const parts: string[] = [];
    
    if (shortcut.ctrlKey) parts.push('Ctrl');
    if (shortcut.altKey) parts.push('Alt');
    if (shortcut.shiftKey) parts.push('Shift');
    
    // Format special keys
    let keyDisplay = shortcut.key;
    switch (shortcut.key) {
      case ' ':
        keyDisplay = 'Space';
        break;
      case 'ArrowUp':
        keyDisplay = '↑';
        break;
      case 'ArrowDown':
        keyDisplay = '↓';
        break;
      case 'ArrowLeft':
        keyDisplay = '←';
        break;
      case 'ArrowRight':
        keyDisplay = '→';
        break;
    }
    
    parts.push(keyDisplay);
    return parts.join(' + ');
  }
}

// Global instance
export const keyboardManager = new KeyboardManager();