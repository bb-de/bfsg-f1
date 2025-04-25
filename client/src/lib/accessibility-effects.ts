// This file contains utility functions to apply accessibility effects to the document
// These are used both by the React component and the vanilla JS version

export const applyFontSize = (size: number): void => {
  document.body.style.fontSize = `${size}%`;
};

export const applyLineHeight = (height: number): void => {
  document.body.style.lineHeight = height === 1 ? '' : `${height}`;
};

export const applyLetterSpacing = (spacing: number): void => {
  document.body.style.letterSpacing = spacing === 0 ? '' : `${spacing}px`;
};

export const applyHelveticaFont = (useHelvetica: boolean): void => {
  document.body.style.fontFamily = useHelvetica ? 'Helvetica, Arial, sans-serif' : '';
};

export const applyTextAlignment = (align: 'left' | 'center' | 'right' | null): void => {
  const content = document.querySelector('#demo-website') as HTMLElement;
  if (!content) return;
  
  content.style.textAlign = align || '';
};

export const applyHighlightHeadings = (highlight: boolean): void => {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
  headings.forEach(heading => {
    if (highlight) {
      (heading as HTMLElement).style.backgroundColor = 'rgba(74, 108, 247, 0.2)';
      (heading as HTMLElement).style.padding = '4px';
      (heading as HTMLElement).style.borderRadius = '4px';
    } else {
      (heading as HTMLElement).style.backgroundColor = '';
      (heading as HTMLElement).style.padding = '';
      (heading as HTMLElement).style.borderRadius = '';
    }
  });
};

export const applyHighlightLinks = (highlight: boolean): void => {
  const links = document.querySelectorAll('a');
  
  links.forEach(link => {
    if (highlight) {
      (link as HTMLElement).style.backgroundColor = 'rgba(255, 215, 0, 0.3)';
      (link as HTMLElement).style.padding = '2px 4px';
      (link as HTMLElement).style.borderRadius = '4px';
      (link as HTMLElement).style.textDecoration = 'underline';
    } else {
      (link as HTMLElement).style.backgroundColor = '';
      (link as HTMLElement).style.padding = '';
      (link as HTMLElement).style.borderRadius = '';
      (link as HTMLElement).style.textDecoration = '';
    }
  });
};

const magnifyText = (e: MouseEvent): void => {
  const target = e.target as HTMLElement;
  
  if (
    target.tagName === 'P' ||
    target.tagName === 'H1' ||
    target.tagName === 'H2' ||
    target.tagName === 'H3' ||
    target.tagName === 'A' ||
    target.tagName === 'SPAN' ||
    target.tagName === 'LI'
  ) {
    target.style.transform = 'scale(1.1)';
    target.style.display = 'inline-block';
    target.style.transformOrigin = 'left center';
    
    const resetTransform = (): void => {
      target.style.transform = '';
      target.style.display = '';
      target.style.transformOrigin = '';
      target.removeEventListener('mouseout', resetTransform);
    };
    
    target.addEventListener('mouseout', resetTransform);
  }
};

export const applyTextMagnifier = (enable: boolean): void => {
  if (enable) {
    document.body.addEventListener('mouseover', magnifyText);
  } else {
    document.body.removeEventListener('mouseover', magnifyText);
    
    // Reset any magnified elements
    const paragraphs = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, span, li');
    paragraphs.forEach(p => {
      (p as HTMLElement).style.transform = '';
      (p as HTMLElement).style.display = '';
      (p as HTMLElement).style.transformOrigin = '';
    });
  }
};

export const applyContentScaling = (enable: boolean): void => {
  const content = document.querySelector('#demo-website') as HTMLElement;
  if (!content) return;
  
  if (enable) {
    content.style.transform = 'scale(1.1)';
    content.style.transformOrigin = 'top center';
  } else {
    content.style.transform = '';
    content.style.transformOrigin = '';
  }
};

// Color adjustments
export const applyDarkContrast = (enable: boolean): void => {
  if (enable) {
    document.body.style.backgroundColor = '#121212';
    document.body.style.color = '#ffffff';
    
    const elements = document.querySelectorAll('.bg-white');
    elements.forEach(el => {
      el.classList.remove('bg-white');
      el.classList.add('bg-gray-800');
      el.classList.add('text-white');
    });
  } else {
    document.body.style.backgroundColor = '';
    document.body.style.color = '';
    
    const darkElements = document.querySelectorAll('.bg-gray-800.text-white');
    darkElements.forEach(el => {
      el.classList.remove('bg-gray-800');
      el.classList.remove('text-white');
      el.classList.add('bg-white');
    });
  }
};

export const applyLightContrast = (enable: boolean): void => {
  if (enable) {
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#000000';
    
    const elements = document.querySelectorAll('.bg-white');
    elements.forEach(el => {
      el.classList.remove('bg-white');
      el.classList.add('bg-gray-50');
    });
  } else {
    document.body.style.backgroundColor = '';
    document.body.style.color = '';
    
    const lightElements = document.querySelectorAll('.bg-gray-50');
    lightElements.forEach(el => {
      el.classList.remove('bg-gray-50');
      el.classList.add('bg-white');
    });
  }
};

export const applyHighContrast = (enable: boolean): void => {
  document.body.style.filter = enable ? 'contrast(200%)' : '';
};

export const applyHighSaturation = (enable: boolean): void => {
  document.body.style.filter = enable ? 'saturate(200%)' : '';
};

export const applyLowSaturation = (enable: boolean): void => {
  document.body.style.filter = enable ? 'saturate(50%)' : '';
};

export const applyMonochrome = (enable: boolean): void => {
  document.body.style.filter = enable ? 'grayscale(100%)' : '';
};

// Orientation adjustments
export const applyMuteSounds = (mute: boolean): void => {
  const audioElements = document.querySelectorAll('audio, video');
  audioElements.forEach(audio => {
    (audio as HTMLMediaElement).muted = mute;
  });
};

export const applyHideImages = (hide: boolean): void => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    (img as HTMLImageElement).style.visibility = hide ? 'hidden' : 'visible';
  });
};

// Reading mask elements (create if needed)
const ensureReadingMaskElements = (): { top: HTMLElement, bottom: HTMLElement } => {
  let top = document.getElementById('reading-mask-top');
  let bottom = document.getElementById('reading-mask-bottom');
  
  if (!top) {
    top = document.createElement('div');
    top.id = 'reading-mask-top';
    top.style.position = 'fixed';
    top.style.top = '0';
    top.style.left = '0';
    top.style.width = '100%';
    top.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    top.style.zIndex = '9998';
    top.style.pointerEvents = 'none';
    document.body.appendChild(top);
  }
  
  if (!bottom) {
    bottom = document.createElement('div');
    bottom.id = 'reading-mask-bottom';
    bottom.style.position = 'fixed';
    bottom.style.bottom = '0';
    bottom.style.left = '0';
    bottom.style.width = '100%';
    bottom.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    bottom.style.zIndex = '9998';
    bottom.style.pointerEvents = 'none';
    document.body.appendChild(bottom);
  }
  
  return { top, bottom };
};

const moveReadingMask = (e: MouseEvent): void => {
  const { top, bottom } = ensureReadingMaskElements();
  const maskHeight = 100; // Height of the unmasked area
  
  top.style.height = `${e.clientY - maskHeight/2}px`;
  bottom.style.height = `${window.innerHeight - e.clientY - maskHeight/2}px`;
  bottom.style.top = `${e.clientY + maskHeight/2}px`;
};

export const applyReadingMask = (enable: boolean): void => {
  const { top, bottom } = ensureReadingMaskElements();
  
  if (enable) {
    document.addEventListener('mousemove', moveReadingMask);
    top.style.display = 'block';
    bottom.style.display = 'block';
  } else {
    document.removeEventListener('mousemove', moveReadingMask);
    top.style.display = 'none';
    bottom.style.display = 'none';
  }
};

// Reading guide
const ensureReadingGuideElement = (): HTMLElement => {
  let guide = document.getElementById('reading-guide');
  
  if (!guide) {
    guide = document.createElement('div');
    guide.id = 'reading-guide';
    guide.style.position = 'fixed';
    guide.style.width = '100%';
    guide.style.height = '12px';
    guide.style.backgroundColor = 'rgba(255, 235, 59, 0.3)';
    guide.style.zIndex = '9999';
    guide.style.pointerEvents = 'none';
    document.body.appendChild(guide);
  }
  
  return guide;
};

const moveReadingGuide = (e: MouseEvent): void => {
  const guide = ensureReadingGuideElement();
  guide.style.top = `${e.clientY - guide.offsetHeight/2}px`;
};

export const applyReadingGuide = (enable: boolean): void => {
  const guide = ensureReadingGuideElement();
  
  if (enable) {
    document.addEventListener('mousemove', moveReadingGuide);
    guide.style.display = 'block';
  } else {
    document.removeEventListener('mousemove', moveReadingGuide);
    guide.style.display = 'none';
  }
};

export const applyStopAnimations = (stop: boolean): void => {
  let style = document.getElementById('stop-animations-style');
  
  if (stop) {
    if (!style) {
      style = document.createElement('style');
      style.id = 'stop-animations-style';
      style.innerHTML = '* { animation: none !important; transition: none !important; }';
      document.head.appendChild(style);
    }
  } else {
    if (style) {
      style.remove();
    }
  }
};

export const applyHighlightFocus = (highlight: boolean): void => {
  let style = document.getElementById('highlight-focus-style');
  
  if (highlight) {
    if (!style) {
      style = document.createElement('style');
      style.id = 'highlight-focus-style';
      style.innerHTML = '*:focus { outline: 3px solid #4A6CF7 !important; outline-offset: 3px !important; }';
      document.head.appendChild(style);
    }
  } else {
    if (style) {
      style.remove();
    }
  }
};

export const applyCursor = (cursor: 'default' | 'bigBlack' | 'bigWhite'): void => {
  switch (cursor) {
    case 'default':
      document.body.style.cursor = '';
      break;
    case 'bigBlack':
      document.body.style.cursor = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23000000\' stroke-width=\'3\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M14 15l-4 4\'/%3E%3Cpath d=\'M14 9v12\'/%3E%3Cpath d=\'M4 4l16 16\'/%3E%3C/svg%3E"), auto';
      break;
    case 'bigWhite':
      document.body.style.cursor = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23FFFFFF\' stroke-width=\'3\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M14 15l-4 4\'/%3E%3Cpath d=\'M14 9v12\'/%3E%3Cpath d=\'M4 4l16 16\'/%3E%3C/svg%3E"), auto';
      break;
  }
};

export const applyHoverHighlight = (highlight: boolean): void => {
  let style = document.getElementById('hover-highlight-style');
  
  if (highlight) {
    if (!style) {
      style = document.createElement('style');
      style.id = 'hover-highlight-style';
      style.innerHTML = 'a:hover, button:hover, input:hover, select:hover, textarea:hover { background-color: rgba(74, 108, 247, 0.2) !important; transition: background-color 0s !important; }';
      document.head.appendChild(style);
    }
  } else {
    if (style) {
      style.remove();
    }
  }
};

// Reset all
export const resetAllAccessibility = (): void => {
  // Reset content adjustments
  applyFontSize(100);
  applyLineHeight(1);
  applyLetterSpacing(0);
  applyHelveticaFont(false);
  applyTextAlignment(null);
  applyHighlightHeadings(false);
  applyHighlightLinks(false);
  applyTextMagnifier(false);
  applyContentScaling(false);
  
  // Reset color adjustments
  applyDarkContrast(false);
  applyLightContrast(false);
  applyHighContrast(false);
  applyHighSaturation(false);
  applyLowSaturation(false);
  applyMonochrome(false);
  
  // Reset orientation adjustments
  applyMuteSounds(false);
  applyHideImages(false);
  applyReadingMask(false);
  applyReadingGuide(false);
  applyStopAnimations(false);
  applyHighlightFocus(false);
  applyCursor('default');
  applyHoverHighlight(false);
};
