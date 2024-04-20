/**
 * Editor context for managing the LaTeX equation.
 */

'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

export type EditorContextType = {
  equation: string;
  setEquation: (value: string) => void;
};

export const EditorContext = createContext<EditorContextType | undefined>(
  undefined
);

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within a EditorProvider');
  }
  return context;
};

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [equation, setEquation] = useState('');

  return (
    <EditorContext.Provider value={{ equation, setEquation }}>
      {children}
    </EditorContext.Provider>
  );
};
