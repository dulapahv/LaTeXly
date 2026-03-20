import { lazy, Suspense, useEffect, useMemo, useRef } from "react";
import { useTheme } from "next-themes";
import { useEquationStore } from "@/store/equation-store";
import { debounce, registerMonaco } from "@/lib/utils";
import {
  LATEX_LANGUAGE_ID,
  languageConfiguration,
  monarchTokensProvider,
} from "@/lib/monaco/latex-language";
import { createCompletionProvider } from "@/lib/monaco/latex-completions";
import {
  LIGHT_THEME,
  DARK_THEME,
  lightTheme,
  darkTheme,
} from "@/lib/monaco/latex-theme";
import type { editor } from "monaco-editor";

const MonacoEditor = lazy(() => import("@monaco-editor/react"));


const EDITOR_PLACEHOLDER =
  "Enter a LaTeX equation... e.g. e^{i\\theta} = \\cos(\\theta) + i\\sin(\\theta)";

export function EditorPanel() {
  const { equation, setEquation } = useEquationStore();
  const { resolvedTheme } = useTheme();
  const editorRef = useRef<editor.IStandaloneCodeEditor | undefined>(undefined);
  const isExternalUpdate = useRef(false);

  const debouncedSetEquation = useMemo(
    () =>
      debounce((value: string) => {
        setEquation(value);
      }, 100),
    [setEquation],
  );

  useEffect(() => {
    const editorInstance = editorRef.current;
    if (!editorInstance) return;

    const currentValue = editorInstance.getValue();
    if (currentValue !== equation) {
      isExternalUpdate.current = true;
      editorInstance.setValue(equation);
      isExternalUpdate.current = false;
    }
  }, [equation]);

  function handleEditorDidMount(editorInstance: editor.IStandaloneCodeEditor, monaco: typeof import("monaco-editor")) {
    editorRef.current = editorInstance;
    registerMonaco(monaco);

    if (equation) {
      editorInstance.setValue(equation);
    }

    editorInstance.focus();

    updatePlaceholder(editorInstance);
    editorInstance.onDidChangeModelContent(() => {
      updatePlaceholder(editorInstance);
    });

    // Remeasure fonts once variable fonts finish loading to fix caret alignment
    document.fonts.ready.then(() => {
      monaco.editor.remeasureFonts();
    });
  }

  function handleChange(value: string | undefined) {
    if (isExternalUpdate.current) return;
    debouncedSetEquation(value ?? "");
  }

  function handleEditorWillMount(monaco: typeof import("monaco-editor")) {
    const registeredLanguages = monaco.languages.getLanguages();
    if (!registeredLanguages.some((lang) => lang.id === LATEX_LANGUAGE_ID)) {
      monaco.languages.register({ id: LATEX_LANGUAGE_ID });
      monaco.languages.setMonarchTokensProvider(
        LATEX_LANGUAGE_ID,
        monarchTokensProvider,
      );
      monaco.languages.setLanguageConfiguration(
        LATEX_LANGUAGE_ID,
        languageConfiguration,
      );
      monaco.languages.registerCompletionItemProvider(
        LATEX_LANGUAGE_ID,
        createCompletionProvider(),
      );
    }

    monaco.editor.defineTheme(LIGHT_THEME, lightTheme);
    monaco.editor.defineTheme(DARK_THEME, darkTheme);
  }

  const themeName =
    resolvedTheme === "dark" ? "latex-dark" : "latex-light";

  return (
    <div className="h-full overflow-hidden">
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
            Loading editor...
          </div>
        }
      >
        <MonacoEditor
          language="latex"
          theme={themeName}
          value={equation}
          onChange={handleChange}
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            lineNumbers: "on",
            wordWrap: "on",
            fontSize: 14,
            fontFamily: "'Geist Mono Variable', 'Fira Code', 'Fira Mono', monospace",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 8, bottom: 8 },
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            tabSize: 2,
            renderLineHighlight: "line",
            overviewRulerBorder: false,
            hideCursorInOverviewRuler: true,
            scrollbar: {
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            },
            suggest: { snippetsPreventQuickSuggestions: true },
            bracketPairColorization: { enabled: true },
            autoClosingBrackets: "always",
            autoClosingQuotes: "always",
            matchBrackets: "always",
            cursorSmoothCaretAnimation: "on",
          }}
        />
      </Suspense>
    </div>
  );
}

function updatePlaceholder(editorInstance: editor.IStandaloneCodeEditor) {
  const model = editorInstance.getModel();
  if (!model) return;

  const container = editorInstance.getDomNode();
  if (!container) return;

  let placeholder = container.querySelector(
    ".monaco-placeholder",
  ) as HTMLElement | null;

  if (model.getValue() === "") {
    if (!placeholder) {
      placeholder = document.createElement("div");
      placeholder.className = "monaco-placeholder";
      placeholder.textContent = EDITOR_PLACEHOLDER;
      Object.assign(placeholder.style, {
        position: "absolute",
        top: "8px",
        left: "68px",
        color: "var(--muted-foreground)",
        pointerEvents: "none",
        fontFamily: "'Geist Mono Variable', 'Fira Code', monospace",
        fontSize: "14px",
        opacity: "0.5",
      });
      container.appendChild(placeholder);
    }
    placeholder.style.display = "block";
  } else if (placeholder) {
    placeholder.style.display = "none";
  }
}
