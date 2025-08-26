// components/latex-panel-exports.tsx
// First install: npm install dom-to-image-more

import domtoimage from 'dom-to-image-more';

export async function copyEquationAsImage() {
  const element = document.getElementById('equation-render-element');
  if (!element) {
    throw new Error('Element not found');
  }

  try {
    // Clone element for better isolation
    const clone = element.cloneNode(true) as HTMLElement;
    
    // Get computed styles from the original element
    const computedStyle = window.getComputedStyle(element);
    const bgColor = computedStyle.backgroundColor;
    const textColor = computedStyle.color;
    
    // Apply styles directly to avoid OKLCH issues
    clone.style.cssText = `
      background-color: ${bgColor};
      color: ${textColor};
      padding: 40px;
      border-radius: 8px;
      font-size: 1.5rem;
      display: inline-block;
      font-family: 'KaTeX_Main', 'Times New Roman', serif;
    `;
    
    // Use dom-to-image-more for better CSS compatibility
    const blob = await domtoimage.toBlob(clone, {
      quality: 1,
      width: clone.scrollWidth * 2,
      height: clone.scrollHeight * 2,
      style: {
        transform: 'scale(2)',
        transformOrigin: 'top left',
      },
      bgcolor: bgColor || '#ffffff',
      filter: (node) => {
        // Filter out any problematic nodes if needed
        return true;
      }
    });

    await navigator.clipboard.write([
      new ClipboardItem({
        'image/png': blob,
      }),
    ]);
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
    // Get computed styles
    const computedStyle = window.getComputedStyle(element);
    const bgColor = computedStyle.backgroundColor;
    const textColor = computedStyle.color;
    
    // Create a wrapper with proper styling
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      background-color: #ffffff;
      color: #000000;
      padding: 40px;
      display: inline-block;
      font-family: 'KaTeX_Main', 'Times New Roman', serif;
      font-size: 1.5rem;
    `;
    
    // Clone the content
    const content = element.cloneNode(true) as HTMLElement;
    wrapper.appendChild(content);
    
    // Use dom-to-image-more
    const dataUrl = await domtoimage.toPng(wrapper, {
      quality: 1,
      width: wrapper.scrollWidth * 2,
      height: wrapper.scrollHeight * 2,
      style: {
        transform: 'scale(2)',
        transformOrigin: 'top left',
      },
      bgcolor: '#ffffff',
    });

    // Download
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `latex-equation-${Date.now()}.png`;
    link.click();
    link.remove();
  } catch (error) {
    console.error('Download as image failed:', error);
    throw error;
  }
}