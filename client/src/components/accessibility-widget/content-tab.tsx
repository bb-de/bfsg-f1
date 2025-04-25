import { useState, useEffect } from 'react';
import { useAccessibilityStore } from '@/hooks/use-accessibility-store';

export default function ContentTab() {
  const {
    fontSize,
    lineHeight,
    letterSpacing,
    useHelvetica,
    textAlign,
    highlightHeadings,
    highlightLinks,
    textMagnifier,
    contentScaling,
    setFontSize,
    setLineHeight,
    setLetterSpacing,
    setUseHelvetica,
    setTextAlign,
    setHighlightHeadings,
    setHighlightLinks,
    setTextMagnifier,
    setContentScaling,
  } = useAccessibilityStore();
  
  // Display values for sliders
  const [fontSizeDisplay, setFontSizeDisplay] = useState(`${fontSize}%`);
  const [lineHeightDisplay, setLineHeightDisplay] = useState(lineHeight === 1 ? 'Normal' : `${lineHeight}`);
  const [letterSpacingDisplay, setLetterSpacingDisplay] = useState(letterSpacing === 0 ? 'Normal' : `${letterSpacing}px`);
  
  // Update display values when settings change
  useEffect(() => {
    setFontSizeDisplay(`${fontSize}%`);
  }, [fontSize]);
  
  useEffect(() => {
    setLineHeightDisplay(lineHeight === 1 ? 'Normal' : `${lineHeight}`);
  }, [lineHeight]);
  
  useEffect(() => {
    setLetterSpacingDisplay(letterSpacing === 0 ? 'Normal' : `${letterSpacing}px`);
  }, [letterSpacing]);
  
  return (
    <div id="content-tab-panel" className="p-4 space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Content Adjustments</h3>
        
        {/* Font Size */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="font-size" className="block text-sm font-medium text-gray-700">Font Size</label>
            <span id="font-size-value" className="text-sm text-gray-500">{fontSizeDisplay}</span>
          </div>
          <input 
            type="range" 
            min="100" 
            max="200" 
            value={fontSize} 
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
            id="font-size"
          />
        </div>
        
        {/* Line Height */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="line-height" className="block text-sm font-medium text-gray-700">Line Height</label>
            <span id="line-height-value" className="text-sm text-gray-500">{lineHeightDisplay}</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="3" 
            step="0.1" 
            value={lineHeight} 
            onChange={(e) => setLineHeight(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
            id="line-height"
          />
        </div>
        
        {/* Letter Spacing */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="letter-spacing" className="block text-sm font-medium text-gray-700">Letter Spacing</label>
            <span id="letter-spacing-value" className="text-sm text-gray-500">{letterSpacingDisplay}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="10" 
            value={letterSpacing} 
            onChange={(e) => setLetterSpacing(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
            id="letter-spacing"
          />
        </div>
        
        {/* Font Family */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="font-family-toggle" className="block text-sm font-medium text-gray-700">Use Helvetica Font</label>
            <div className="relative inline-block w-10 align-middle select-none">
              <input 
                type="checkbox" 
                id="font-family-toggle" 
                className="sr-only"
                checked={useHelvetica}
                onChange={(e) => setUseHelvetica(e.target.checked)}
              />
              <div className={`block h-6 w-10 rounded-full cursor-pointer ${useHelvetica ? 'bg-primary' : 'bg-gray-300'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${useHelvetica ? 'translate-x-4' : 'translate-x-0'}`}></div>
            </div>
          </div>
        </div>
        
        {/* Text Alignment Options */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Text Alignment</label>
          <div className="flex space-x-2">
            <button 
              id="align-left" 
              onClick={() => setTextAlign('left')}
              className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${textAlign === 'left' ? 'bg-primary text-white' : 'border-gray-300 hover:bg-gray-100'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h14" />
              </svg>
            </button>
            <button 
              id="align-center" 
              onClick={() => setTextAlign('center')}
              className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${textAlign === 'center' ? 'bg-primary text-white' : 'border-gray-300 hover:bg-gray-100'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M6 12h12M4 18h16" />
              </svg>
            </button>
            <button 
              id="align-right" 
              onClick={() => setTextAlign('right')}
              className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${textAlign === 'right' ? 'bg-primary text-white' : 'border-gray-300 hover:bg-gray-100'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M10 12h10M6 18h14" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Highlight Features */}
        <div className="space-y-4">
          {/* Highlight Headings */}
          <div className="flex justify-between items-center">
            <label htmlFor="highlight-headings-toggle" className="block text-sm font-medium text-gray-700">Highlight Headings</label>
            <div className="relative inline-block w-10 align-middle select-none">
              <input 
                type="checkbox" 
                id="highlight-headings-toggle" 
                className="sr-only"
                checked={highlightHeadings}
                onChange={(e) => setHighlightHeadings(e.target.checked)}
              />
              <div className={`block h-6 w-10 rounded-full cursor-pointer ${highlightHeadings ? 'bg-primary' : 'bg-gray-300'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${highlightHeadings ? 'translate-x-4' : 'translate-x-0'}`}></div>
            </div>
          </div>
          
          {/* Highlight Links */}
          <div className="flex justify-between items-center">
            <label htmlFor="highlight-links-toggle" className="block text-sm font-medium text-gray-700">Highlight Links</label>
            <div className="relative inline-block w-10 align-middle select-none">
              <input 
                type="checkbox" 
                id="highlight-links-toggle" 
                className="sr-only"
                checked={highlightLinks}
                onChange={(e) => setHighlightLinks(e.target.checked)}
              />
              <div className={`block h-6 w-10 rounded-full cursor-pointer ${highlightLinks ? 'bg-primary' : 'bg-gray-300'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${highlightLinks ? 'translate-x-4' : 'translate-x-0'}`}></div>
            </div>
          </div>
          
          {/* Text Magnifier */}
          <div className="flex justify-between items-center">
            <label htmlFor="text-magnifier-toggle" className="block text-sm font-medium text-gray-700">Text Magnifier on Hover</label>
            <div className="relative inline-block w-10 align-middle select-none">
              <input 
                type="checkbox" 
                id="text-magnifier-toggle" 
                className="sr-only"
                checked={textMagnifier}
                onChange={(e) => setTextMagnifier(e.target.checked)}
              />
              <div className={`block h-6 w-10 rounded-full cursor-pointer ${textMagnifier ? 'bg-primary' : 'bg-gray-300'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${textMagnifier ? 'translate-x-4' : 'translate-x-0'}`}></div>
            </div>
          </div>
          
          {/* Content Scaling */}
          <div className="flex justify-between items-center">
            <label htmlFor="content-scaling-toggle" className="block text-sm font-medium text-gray-700">Content Scaling</label>
            <div className="relative inline-block w-10 align-middle select-none">
              <input 
                type="checkbox" 
                id="content-scaling-toggle" 
                className="sr-only"
                checked={contentScaling}
                onChange={(e) => setContentScaling(e.target.checked)}
              />
              <div className={`block h-6 w-10 rounded-full cursor-pointer ${contentScaling ? 'bg-primary' : 'bg-gray-300'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${contentScaling ? 'translate-x-4' : 'translate-x-0'}`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
