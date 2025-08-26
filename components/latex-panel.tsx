// src/components/latex-panel.tsx - Fixed image export
'use client';

import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { LaTeXDisplay } from './latex-display';

export function LaTeXPanel() {
  const panelRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={panelRef}
      className="flex h-full w-full items-center justify-center overflow-auto"
    >
      <LaTeXDisplay />
    </div>
  );
}

// Helper function to convert CSS variables to RGB for html2canvas
function getComputedColor(element: HTMLElement): string {
  const styles = window.getComputedStyle(element);
  const bgColor = styles.backgroundColor;
  
  // If it's already rgb/rgba, return it
  if (bgColor.startsWith('rgb')) {
    return bgColor;
  }
  
  // Default to white for light mode, dark for dark mode
  const isDark = document.documentElement.classList.contains('dark');
  return isDark ? '#0a0a0a' : '#ffffff';
}

export async function copyEquationAsImage() {
  const element = document.getElementById('equation-render-element');
  if (!element) {
    throw new Error('Element not found');
  }

  try {
    // Create a clone to avoid modifying the original
    const clone = element.cloneNode(true) as HTMLElement;
    
    // Apply inline styles to bypass CSS variable issues
    clone.style.backgroundColor = getComputedColor(element);
    clone.style.color = window.getComputedStyle(element).color;
    clone.style.padding = '20px';
    clone.style.borderRadius = '8px';
    
    // Temporarily append to body for rendering
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
      backgroundColor: null,
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
    });
    
    // Clean up
    document.body.removeChild(clone);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((blob) => resolve(blob), 'image/png'),
    );

    if (blob) {
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob,
        }),
      ]);
    } else {
      throw new Error('Blob conversion failed');
    }
  } catch (error) {
    console.error('Copy as image failed:', error);
    throw error;
  }
}

export async function downloadEquationAsImage() {
  const element = document.getElementById('equation-render-element');
  if (!element) {
    throw new Error('Element not found');
  }

  try {
    // Create a clone for rendering
    const clone = element.cloneNode(true) as HTMLElement;
    
    // Apply white background for download
    clone.style.backgroundColor = '#ffffff';
    clone.style.color = '#000000';
    clone.style.padding = '40px';
    clone.style.borderRadius = '0';
    
    // Temporarily append to body
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
      backgroundColor: '#ffffff',
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
    });
    
    // Clean up
    document.body.removeChild(clone);

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `latex-equation-${Date.now()}.png`;
    link.click();
    link.remove();
  } catch (error) {
    console.error('Download as image failed:', error);
    throw error;
  }
}

// Alternative: Use dom-to-image-more instead of html2canvas (better CSS support)
// npm install dom-to-image-more
// import domtoimage from 'dom-to-image-more';

// export async function copyEquationAsImageAlternative() {
//   const domtoimage = await import('dom-to-image-more');
//   const element = document.getElementById('equation-render-element');
//   if (!element) throw new Error('Element not found');

//   try {
//     const blob = await domtoimage.default.toBlob(element, {
//       quality: 1,
//       scale: 2,
//       bgcolor: '#ffffff',
//       style: {
//         backgroundColor: '#ffffff',
//         padding: '20px',
//       }
//     });

//     await navigator.clipboard.write([
//       new ClipboardItem({ 'image/png': blob }),
//     ]);
//   } catch (error) {
//     console.error('Copy failed:', error);
//     throw error;
//   }
// }