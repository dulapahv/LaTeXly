import { useEffect } from 'react';
import { useEquationStore } from '@/store/equation-store';

export function useKeyboardShortcuts() {
  const { undo, redo, equation, setEquation } = useEquationStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Undo: Ctrl/Cmd + Z
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }

      // Redo: Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y
      if (
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') ||
        ((e.ctrlKey || e.metaKey) && e.key === 'y')
      ) {
        e.preventDefault();
        redo();
      }

      // Clear: Ctrl/Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setEquation('');
      }

      // Focus editor: Ctrl/Cmd + E
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        const editor = document.getElementById('editor');
        editor?.focus();
      }

      // Open symbol search: Ctrl/Cmd + /
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        // Trigger command palette opening
        document.getElementById('symbol-search-trigger')?.click();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, setEquation]);
}

