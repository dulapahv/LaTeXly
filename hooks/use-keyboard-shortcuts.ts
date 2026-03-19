import { useEffect } from 'react';
import { useEquationStore } from '@/store/equation-store';

export function useKeyboardShortcuts() {
  const { undo, redo, setEquation } = useEquationStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }

      if (
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') ||
        ((e.ctrlKey || e.metaKey) && e.key === 'y')
      ) {
        e.preventDefault();
        redo();
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setEquation('');
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        document.getElementById('editor')?.focus();
      }

      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        document.getElementById('symbol-search-trigger')?.click();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, setEquation]);
}
