import { useEffect, useCallback } from 'react';
import { useAccessibilityStore } from '@/hooks/use-accessibility-store';
import ContentTab from './content-tab';
import ColorTab from './color-tab';
import OrientationTab from './orientation-tab';
import * as accessibilityEffects from '@/lib/accessibility-effects';

export default function AccessibilityWidget() {
  const {
    isOpen,
    activeTab,
    resetAll,
    setIsOpen,
    setActiveTab,
    
    // Content adjustments
    fontSize,
    lineHeight,
    letterSpacing,
    useHelvetica,
    textAlign,
    highlightHeadings,
    highlightLinks,
    textMagnifier,
    contentScaling,
    
    // Color adjustments
    darkContrast,
    lightContrast,
    highContrast,
    highSaturation,
    lowSaturation,
    monochrome,
    
    // Orientation adjustments
    muteSounds,
    hideImages,
    readingMask,
    readingGuide,
    stopAnimations,
    highlightFocus,
    cursor,
    hoverHighlight,
  } = useAccessibilityStore();
  
  // Apply effects whenever settings change
  useEffect(() => {
    accessibilityEffects.applyFontSize(fontSize);
  }, [fontSize]);
  
  useEffect(() => {
    accessibilityEffects.applyLineHeight(lineHeight);
  }, [lineHeight]);
  
  useEffect(() => {
    accessibilityEffects.applyLetterSpacing(letterSpacing);
  }, [letterSpacing]);
  
  useEffect(() => {
    accessibilityEffects.applyHelveticaFont(useHelvetica);
  }, [useHelvetica]);
  
  useEffect(() => {
    accessibilityEffects.applyTextAlignment(textAlign);
  }, [textAlign]);
  
  useEffect(() => {
    accessibilityEffects.applyHighlightHeadings(highlightHeadings);
  }, [highlightHeadings]);
  
  useEffect(() => {
    accessibilityEffects.applyHighlightLinks(highlightLinks);
  }, [highlightLinks]);
  
  useEffect(() => {
    accessibilityEffects.applyTextMagnifier(textMagnifier);
  }, [textMagnifier]);
  
  useEffect(() => {
    accessibilityEffects.applyContentScaling(contentScaling);
  }, [contentScaling]);
  
  useEffect(() => {
    accessibilityEffects.applyDarkContrast(darkContrast);
  }, [darkContrast]);
  
  useEffect(() => {
    accessibilityEffects.applyLightContrast(lightContrast);
  }, [lightContrast]);
  
  useEffect(() => {
    accessibilityEffects.applyHighContrast(highContrast);
  }, [highContrast]);
  
  useEffect(() => {
    accessibilityEffects.applyHighSaturation(highSaturation);
  }, [highSaturation]);
  
  useEffect(() => {
    accessibilityEffects.applyLowSaturation(lowSaturation);
  }, [lowSaturation]);
  
  useEffect(() => {
    accessibilityEffects.applyMonochrome(monochrome);
  }, [monochrome]);
  
  useEffect(() => {
    accessibilityEffects.applyMuteSounds(muteSounds);
  }, [muteSounds]);
  
  useEffect(() => {
    accessibilityEffects.applyHideImages(hideImages);
  }, [hideImages]);
  
  useEffect(() => {
    accessibilityEffects.applyReadingMask(readingMask);
  }, [readingMask]);
  
  useEffect(() => {
    accessibilityEffects.applyReadingGuide(readingGuide);
  }, [readingGuide]);
  
  useEffect(() => {
    accessibilityEffects.applyStopAnimations(stopAnimations);
  }, [stopAnimations]);
  
  useEffect(() => {
    accessibilityEffects.applyHighlightFocus(highlightFocus);
  }, [highlightFocus]);
  
  useEffect(() => {
    accessibilityEffects.applyCursor(cursor);
  }, [cursor]);
  
  useEffect(() => {
    accessibilityEffects.applyHoverHighlight(hoverHighlight);
  }, [hoverHighlight]);
  
  // Handle Alt+L keyboard shortcut
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.altKey && e.key === 'l') {
      resetAll();
    }
  }, [resetAll]);
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  return (
    <>
      {/* Toggle Button */}
      <button 
        id="acc-widget-toggle" 
        aria-label="Open accessibility menu"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414-6.414a2 2 0 0 1 2.828 0L21 12M3 12h18" />
        </svg>
      </button>
      
      {/* Widget Panel */}
      <div 
        id="acc-widget"
        className={`fixed top-0 right-0 h-full w-full sm:w-80 md:w-96 bg-white shadow-lg z-40 overflow-y-auto transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="p-4 bg-primary text-white flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414-6.414a2 2 0 0 1 2.828 0L21 12M3 12h18" />
            </svg>
            Accessibility Options
          </h2>
          <button 
            id="acc-widget-close" 
            aria-label="Close accessibility menu"
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button 
            id="tab-content"
            onClick={() => setActiveTab('content')}
            className={`py-3 px-4 w-1/3 text-sm font-medium text-center ${activeTab === 'content' ? 'bg-gray-50 text-primary border-b-2 border-primary' : 'text-gray-500'}`}
          >
            Content
          </button>
          <button 
            id="tab-color"
            onClick={() => setActiveTab('color')}
            className={`py-3 px-4 w-1/3 text-sm font-medium text-center ${activeTab === 'color' ? 'bg-gray-50 text-primary border-b-2 border-primary' : 'text-gray-500'}`}
          >
            Color
          </button>
          <button 
            id="tab-orientation"
            onClick={() => setActiveTab('orientation')}
            className={`py-3 px-4 w-1/3 text-sm font-medium text-center ${activeTab === 'orientation' ? 'bg-gray-50 text-primary border-b-2 border-primary' : 'text-gray-500'}`}
          >
            Orientation
          </button>
        </div>
        
        {/* Reset Button */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <button 
            id="acc-reset-btn"
            onClick={resetAll}
            className="w-full py-2 flex items-center justify-center bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset All Settings (Alt + L)
          </button>
        </div>
        
        {/* Tab Panels */}
        {activeTab === 'content' && <ContentTab />}
        {activeTab === 'color' && <ColorTab />}
        {activeTab === 'orientation' && <OrientationTab />}
      </div>
    </>
  );
}
