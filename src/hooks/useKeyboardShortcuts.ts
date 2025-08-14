import { useEffect, useCallback } from 'react';
import { keyboardManager } from '@/utils/keyboard/keyboardManager';
import { SpreadsheetContext } from '@/utils/keyboard/types';
import { useToast } from '@/components/ui/use-toast';

export const useKeyboardShortcuts = (context: Partial<SpreadsheetContext>) => {
  const { toast } = useToast();

  // Create default implementations for missing context functions
  const fullContext: SpreadsheetContext = {
    selectedCell: context.selectedCell || null,
    selectedRanges: context.selectedRanges || [],
    data: context.data || [],
    imageData: context.imageData || [],
    onCellChange: context.onCellChange || (() => {}),
    onCellSelect: context.onCellSelect || (() => {}),
    onDeleteSelectedCells: context.onDeleteSelectedCells || (() => {}),
    onExtendSelection: context.onExtendSelection || (() => {}),
    onSelectAll: context.onSelectAll || (() => {}),
    onSelectRow: context.onSelectRow || (() => {}),
    onSelectColumn: context.onSelectColumn || (() => {}),
    onFillDown: context.onFillDown || (() => {
      toast({
        title: "Feature Not Available",
        description: "Fill down functionality will be implemented soon",
      });
    }),
    onFillRight: context.onFillRight || (() => {
      toast({
        title: "Feature Not Available", 
        description: "Fill right functionality will be implemented soon",
      });
    }),
    onInsertCurrentDate: context.onInsertCurrentDate || (() => {
      if (context.selectedCell && context.onCellChange) {
        const currentDate = new Date().toLocaleDateString();
        context.onCellChange(context.selectedCell.row, context.selectedCell.col, currentDate);
      }
    }),
    onInsertCurrentTime: context.onInsertCurrentTime || (() => {
      if (context.selectedCell && context.onCellChange) {
        const currentTime = new Date().toLocaleTimeString();
        context.onCellChange(context.selectedCell.row, context.selectedCell.col, currentTime);
      }
    }),
    onToggleBold: context.onToggleBold || (() => {
      toast({
        title: "Feature Not Available",
        description: "Bold formatting will be implemented soon",
      });
    }),
    onToggleItalic: context.onToggleItalic || (() => {
      toast({
        title: "Feature Not Available",
        description: "Italic formatting will be implemented soon",
      });
    }),
    onToggleUnderline: context.onToggleUnderline || (() => {
      toast({
        title: "Feature Not Available",
        description: "Underline formatting will be implemented soon",
      });
    }),
    onCopy: context.onCopy || (() => {
      toast({
        title: "Feature Not Available",
        description: "Copy functionality will be implemented soon",
      });
    }),
    onCut: context.onCut || (() => {
      toast({
        title: "Feature Not Available",
        description: "Cut functionality will be implemented soon",
      });
    }),
    onPaste: context.onPaste || (() => {
      toast({
        title: "Feature Not Available",
        description: "Paste functionality will be implemented soon",
      });
    }),
    onUndo: context.onUndo || (() => {
      toast({
        title: "Feature Not Available",
        description: "Undo functionality will be implemented soon",
      });
    }),
    onRedo: context.onRedo || (() => {
      toast({
        title: "Feature Not Available",
        description: "Redo functionality will be implemented soon",
      });
    }),
    onFind: context.onFind || (() => {
      toast({
        title: "Feature Not Available",
        description: "Find functionality will be implemented soon",
      });
    }),
    onReplace: context.onReplace || (() => {
      toast({
        title: "Feature Not Available",
        description: "Replace functionality will be implemented soon",
      });
    }),
    onPrint: context.onPrint || (() => {
      toast({
        title: "Feature Not Available",
        description: "Print functionality will be implemented soon",
      });
    }),
    onSave: context.onSave || (() => {
      toast({
        title: "Feature Not Available",
        description: "Save functionality will be implemented soon",
      });
    }),
    gridRef: context.gridRef
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Don't handle shortcuts when user is typing in an input field
    const target = event.target as HTMLElement;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
      return;
    }
    
    keyboardManager.handleKeyDown(event);
  }, []);

  useEffect(() => {
    keyboardManager.setContext(fullContext);
  }, [fullContext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    getShortcutsByCategory: keyboardManager.getShortcutsByCategory.bind(keyboardManager),
    getAllShortcuts: keyboardManager.getAllShortcuts.bind(keyboardManager),
    formatShortcutDisplay: keyboardManager.formatShortcutDisplay.bind(keyboardManager)
  };
};