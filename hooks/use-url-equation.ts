import { useEffect, useCallback, useRef } from "react";
import { useEquationStore } from "@/store/equation-store";
import LZString from "lz-string";

export function useUrlEquation() {
  const { equation, setEquation } = useEquationStore();
  const isInitialized = useRef(false);
  const updateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isInitialized.current) {
      const params = new URLSearchParams(window.location.search);
      const urlEquation = params.get("eq");
      if (urlEquation) {
        try {
          const decoded = decodeEquationFromUrl(urlEquation);
          setEquation(decoded);
        } catch (error) {
          console.error("Failed to decode equation from URL:", error);
        }
      }
      isInitialized.current = true;
    }
  }, [setEquation]);

  useEffect(() => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    updateTimeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);

      if (equation) {
        params.set("eq", encodeEquationForUrl(equation));
      } else {
        params.delete("eq");
      }

      const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
      window.history.replaceState(null, "", newUrl);
    }, 500);

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [equation]);

  const shareEquation = useCallback(async () => {
    const params = new URLSearchParams();
    if (equation) {
      params.set("eq", encodeEquationForUrl(equation));
    }

    const shareUrl = `${window.location.origin}${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    await navigator.clipboard.writeText(shareUrl);
    return shareUrl;
  }, [equation]);

  return { shareEquation };
}

function encodeEquationForUrl(str: string): string {
  return LZString.compressToEncodedURIComponent(str);
}

function decodeEquationFromUrl(str: string): string {
  return LZString.decompressFromEncodedURIComponent(str) ?? "";
}
