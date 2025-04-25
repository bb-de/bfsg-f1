import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AccessibilityState {
  // Widget state
  isOpen: boolean;
  activeTab: 'content' | 'color' | 'orientation';

  // Content adjustments
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  useHelvetica: boolean;
  textAlign: 'left' | 'center' | 'right' | null;
  highlightHeadings: boolean;
  highlightLinks: boolean;
  textMagnifier: boolean;
  contentScaling: boolean;
  
  // Color adjustments
  darkContrast: boolean;
  lightContrast: boolean;
  highContrast: boolean;
  highSaturation: boolean;
  lowSaturation: boolean;
  monochrome: boolean;
  
  // Orientation adjustments
  muteSounds: boolean;
  hideImages: boolean;
  readingMask: boolean;
  readingGuide: boolean;
  stopAnimations: boolean;
  highlightFocus: boolean;
  cursor: 'default' | 'bigBlack' | 'bigWhite';
  hoverHighlight: boolean;
  
  // Actions
  setIsOpen: (isOpen: boolean) => void;
  setActiveTab: (tab: 'content' | 'color' | 'orientation') => void;
  
  // Content adjustment actions
  setFontSize: (size: number) => void;
  setLineHeight: (height: number) => void;
  setLetterSpacing: (spacing: number) => void;
  setUseHelvetica: (use: boolean) => void;
  setTextAlign: (align: 'left' | 'center' | 'right' | null) => void;
  setHighlightHeadings: (highlight: boolean) => void;
  setHighlightLinks: (highlight: boolean) => void;
  setTextMagnifier: (magnify: boolean) => void;
  setContentScaling: (scale: boolean) => void;
  
  // Color adjustment actions
  setDarkContrast: (enable: boolean) => void;
  setLightContrast: (enable: boolean) => void;
  setHighContrast: (enable: boolean) => void;
  setHighSaturation: (enable: boolean) => void;
  setLowSaturation: (enable: boolean) => void;
  setMonochrome: (enable: boolean) => void;
  
  // Orientation adjustment actions
  setMuteSounds: (mute: boolean) => void;
  setHideImages: (hide: boolean) => void;
  setReadingMask: (enable: boolean) => void;
  setReadingGuide: (enable: boolean) => void;
  setStopAnimations: (stop: boolean) => void;
  setHighlightFocus: (highlight: boolean) => void;
  setCursor: (cursor: 'default' | 'bigBlack' | 'bigWhite') => void;
  setHoverHighlight: (highlight: boolean) => void;
  
  // Reset action
  resetAll: () => void;
}

// Create the store with persistence
export const useAccessibilityStore = create<AccessibilityState>()(
  persist(
    (set) => ({
      // Widget state
      isOpen: false,
      activeTab: 'content',
      
      // Content adjustments
      fontSize: 100,
      lineHeight: 1,
      letterSpacing: 0,
      useHelvetica: false,
      textAlign: null,
      highlightHeadings: false,
      highlightLinks: false,
      textMagnifier: false,
      contentScaling: false,
      
      // Color adjustments
      darkContrast: false,
      lightContrast: false,
      highContrast: false,
      highSaturation: false,
      lowSaturation: false,
      monochrome: false,
      
      // Orientation adjustments
      muteSounds: false,
      hideImages: false,
      readingMask: false,
      readingGuide: false,
      stopAnimations: false,
      highlightFocus: false,
      cursor: 'default',
      hoverHighlight: false,
      
      // Actions
      setIsOpen: (isOpen) => set({ isOpen }),
      setActiveTab: (activeTab) => set({ activeTab }),
      
      // Content adjustment actions
      setFontSize: (fontSize) => set({ fontSize }),
      setLineHeight: (lineHeight) => set({ lineHeight }),
      setLetterSpacing: (letterSpacing) => set({ letterSpacing }),
      setUseHelvetica: (useHelvetica) => set({ useHelvetica }),
      setTextAlign: (textAlign) => set({ textAlign }),
      setHighlightHeadings: (highlightHeadings) => set({ highlightHeadings }),
      setHighlightLinks: (highlightLinks) => set({ highlightLinks }),
      setTextMagnifier: (textMagnifier) => set({ textMagnifier }),
      setContentScaling: (contentScaling) => set({ contentScaling }),
      
      // Color adjustment actions
      setDarkContrast: (darkContrast) => {
        // Reset other color modes
        if (darkContrast) {
          set({
            darkContrast,
            lightContrast: false,
            highContrast: false,
            highSaturation: false,
            lowSaturation: false,
            monochrome: false,
          });
        } else {
          set({ darkContrast });
        }
      },
      setLightContrast: (lightContrast) => {
        // Reset other color modes
        if (lightContrast) {
          set({
            darkContrast: false,
            lightContrast,
            highContrast: false,
            highSaturation: false,
            lowSaturation: false,
            monochrome: false,
          });
        } else {
          set({ lightContrast });
        }
      },
      setHighContrast: (highContrast) => {
        // Reset other color modes
        if (highContrast) {
          set({
            darkContrast: false,
            lightContrast: false,
            highContrast,
            highSaturation: false,
            lowSaturation: false,
            monochrome: false,
          });
        } else {
          set({ highContrast });
        }
      },
      setHighSaturation: (highSaturation) => {
        // Reset other color modes
        if (highSaturation) {
          set({
            darkContrast: false,
            lightContrast: false,
            highContrast: false,
            highSaturation,
            lowSaturation: false,
            monochrome: false,
          });
        } else {
          set({ highSaturation });
        }
      },
      setLowSaturation: (lowSaturation) => {
        // Reset other color modes
        if (lowSaturation) {
          set({
            darkContrast: false,
            lightContrast: false,
            highContrast: false,
            highSaturation: false,
            lowSaturation,
            monochrome: false,
          });
        } else {
          set({ lowSaturation });
        }
      },
      setMonochrome: (monochrome) => {
        // Reset other color modes
        if (monochrome) {
          set({
            darkContrast: false,
            lightContrast: false,
            highContrast: false,
            highSaturation: false,
            lowSaturation: false,
            monochrome,
          });
        } else {
          set({ monochrome });
        }
      },
      
      // Orientation adjustment actions
      setMuteSounds: (muteSounds) => set({ muteSounds }),
      setHideImages: (hideImages) => set({ hideImages }),
      setReadingMask: (readingMask) => set({ readingMask }),
      setReadingGuide: (readingGuide) => set({ readingGuide }),
      setStopAnimations: (stopAnimations) => set({ stopAnimations }),
      setHighlightFocus: (highlightFocus) => set({ highlightFocus }),
      setCursor: (cursor) => set({ cursor }),
      setHoverHighlight: (hoverHighlight) => set({ hoverHighlight }),
      
      // Reset action
      resetAll: () => set({
        // Content adjustments
        fontSize: 100,
        lineHeight: 1,
        letterSpacing: 0,
        useHelvetica: false,
        textAlign: null,
        highlightHeadings: false,
        highlightLinks: false,
        textMagnifier: false,
        contentScaling: false,
        
        // Color adjustments
        darkContrast: false,
        lightContrast: false,
        highContrast: false,
        highSaturation: false,
        lowSaturation: false,
        monochrome: false,
        
        // Orientation adjustments
        muteSounds: false,
        hideImages: false,
        readingMask: false,
        readingGuide: false,
        stopAnimations: false,
        highlightFocus: false,
        cursor: 'default',
        hoverHighlight: false,
      }),
    }),
    {
      name: 'accessibility-settings',
    }
  )
);
