"use client";

import { useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEquationStore } from "@/store/equation-store";

export function useUrlEquation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { equation, setEquation } = useEquationStore();
  const isInitialized = useRef(false);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load equation from URL on mount
  useEffect(() => {
    if (!isInitialized.current) {
      const urlEquation = searchParams.get("eq");
      if (urlEquation) {
        try {
          // Decode from base64url
          const decoded = decodeBase64Url(urlEquation);
          setEquation(decoded);
        } catch (error) {
          console.error("Failed to decode equation from URL:", error);
        }
      }
      isInitialized.current = true;
    }
  }, [searchParams, setEquation]);

  // Update URL when equation changes (debounced)
  useEffect(() => {
    // Clear previous timeout
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    // Debounce URL updates to avoid too many history entries
    updateTimeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (equation) {
        // Encode to base64url for URL safety
        const encoded = encodeBase64Url(equation);
        params.set("eq", encoded);
      } else {
        params.delete("eq");
      }

      // Update URL without triggering navigation
      const newUrl = params.toString() ? `?${params.toString()}` : "/";
      window.history.replaceState(null, "", newUrl);
    }, 500); // 500ms debounce

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

    // Try native share API first
    if (navigator.share) {
      try {
        await navigator.share({
          title: "LaTeXly Equation",
          text: `Check out this LaTeX equation: ${equation.substring(
            0,
            50
          )}...`,
          url: shareUrl,
        });
        return;
      } catch (error) {
        // Fall back to clipboard
      }
    }

    // Copy to clipboard as fallback
    await navigator.clipboard.writeText(shareUrl);
    return shareUrl;
  }, [equation]);

  return { shareEquation };
}

// Helper functions for base64url encoding/decoding
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
