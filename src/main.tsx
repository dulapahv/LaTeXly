import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

import "./globals.css";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";


const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
