"use client";

import { useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useEquationStore } from "@/store/equation-store";

export function useUrlEquation() {
  const searchParams = useSearchParams();
  const { equation, setEquation } = useEquationStore();
  const isInitialized = useRef(false);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isInitialized.current) {
      const urlEquation = searchParams.get("eq");
      if (urlEquation) {
        try {
          const decoded = decodeBase64Url(urlEquation);
          setEquation(decoded);
        } catch (error) {
          console.error("Failed to decode equation from URL:", error);
        }
      }
      isInitialized.current = true;
    }
  }, [searchParams, setEquation]);

  useEffect(() => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    updateTimeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (equation) {
        params.set("eq", encodeBase64Url(equation));
      } else {
        params.delete("eq");
      }

      const newUrl = params.toString() ? `?${params.toString()}` : "/";
      window.history.replaceState(null, "", newUrl);
    }, 500);

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [equation, searchParams]);

  const shareEquation = useCallback(async () => {
    const params = new URLSearchParams();
    if (equation) {
      params.set("eq", encodeBase64Url(equation));
    }

    const shareUrl = `${window.location.origin}${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    await navigator.clipboard.writeText(shareUrl);
    return shareUrl;
  }, [equation]);

  return { shareEquation };
}

function encodeBase64Url(str: string): string {
  return btoa(encodeURIComponent(str))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function decodeBase64Url(str: string): string {
  const base64 = str
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(str.length + ((4 - (str.length % 4)) % 4), "=");

  return decodeURIComponent(atob(base64));
}
