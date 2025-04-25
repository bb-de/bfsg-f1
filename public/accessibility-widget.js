/*
 * Accessibility Widget
 * A standalone widget that provides accessibility options for any website
 * Can be included with a simple script tag
 */

(function() {
  // Make the widget accessible globally for testing and debugging
  window.AccessibilityWidget = null;
  window.AccessibilityStore = null;
  window.AccessibilityEffects = null;
  
  // Add CSS for micro-animations
  const animationStyle = document.createElement('style');
  animationStyle.id = 'accessibility-animations';
  animationStyle.innerHTML = `
    @keyframes button-activate {
      0% { transform: scale(1); box-shadow: 0 0 0 rgba(74, 108, 247, 0); }
      50% { transform: scale(1.05); box-shadow: 0 0 10px rgba(74, 108, 247, 0.3); }
      100% { transform: scale(1); box-shadow: 0 0 5px rgba(74, 108, 247, 0.2); }
    }
    @keyframes button-deactivate {
      0% { transform: scale(1); }
      50% { transform: scale(0.95); }
      100% { transform: scale(1); }
    }
    @keyframes content-highlight {
      0% { background-color: rgba(74, 108, 247, 0); }
      30% { background-color: rgba(74, 108, 247, 0.2); }
      100% { background-color: rgba(74, 108, 247, 0); }
    }
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.9; }
      100% { transform: scale(1); opacity: 1; }
    }
    .accessibility-button-active {
      animation: button-activate 0.5s ease forwards !important;
    }
    .accessibility-button-inactive {
      animation: button-deactivate 0.3s ease forwards !important;
    }
    .accessibility-highlight {
      animation: content-highlight 1s ease forwards !important;
    }
    .accessibility-pulse {
      animation: pulse 2s infinite !important;
    }
  `;
  document.head.appendChild(animationStyle);
  // Store all user preferences
  const AccessibilityStore = {
    settings: {
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
    },
    
    // Load saved settings from localStorage
    load() {
      try {
        const saved = localStorage.getItem('accessibility-settings');
        if (saved) {
          const parsed = JSON.parse(saved);
          this.settings = { ...this.settings, ...parsed };
        }
      } catch (e) {
        console.error('Failed to load accessibility settings', e);
      }
    },
    
    // Save settings to localStorage
    save() {
      try {
        localStorage.setItem('accessibility-settings', JSON.stringify(this.settings));
      } catch (e) {
        console.error('Failed to save accessibility settings', e);
      }
    },
    
    // Update a setting and save
    update(key, value) {
      // Special handling for color modes to ensure only one is active at a time
      if (['darkContrast', 'lightContrast', 'highContrast', 'highSaturation', 'lowSaturation', 'monochrome'].includes(key) && value === true) {
        this.settings.darkContrast = false;
        this.settings.lightContrast = false;
        this.settings.highContrast = false;
        this.settings.highSaturation = false;
        this.settings.lowSaturation = false;
        this.settings.monochrome = false;
      }
      
      this.settings[key] = value;
      this.save();
      
      // Apply the effect
      AccessibilityEffects.apply(key, value);
    },
    
    // Reset all settings to defaults
    resetAll() {
      const defaultSettings = {
        // Widget state
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
      };
      
      // Keep widget open
      this.settings = { ...defaultSettings, isOpen: this.settings.isOpen };
      this.save();
      
      // Apply all effects
      AccessibilityEffects.applyAll();
    }
  };
  
  // Apply accessibility effects to the page
  const AccessibilityEffects = {
    // Apply a specific effect based on setting name
    apply(setting, value) {
      switch(setting) {
        // Content adjustments
        case 'fontSize':
          this.applyFontSize(value);
          break;
        case 'lineHeight':
          this.applyLineHeight(value);
          break;
        case 'letterSpacing':
          this.applyLetterSpacing(value);
          break;
        case 'useHelvetica':
          this.applyHelveticaFont(value);
          break;
        case 'textAlign':
          this.applyTextAlignment(value);
          break;
        case 'highlightHeadings':
          this.applyHighlightHeadings(value);
          break;
        case 'highlightLinks':
          this.applyHighlightLinks(value);
          break;
        case 'textMagnifier':
          this.applyTextMagnifier(value);
          break;
        case 'contentScaling':
          this.applyContentScaling(value);
          break;
          
        // Color adjustments
        case 'darkContrast':
          this.applyDarkContrast(value);
          break;
        case 'lightContrast':
          this.applyLightContrast(value);
          break;
        case 'highContrast':
          this.applyHighContrast(value);
          break;
        case 'highSaturation':
          this.applyHighSaturation(value);
          break;
        case 'lowSaturation':
          this.applyLowSaturation(value);
          break;
        case 'monochrome':
          this.applyMonochrome(value);
          break;
          
        // Orientation adjustments
        case 'muteSounds':
          this.applyMuteSounds(value);
          break;
        case 'hideImages':
          this.applyHideImages(value);
          break;
        case 'readingMask':
          this.applyReadingMask(value);
          break;
        case 'readingGuide':
          this.applyReadingGuide(value);
          break;
        case 'stopAnimations':
          this.applyStopAnimations(value);
          break;
        case 'highlightFocus':
          this.applyHighlightFocus(value);
          break;
        case 'cursor':
          this.applyCursor(value);
          break;
        case 'hoverHighlight':
          this.applyHoverHighlight(value);
          break;
      }
    },
    
    // Apply all effects based on current settings
    applyAll() {
      const settings = AccessibilityStore.settings;
      
      // Content adjustments
      this.applyFontSize(settings.fontSize);
      this.applyLineHeight(settings.lineHeight);
      this.applyLetterSpacing(settings.letterSpacing);
      this.applyHelveticaFont(settings.useHelvetica);
      this.applyTextAlignment(settings.textAlign);
      this.applyHighlightHeadings(settings.highlightHeadings);
      this.applyHighlightLinks(settings.highlightLinks);
      this.applyTextMagnifier(settings.textMagnifier);
      this.applyContentScaling(settings.contentScaling);
      
      // Color adjustments
      this.applyDarkContrast(settings.darkContrast);
      this.applyLightContrast(settings.lightContrast);
      this.applyHighContrast(settings.highContrast);
      this.applyHighSaturation(settings.highSaturation);
      this.applyLowSaturation(settings.lowSaturation);
      this.applyMonochrome(settings.monochrome);
      
      // Orientation adjustments
      this.applyMuteSounds(settings.muteSounds);
      this.applyHideImages(settings.hideImages);
      this.applyReadingMask(settings.readingMask);
      this.applyReadingGuide(settings.readingGuide);
      this.applyStopAnimations(settings.stopAnimations);
      this.applyHighlightFocus(settings.highlightFocus);
      this.applyCursor(settings.cursor);
      this.applyHoverHighlight(settings.hoverHighlight);
    },
    
    // Content adjustment effects
    applyFontSize(size) {
      // Apply to all content except the widget itself
      const contentSelector = '#demo-website, body > *:not(#acc-widget, #acc-widget-toggle)';
      const contentElements = document.querySelectorAll(contentSelector);
      
      contentElements.forEach(el => {
        el.style.fontSize = `${size}%`;
      });
    },
    
    applyLineHeight(height) {
      // Apply to all content except the widget itself
      const contentSelector = '#demo-website, body > *:not(#acc-widget, #acc-widget-toggle)';
      const contentElements = document.querySelectorAll(contentSelector);
      
      contentElements.forEach(el => {
        el.style.lineHeight = height === 1 ? '' : `${height}`;
      });
    },
    
    applyLetterSpacing(spacing) {
      // Apply to all content except the widget itself
      const contentSelector = '#demo-website, body > *:not(#acc-widget, #acc-widget-toggle)';
      const contentElements = document.querySelectorAll(contentSelector);
      
      contentElements.forEach(el => {
        el.style.letterSpacing = spacing === 0 ? '' : `${spacing}px`;
      });
    },
    
    applyHelveticaFont(useHelvetica) {
      // Apply to all content except the widget itself
      const contentSelector = '#demo-website, body > *:not(#acc-widget, #acc-widget-toggle)';
      const contentElements = document.querySelectorAll(contentSelector);
      
      contentElements.forEach(el => {
        el.style.fontFamily = useHelvetica ? 'Helvetica, Arial, sans-serif' : '';
      });
    },
    
    applyTextAlignment(align) {
      // Apply to all content except the widget itself
      const contentSelector = '#demo-website, body > *:not(#acc-widget, #acc-widget-toggle)';
      const contentElements = document.querySelectorAll(contentSelector);
      
      contentElements.forEach(el => {
        el.style.textAlign = align || '';
      });
    },
    
    applyHighlightHeadings(highlight) {
      // Apply to content area only, not widget
      const contentSelector = '#demo-website';
      const contentElement = document.querySelector(contentSelector);
      
      if (contentElement) {
        const headings = contentElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
        
        headings.forEach(heading => {
          if (highlight) {
            heading.style.backgroundColor = 'rgba(74, 108, 247, 0.2)';
            heading.style.padding = '4px';
            heading.style.borderRadius = '4px';
          } else {
            heading.style.backgroundColor = '';
            heading.style.padding = '';
            heading.style.borderRadius = '';
          }
        });
      }
    },
    
    applyHighlightLinks(highlight) {
      // Apply to content area only, not widget
      const contentSelector = '#demo-website';
      const contentElement = document.querySelector(contentSelector);
      
      if (contentElement) {
        const links = contentElement.querySelectorAll('a');
        
        links.forEach(link => {
          if (highlight) {
            link.style.backgroundColor = 'rgba(255, 215, 0, 0.3)';
            link.style.padding = '2px 4px';
            link.style.borderRadius = '4px';
            link.style.textDecoration = 'underline';
          } else {
            link.style.backgroundColor = '';
            link.style.padding = '';
            link.style.borderRadius = '';
            link.style.textDecoration = '';
          }
        });
      }
    },
    
    // Function to handle text magnification on hover
    magnifyText(e) {
      const target = e.target;
      
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
        
        const resetTransform = () => {
          target.style.transform = '';
          target.style.display = '';
          target.style.transformOrigin = '';
          target.removeEventListener('mouseout', resetTransform);
        };
        
        target.addEventListener('mouseout', resetTransform);
      }
    },
    
    applyTextMagnifier(enable) {
      // Apply to content area only, not widget
      const contentSelector = '#demo-website';
      const contentElement = document.querySelector(contentSelector);
      
      if (contentElement) {
        if (enable) {
          contentElement.addEventListener('mouseover', this.magnifyText);
        } else {
          contentElement.removeEventListener('mouseover', this.magnifyText);
          
          // Reset any magnified elements
          const elements = contentElement.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, span, li');
          elements.forEach(el => {
            el.style.transform = '';
            el.style.display = '';
            el.style.transformOrigin = '';
          });
        }
      }
    },
    
    applyContentScaling(enable) {
      // Apply to content area only, not widget
      const contentSelector = '#demo-website';
      const contentElement = document.querySelector(contentSelector);
      
      if (contentElement) {
        if (enable) {
          contentElement.style.transform = 'scale(1.1)';
          contentElement.style.transformOrigin = 'top center';
        } else {
          contentElement.style.transform = '';
          contentElement.style.transformOrigin = '';
        }
      }
    },
    
    // Color adjustment effects
    applyDarkContrast(enable) {
      // Apply to content area only, not widget
      const contentSelector = '#demo-website';
      const contentElement = document.querySelector(contentSelector);
      
      if (contentElement) {
        if (enable) {
          contentElement.style.backgroundColor = '#121212';
          contentElement.style.color = '#ffffff';
          
          const elements = contentElement.querySelectorAll('.bg-white, [style*="background-color: white"], [style*="background-color: #fff"], [style*="background-color: #ffffff"]');
          elements.forEach(el => {
            el.setAttribute('data-original-bg', el.style.backgroundColor || 'transparent');
            el.style.backgroundColor = '#333';
            el.style.color = '#fff';
          });
        } else {
          contentElement.style.backgroundColor = '';
          contentElement.style.color = '';
          
          const elements = contentElement.querySelectorAll('[data-original-bg]');
          elements.forEach(el => {
            el.style.backgroundColor = el.getAttribute('data-original-bg');
            el.style.color = '';
            el.removeAttribute('data-original-bg');
          });
        }
      }
    },
    
    applyLightContrast(enable) {
      // Apply to content area only, not widget
      const contentSelector = '#demo-website';
      const contentElement = document.querySelector(contentSelector);
      
      if (contentElement) {
        if (enable) {
          contentElement.style.backgroundColor = '#ffffff';
          contentElement.style.color = '#000000';
          
          const elements = contentElement.querySelectorAll('.bg-gray-50, .bg-gray-100, .bg-gray-200');
          elements.forEach(el => {
            el.setAttribute('data-original-bg', el.style.backgroundColor || 'transparent');
            el.style.backgroundColor = '#f8f9fa';
          });
        } else {
          contentElement.style.backgroundColor = '';
          contentElement.style.color = '';
          
          const elements = contentElement.querySelectorAll('[data-original-bg]');
          elements.forEach(el => {
            el.style.backgroundColor = el.getAttribute('data-original-bg');
            el.removeAttribute('data-original-bg');
          });
        }
      }
    },
    
    applyHighContrast(enable) {
      // Apply to content area only, not widget
      const contentSelector = '#demo-website';
      const contentElement = document.querySelector(contentSelector);
      
      if (contentElement) {
        contentElement.style.filter = enable ? 'contrast(200%)' : '';
      }
    },
    
    applyHighSaturation(enable) {
      // Apply to content area only, not widget
      const contentSelector = '#demo-website';
      const contentElement = document.querySelector(contentSelector);
      
      if (contentElement) {
        contentElement.style.filter = enable ? 'saturate(200%)' : '';
      }
    },
    
    applyLowSaturation(enable) {
      // Apply to content area only, not widget
      const contentSelector = '#demo-website';
      const contentElement = document.querySelector(contentSelector);
      
      if (contentElement) {
        contentElement.style.filter = enable ? 'saturate(50%)' : '';
      }
    },
    
    applyMonochrome(enable) {
      // Apply to content area only, not widget
      const contentSelector = '#demo-website';
      const contentElement = document.querySelector(contentSelector);
      
      if (contentElement) {
        contentElement.style.filter = enable ? 'grayscale(100%)' : '';
      }
    },
    
    // Orientation adjustment effects
    applyMuteSounds(mute) {
      const audioElements = document.querySelectorAll('audio, video');
      audioElements.forEach(audio => {
        audio.muted = mute;
      });
    },
    
    applyHideImages(hide) {
      // Apply to content area only, not widget
      const contentSelector = '#demo-website';
      const contentElement = document.querySelector(contentSelector);
      
      if (contentElement) {
        const images = contentElement.querySelectorAll('img');
        images.forEach(img => {
          img.style.visibility = hide ? 'hidden' : 'visible';
        });
      }
    },
    
    // Ensure reading mask elements are created
    ensureReadingMaskElements() {
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
    },
    
    // Move reading mask with mouse
    moveReadingMask(e) {
      const { top, bottom } = AccessibilityEffects.ensureReadingMaskElements();
      const maskHeight = 100; // Height of the unmasked area
      
      top.style.height = `${e.clientY - maskHeight/2}px`;
      bottom.style.height = `${window.innerHeight - e.clientY - maskHeight/2}px`;
      bottom.style.top = `${e.clientY + maskHeight/2}px`;
    },
    
    applyReadingMask(enable) {
      const { top, bottom } = this.ensureReadingMaskElements();
      
      if (enable) {
        document.addEventListener('mousemove', this.moveReadingMask);
        top.style.display = 'block';
        bottom.style.display = 'block';
      } else {
        document.removeEventListener('mousemove', this.moveReadingMask);
        top.style.display = 'none';
        bottom.style.display = 'none';
      }
    },
    
    // Ensure reading guide element is created
    ensureReadingGuideElement() {
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
    },
    
    // Move reading guide with mouse
    moveReadingGuide(e) {
      const guide = AccessibilityEffects.ensureReadingGuideElement();
      guide.style.top = `${e.clientY - guide.offsetHeight/2}px`;
    },
    
    applyReadingGuide(enable) {
      const guide = this.ensureReadingGuideElement();
      
      if (enable) {
        document.addEventListener('mousemove', this.moveReadingGuide);
        guide.style.display = 'block';
      } else {
        document.removeEventListener('mousemove', this.moveReadingGuide);
        guide.style.display = 'none';
      }
    },
    
    applyStopAnimations(stop) {
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
    },
    
    applyHighlightFocus(highlight) {
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
    },
    
    applyCursor(cursor) {
      // Define the cursor selector to only affect content area, not the widget itself
      const contentSelector = '#demo-website, body > *:not(#accessibility-widget, #accessibility-toggle-btn)';
      const contentElements = document.querySelectorAll(contentSelector);
      
      switch (cursor) {
        case 'default':
          // Remove any custom cursor
          contentElements.forEach(el => {
            el.style.cursor = '';
          });
          break;
        case 'bigBlack':
          // Use a proper cursor with high contrast (black arrow with white outline)
          contentElements.forEach(el => {
            el.style.cursor = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'%3E%3Cfilter id=\'shadow\'%3E%3CfeDropShadow dx=\'0\' dy=\'0\' stdDeviation=\'1\' flood-color=\'white\' flood-opacity=\'1\'/%3E%3C/filter%3E%3Cpath d=\'M6 2L25 21.5L16.5 21.5L20.5 30L15.5 32L11.5 23L6 28.5L6 2Z\' fill=\'black\' stroke=\'white\' stroke-width=\'1.5\' filter=\'url(%23shadow)\'/%3E%3C/svg%3E") 6 2, auto';
          });
          break;
        case 'bigWhite':
          // Use a proper cursor with high contrast (white arrow with black outline)
          contentElements.forEach(el => {
            el.style.cursor = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'%3E%3Cfilter id=\'shadow\'%3E%3CfeDropShadow dx=\'0\' dy=\'0\' stdDeviation=\'1\' flood-color=\'black\' flood-opacity=\'1\'/%3E%3C/filter%3E%3Cpath d=\'M6 2L25 21.5L16.5 21.5L20.5 30L15.5 32L11.5 23L6 28.5L6 2Z\' fill=\'white\' stroke=\'black\' stroke-width=\'1.5\' filter=\'url(%23shadow)\'/%3E%3C/svg%3E") 6 2, auto';
          });
          break;
      }
    },
    
    applyHoverHighlight(highlight) {
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
    }
  };
  
  // Widget UI
  const AccessibilityWidget = {
    // Create the widget HTML
    create() {
      this.injectStyles();
      this.createToggleButton();
      this.createWidgetPanel();
      this.setupKeyboardShortcut();
    },
    
    // Inject required CSS
    injectStyles() {
      const css = `
        .acc-widget-open {
          animation: accSlideIn 0.3s forwards;
        }
        
        .acc-widget-close {
          animation: accSlideOut 0.3s forwards;
        }
        
        @keyframes accSlideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        @keyframes accSlideOut {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
        
        .acc-tab-active {
          background-color: #F8FAFC;
          color: #4A6CF7;
          border-bottom: 2px solid #4A6CF7;
        }
        
        .acc-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 3px;
          background: #E2E8F0;
          outline: none;
          width: 100%;
        }
        
        .acc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #4A6CF7;
          cursor: pointer;
        }
        
        .acc-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #4A6CF7;
          cursor: pointer;
        }
        
        .acc-checkbox:checked + .acc-toggle {
          background-color: #4A6CF7;
        }
        
        .acc-checkbox:checked + .acc-toggle .acc-toggle-dot {
          transform: translateX(100%);
        }
      `;
      
      const style = document.createElement('style');
      style.textContent = css;
      document.head.appendChild(style);
    },
    
    // Create the toggle button
    createToggleButton() {
      const button = document.createElement('button');
      button.setAttribute('id', 'acc-widget-toggle');
      button.setAttribute('aria-label', 'Open accessibility menu');
      button.setAttribute('title', 'Accessibility Options');
      button.className = 'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center focus:outline-none';
      button.style.backgroundColor = '#4A6CF7';
      button.style.color = 'white';
      button.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
      button.style.border = 'none';
      button.style.cursor = 'pointer';
      button.style.zIndex = '9999';
      button.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414-6.414a2 2 0 0 1 2.828 0L21 12M3 12h18" />
        </svg>
      `;
      
      button.addEventListener('click', () => {
        AccessibilityStore.update('isOpen', true);
        this.openWidget();
        
        // Add micro-animation
        button.classList.add('accessibility-pulse');
        setTimeout(() => {
          button.classList.remove('accessibility-pulse');
        }, 1000);
      });
      
      // Add hover animation
      button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.1)';
        button.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.2)';
      });
      
      button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
      });
      
      document.body.appendChild(button);
    },
    
    // Create the widget panel
    createWidgetPanel() {
      const widget = document.createElement('div');
      widget.setAttribute('id', 'acc-widget');
      widget.setAttribute('role', 'dialog');
      widget.setAttribute('aria-labelledby', 'acc-widget-title');
      widget.setAttribute('aria-modal', 'true');
      
      widget.style.position = 'fixed';
      widget.style.top = '0';
      widget.style.right = '0';
      widget.style.height = '100%';
      widget.style.width = '320px';
      widget.style.backgroundColor = 'white';
      widget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
      widget.style.zIndex = '9998';
      widget.style.overflowY = 'auto';
      widget.style.transform = 'translateX(100%)';
      widget.style.transition = 'transform 0.3s ease-in-out';
      
      // Header
      const header = document.createElement('div');
      header.style.padding = '16px';
      header.style.backgroundColor = '#4A6CF7';
      header.style.color = 'white';
      header.style.display = 'flex';
      header.style.alignItems = 'center';
      header.style.justifyContent = 'space-between';
      
      header.innerHTML = `
        <h2 id="acc-widget-title" class="text-xl font-semibold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414-6.414a2 2 0 0 1 2.828 0L21 12M3 12h18" />
          </svg>
          Accessibility Options
        </h2>
        <button id="acc-widget-close" aria-label="Close accessibility menu">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      `;
      
      // Tab Navigation
      const tabNav = document.createElement('div');
      tabNav.style.display = 'flex';
      tabNav.style.borderBottom = '1px solid #E2E8F0';
      
      tabNav.innerHTML = `
        <button id="tab-content" class="py-3 px-4 w-1/3 text-sm font-medium text-center acc-tab-active">
          Content
        </button>
        <button id="tab-color" class="py-3 px-4 w-1/3 text-sm font-medium text-center text-gray-500">
          Color
        </button>
        <button id="tab-orientation" class="py-3 px-4 w-1/3 text-sm font-medium text-center text-gray-500">
          Orientation
        </button>
      `;
      
      tabNav.querySelectorAll('button').forEach(button => {
        button.style.flex = '1';
        button.style.border = 'none';
        button.style.background = 'none';
        button.style.cursor = 'pointer';
        button.style.fontWeight = '500';
      });
      
      // Reset Button
      const resetSection = document.createElement('div');
      resetSection.style.padding = '16px';
      resetSection.style.backgroundColor = '#F8FAFC';
      resetSection.style.borderBottom = '1px solid #E2E8F0';
      
      resetSection.innerHTML = `
        <button id="acc-reset-btn" class="w-full py-2 flex items-center justify-center bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset All Settings (Alt + L)
        </button>
      `;
      
      // Tab Panels
      const contentTab = this.createContentTabPanel();
      const colorTab = this.createColorTabPanel();
      const orientationTab = this.createOrientationTabPanel();
      
      // Initially hide color and orientation tabs
      colorTab.style.display = 'none';
      orientationTab.style.display = 'none';
      
      // Append all elements
      widget.appendChild(header);
      widget.appendChild(tabNav);
      widget.appendChild(resetSection);
      widget.appendChild(contentTab);
      widget.appendChild(colorTab);
      widget.appendChild(orientationTab);
      
      document.body.appendChild(widget);
      
      // Add event listeners
      document.getElementById('acc-widget-close').addEventListener('click', () => {
        AccessibilityStore.update('isOpen', false);
        this.closeWidget();
      });
      
      document.getElementById('acc-reset-btn').addEventListener('click', () => {
        AccessibilityStore.resetAll();
        this.updateUI();
      });
      
      // Tab navigation
      document.getElementById('tab-content').addEventListener('click', () => {
        this.switchTab('content');
      });
      
      document.getElementById('tab-color').addEventListener('click', () => {
        this.switchTab('color');
      });
      
      document.getElementById('tab-orientation').addEventListener('click', () => {
        this.switchTab('orientation');
      });
    },
    
    // Create Content Adjustments Tab Panel
    createContentTabPanel() {
      const panel = document.createElement('div');
      panel.id = 'content-tab-panel';
      panel.style.padding = '16px';
      
      panel.innerHTML = `
        <div class="space-y-4">
          <h3 style="font-size: 18px; font-weight: 500; color: #111827; margin-bottom: 16px;">Content Adjustments</h3>
          
          <!-- Font Size -->
          <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <label for="font-size" style="font-size: 14px; font-weight: 500; color: #374151;">Font Size</label>
              <span id="font-size-value" style="font-size: 14px; color: #6B7280;">100%</span>
            </div>
            <input type="range" min="100" max="200" value="${AccessibilityStore.settings.fontSize}" class="acc-slider" id="font-size">
          </div>
          
          <!-- Line Height -->
          <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <label for="line-height" style="font-size: 14px; font-weight: 500; color: #374151;">Line Height</label>
              <span id="line-height-value" style="font-size: 14px; color: #6B7280;">Normal</span>
            </div>
            <input type="range" min="1" max="3" value="${AccessibilityStore.settings.lineHeight}" step="0.1" class="acc-slider" id="line-height">
          </div>
          
          <!-- Letter Spacing -->
          <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <label for="letter-spacing" style="font-size: 14px; font-weight: 500; color: #374151;">Letter Spacing</label>
              <span id="letter-spacing-value" style="font-size: 14px; color: #6B7280;">Normal</span>
            </div>
            <input type="range" min="0" max="10" value="${AccessibilityStore.settings.letterSpacing}" class="acc-slider" id="letter-spacing">
          </div>
          
          <!-- Text Alignment Options -->
          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 8px;">Text Alignment</label>
            <div style="display: flex; gap: 8px;">
              <button id="align-left" style="padding: 8px; border: 1px solid #D1D5DB; border-radius: 4px; background-color: ${AccessibilityStore.settings.textAlign === 'left' ? '#4A6CF7' : 'white'}; color: ${AccessibilityStore.settings.textAlign === 'left' ? 'white' : 'black'};">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h10M4 18h14" />
                </svg>
              </button>
              <button id="align-center" style="padding: 8px; border: 1px solid #D1D5DB; border-radius: 4px; background-color: ${AccessibilityStore.settings.textAlign === 'center' ? '#4A6CF7' : 'white'}; color: ${AccessibilityStore.settings.textAlign === 'center' ? 'white' : 'black'};">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M6 12h12M4 18h16" />
                </svg>
              </button>
              <button id="align-right" style="padding: 8px; border: 1px solid #D1D5DB; border-radius: 4px; background-color: ${AccessibilityStore.settings.textAlign === 'right' ? '#4A6CF7' : 'white'}; color: ${AccessibilityStore.settings.textAlign === 'right' ? 'white' : 'black'};">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M10 12h10M6 18h14" />
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Button style grid layout for Content Options -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
            <!-- Font Family (Helvetica) - button style -->
            <div class="flex flex-col">
              <button id="font-family-btn" style="width: 100%; height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: ${AccessibilityStore.settings.useHelvetica ? '#4A6CF7' : '#f1f5f9'}; color: ${AccessibilityStore.settings.useHelvetica ? 'white' : 'black'}; border-radius: 8px; border: none; cursor: pointer; padding: 12px; text-align: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 8px;">
                  <path d="M9 3v2m1-2v2m1-2v2M9 21v-2m1 2v-2m1 2v-2M9 3h4M9 21h4M3 9h2M3 10h2M3 11h2M19 9h2M19 10h2M19 11h2M3 9v4M21 9v4"/>
                </svg>
                <span style="font-size: 14px; font-weight: 500;">Helvetica Font</span>
              </button>
            </div>
            
            <!-- Highlight Titles - button style -->
            <div class="flex flex-col">
              <button id="highlight-titles-btn" style="width: 100%; height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: ${AccessibilityStore.settings.highlightHeadings ? '#4A6CF7' : '#f1f5f9'}; color: ${AccessibilityStore.settings.highlightHeadings ? 'white' : 'black'}; border-radius: 8px; border: none; cursor: pointer; padding: 12px; text-align: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 8px;">
                  <path d="M4 7V4h16v3M9 20h6M12 4v16"/>
                </svg>
                <span style="font-size: 14px; font-weight: 500;">Highlight Titles</span>
              </button>
            </div>
            
            <!-- Highlight Links - button style -->
            <div class="flex flex-col">
              <button id="highlight-links-btn" style="width: 100%; height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: ${AccessibilityStore.settings.highlightLinks ? '#4A6CF7' : '#f1f5f9'}; color: ${AccessibilityStore.settings.highlightLinks ? 'white' : 'black'}; border-radius: 8px; border: none; cursor: pointer; padding: 12px; text-align: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 8px;">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                <span style="font-size: 14px; font-weight: 500;">Highlight Links</span>
              </button>
            </div>
            
            <!-- Text Magnifier - button style -->
            <div class="flex flex-col">
              <button id="text-magnifier-btn" style="width: 100%; height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: ${AccessibilityStore.settings.textMagnifier ? '#4A6CF7' : '#f1f5f9'}; color: ${AccessibilityStore.settings.textMagnifier ? 'white' : 'black'}; border-radius: 8px; border: none; cursor: pointer; padding: 12px; text-align: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 8px;">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                  <path d="M11 8v6"></path>
                  <path d="M8 11h6"></path>
                </svg>
                <span style="font-size: 14px; font-weight: 500;">Text Magnifier</span>
              </button>
            </div>
            
            <!-- Content Scaling - button style -->
            <div class="flex flex-col">
              <button id="content-scaling-btn" style="width: 100%; height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: ${AccessibilityStore.settings.contentScaling ? '#4A6CF7' : '#f1f5f9'}; color: ${AccessibilityStore.settings.contentScaling ? 'white' : 'black'}; border-radius: 8px; border: none; cursor: pointer; padding: 12px; text-align: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 8px;">
                  <path d="M15 3h6v6M9 21H3v-6M3.5 3.5l5 5M20.5 20.5l-5-5M4 12h16"/>
                </svg>
                <span style="font-size: 14px; font-weight: 500;">Content Scaling</span>
              </button>
            </div>
          </div>
        </div>
      `;
      
      // Add event listeners after the panel is added to DOM
      setTimeout(() => {
        // Font Size
        const fontSizeSlider = document.getElementById('font-size');
        const fontSizeValue = document.getElementById('font-size-value');
        fontSizeSlider.addEventListener('input', function() {
          const value = this.value;
          fontSizeValue.textContent = `${value}%`;
          AccessibilityStore.update('fontSize', parseInt(value));
        });
        
        // Line Height
        const lineHeightSlider = document.getElementById('line-height');
        const lineHeightValue = document.getElementById('line-height-value');
        lineHeightSlider.addEventListener('input', function() {
          const value = this.value;
          lineHeightValue.textContent = value === '1' ? 'Normal' : value;
          AccessibilityStore.update('lineHeight', parseFloat(value));
        });
        
        // Letter Spacing
        const letterSpacingSlider = document.getElementById('letter-spacing');
        const letterSpacingValue = document.getElementById('letter-spacing-value');
        letterSpacingSlider.addEventListener('input', function() {
          const value = this.value;
          letterSpacingValue.textContent = value === '0' ? 'Normal' : `${value}px`;
          AccessibilityStore.update('letterSpacing', parseInt(value));
        });
        
        // Font Family - button style
        document.getElementById('font-family-btn').addEventListener('click', function() {
          const newValue = !AccessibilityStore.settings.useHelvetica;
          AccessibilityStore.update('useHelvetica', newValue);
          this.style.backgroundColor = newValue ? '#4A6CF7' : '#f1f5f9';
          this.style.color = newValue ? 'white' : 'black';
        });
        
        // Text Alignment
        document.getElementById('align-left').addEventListener('click', function() {
          AccessibilityStore.update('textAlign', 'left');
        });
        
        document.getElementById('align-center').addEventListener('click', function() {
          AccessibilityStore.update('textAlign', 'center');
        });
        
        document.getElementById('align-right').addEventListener('click', function() {
          AccessibilityStore.update('textAlign', 'right');
        });
        
        // Highlight Titles (matching screenshot)
        document.getElementById('highlight-titles-btn').addEventListener('click', function() {
          const newValue = !AccessibilityStore.settings.highlightHeadings;
          AccessibilityStore.update('highlightHeadings', newValue);
          this.style.backgroundColor = newValue ? '#4A6CF7' : '#f1f5f9';
          this.style.color = newValue ? 'white' : 'black';
          
          // Add micro-animation
          this.classList.remove('accessibility-button-active', 'accessibility-button-inactive');
          void this.offsetWidth; // Trigger reflow to restart animation
          this.classList.add(newValue ? 'accessibility-button-active' : 'accessibility-button-inactive');
          
          // If enabled, add highlight effect to headings
          if (newValue) {
            const headings = document.querySelectorAll('#demo-website h1, #demo-website h2, #demo-website h3, #demo-website h4, #demo-website h5, #demo-website h6');
            headings.forEach(heading => {
              heading.classList.add('accessibility-highlight');
              setTimeout(() => {
                heading.classList.remove('accessibility-highlight');
              }, 1000);
            });
          }
        });
        
        // Highlight Links - button style
        document.getElementById('highlight-links-btn').addEventListener('click', function() {
          const newValue = !AccessibilityStore.settings.highlightLinks;
          AccessibilityStore.update('highlightLinks', newValue);
          this.style.backgroundColor = newValue ? '#4A6CF7' : '#f1f5f9';
          this.style.color = newValue ? 'white' : 'black';
          
          // Add micro-animation
          this.classList.remove('accessibility-button-active', 'accessibility-button-inactive');
          void this.offsetWidth; // Trigger reflow to restart animation
          this.classList.add(newValue ? 'accessibility-button-active' : 'accessibility-button-inactive');
          
          // If enabled, add highlight effect to links
          if (newValue) {
            const links = document.querySelectorAll('#demo-website a');
            links.forEach(link => {
              link.classList.add('accessibility-highlight');
              setTimeout(() => {
                link.classList.remove('accessibility-highlight');
              }, 1000);
            });
          }
        });
        
        // Text Magnifier - button style
        document.getElementById('text-magnifier-btn').addEventListener('click', function() {
          const newValue = !AccessibilityStore.settings.textMagnifier;
          AccessibilityStore.update('textMagnifier', newValue);
          this.style.backgroundColor = newValue ? '#4A6CF7' : '#f1f5f9';
          this.style.color = newValue ? 'white' : 'black';
          
          // Add micro-animation
          this.classList.remove('accessibility-button-active', 'accessibility-button-inactive');
          void this.offsetWidth; // Trigger reflow to restart animation
          this.classList.add(newValue ? 'accessibility-button-active' : 'accessibility-button-inactive');
        });
        
        // Content Scaling - button style
        document.getElementById('content-scaling-btn').addEventListener('click', function() {
          const newValue = !AccessibilityStore.settings.contentScaling;
          AccessibilityStore.update('contentScaling', newValue);
          this.style.backgroundColor = newValue ? '#4A6CF7' : '#f1f5f9';
          this.style.color = newValue ? 'white' : 'black';
          
          // Add micro-animation
          this.classList.remove('accessibility-button-active', 'accessibility-button-inactive');
          void this.offsetWidth; // Trigger reflow to restart animation
          this.classList.add(newValue ? 'accessibility-button-active' : 'accessibility-button-inactive');
        });
      }, 0);
      
      return panel;
    },
    
    // Create Color Adjustments Tab Panel
    createColorTabPanel() {
      const panel = document.createElement('div');
      panel.id = 'color-tab-panel';
      panel.style.padding = '16px';
      
      panel.innerHTML = `
        <div class="space-y-4">
          <h3 style="font-size: 18px; font-weight: 500; color: #111827; margin-bottom: 16px;">Color Adjustments</h3>
          
          <!-- Button Style Grid Layout for Color Options -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
            <!-- Dark Contrast -->
            <div class="flex flex-col">
              <button id="dark-contrast-btn" style="width: 100%; height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: ${AccessibilityStore.settings.darkContrast ? '#4A6CF7' : '#f1f5f9'}; color: ${AccessibilityStore.settings.darkContrast ? 'white' : 'black'}; border-radius: 8px; border: none; cursor: pointer; padding: 12px; text-align: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 8px;">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2v20M22 12H2"></path>
                </svg>
                <span style="font-size: 14px; font-weight: 500;">Dark Contrast</span>
              </button>
            </div>
            
            <!-- Light Contrast -->
            <div class="flex flex-col">
              <button id="light-contrast-btn" style="width: 100%; height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: ${AccessibilityStore.settings.lightContrast ? '#4A6CF7' : '#f1f5f9'}; color: ${AccessibilityStore.settings.lightContrast ? 'white' : 'black'}; border-radius: 8px; border: none; cursor: pointer; padding: 12px; text-align: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 8px;">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 8v8M8 12h8"></path>
                </svg>
                <span style="font-size: 14px; font-weight: 500;">Light Contrast</span>
              </button>
            </div>
            
            <!-- High Contrast -->
            <div class="flex flex-col">
              <button id="high-contrast-btn" style="width: 100%; height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: ${AccessibilityStore.settings.highContrast ? '#4A6CF7' : '#f1f5f9'}; color: ${AccessibilityStore.settings.highContrast ? 'white' : 'black'}; border-radius: 8px; border: none; cursor: pointer; padding: 12px; text-align: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 8px;">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 12v.01"></path>
                </svg>
                <span style="font-size: 14px; font-weight: 500;">High Contrast</span>
              </button>
            </div>
            
            <!-- High Saturation -->
            <div class="flex flex-col">
              <button id="high-saturation-btn" style="width: 100%; height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: ${AccessibilityStore.settings.highSaturation ? '#4A6CF7' : '#f1f5f9'}; color: ${AccessibilityStore.settings.highSaturation ? 'white' : 'black'}; border-radius: 8px; border: none; cursor: pointer; padding: 12px; text-align: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 8px;">
                  <path d="M12 2v8M4.93 10.93l1.41 1.41M2 18h8M19.07 10.93l-1.41 1.41M22 18h-8"></path>
                </svg>
                <span style="font-size: 14px; font-weight: 500;">High Saturation</span>
              </button>
            </div>
            
            <!-- Low Saturation -->
            <div class="flex flex-col">
              <button id="low-saturation-btn" style="width: 100%; height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: ${AccessibilityStore.settings.lowSaturation ? '#4A6CF7' : '#f1f5f9'}; color: ${AccessibilityStore.settings.lowSaturation ? 'white' : 'black'}; border-radius: 8px; border: none; cursor: pointer; padding: 12px; text-align: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 8px;">
                  <path d="M12 22v-8M4.93 13.07l1.41-1.41M2 6h8M19.07 13.07l-1.41-1.41M22 6h-8"></path>
                </svg>
                <span style="font-size: 14px; font-weight: 500;">Low Saturation</span>
              </button>
            </div>
            
            <!-- Monochrome -->
            <div class="flex flex-col">
              <button id="monochrome-btn" style="width: 100%; height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: ${AccessibilityStore.settings.monochrome ? '#4A6CF7' : '#f1f5f9'}; color: ${AccessibilityStore.settings.monochrome ? 'white' : 'black'}; border-radius: 8px; border: none; cursor: pointer; padding: 12px; text-align: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 8px;">
                  <path d="M3 3v18h18"></path>
                  <path d="M18 17V9"></path>
                  <path d="M13 12v5"></path>
                  <path d="M8 17v-2"></path>
                </svg>
                <span style="font-size: 14px; font-weight: 500;">Monochrome</span>
              </button>
            </div>
          </div>
          
          <!-- Color Examples -->
          <div style="margin-top: 24px; padding: 12px; background-color: #F8FAFC; border-radius: 4px; border: 1px solid #E2E8F0;">
            <p style="font-size: 14px; color: #4B5563; margin-bottom: 8px;">Color Mode Preview:</p>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              <div class="color-example" style="width: 32px; height: 32px; background-color: #4A6CF7; border-radius: 4px;"></div>
              <div class="color-example" style="width: 32px; height: 32px; background-color: #00B074; border-radius: 4px;"></div>
              <div class="color-example" style="width: 32px; height: 32px; background-color: #10B981; border-radius: 4px;"></div>
              <div class="color-example" style="width: 32px; height: 32px; background-color: #F59E0B; border-radius: 4px;"></div>
              <div class="color-example" style="width: 32px; height: 32px; background-color: #F43F5E; border-radius: 4px;"></div>
              <div class="color-example" style="width: 32px; height: 32px; background-color: #1E293B; border-radius: 4px;"></div>
            </div>
          </div>
        </div>
      `;
      
      // Add event listeners after the panel is added to DOM
      setTimeout(() => {
        // Dark Contrast - button style
        document.getElementById('dark-contrast-btn').addEventListener('click', function() {
          const newValue = !AccessibilityStore.settings.darkContrast;
          AccessibilityStore.update('darkContrast', newValue);
          this.style.backgroundColor = newValue ? '#4A6CF7' : '#f1f5f9';
          this.style.color = newValue ? 'white' : 'black';
          
          // Add micro-animation
          this.classList.remove('accessibility-button-active', 'accessibility-button-inactive');
          void this.offsetWidth; // Trigger reflow to restart animation
          this.classList.add(newValue ? 'accessibility-button-active' : 'accessibility-button-inactive');
          
          // Update color preview with animation
          if (newValue) {
            const colorSquares = document.querySelectorAll('#color-tab-panel .color-example');
            colorSquares.forEach(square => {
              square.classList.add('accessibility-highlight');
              setTimeout(() => {
                square.classList.remove('accessibility-highlight');
              }, 1000);
            });
          }
        });
        
        // Light Contrast - button style
        document.getElementById('light-contrast-btn').addEventListener('click', function() {
          const newValue = !AccessibilityStore.settings.lightContrast;
          AccessibilityStore.update('lightContrast', newValue);
          this.style.backgroundColor = newValue ? '#4A6CF7' : '#f1f5f9';
          this.style.color = newValue ? 'white' : 'black';
          
          // Add micro-animation
          this.classList.remove('accessibility-button-active', 'accessibility-button-inactive');
          void this.offsetWidth; // Trigger reflow to restart animation
          this.classList.add(newValue ? 'accessibility-button-active' : 'accessibility-button-inactive');
          
          // Update color preview with animation
          if (newValue) {
            const colorSquares = document.querySelectorAll('#color-tab-panel .color-example');
            colorSquares.forEach(square => {
              square.classList.add('accessibility-highlight');
              setTimeout(() => {
                square.classList.remove('accessibility-highlight');
              }, 1000);
            });
          }
        });
        
        // High Contrast - button style
        document.getElementById('high-contrast-btn').addEventListener('click', function() {
          const newValue = !AccessibilityStore.settings.highContrast;
          AccessibilityStore.update('highContrast', newValue);
          this.style.backgroundColor = newValue ? '#4A6CF7' : '#f1f5f9';
          this.style.color = newValue ? 'white' : 'black';
          
          // Add micro-animation
          this.classList.remove('accessibility-button-active', 'accessibility-button-inactive');
          void this.offsetWidth; // Trigger reflow to restart animation
          this.classList.add(newValue ? 'accessibility-button-active' : 'accessibility-button-inactive');
          
          // Update color preview with animation
          if (newValue) {
            const colorSquares = document.querySelectorAll('#color-tab-panel .color-example');
            colorSquares.forEach(square => {
              square.classList.add('accessibility-highlight');
              setTimeout(() => {
                square.classList.remove('accessibility-highlight');
              }, 1000);
            });
          }
        });
        
        // High Saturation - button style
        document.getElementById('high-saturation-btn').addEventListener('click', function() {
          const newValue = !AccessibilityStore.settings.highSaturation;
          AccessibilityStore.update('highSaturation', newValue);
          this.style.backgroundColor = newValue ? '#4A6CF7' : '#f1f5f9';
          this.style.color = newValue ? 'white' : 'black';
          
          // Add micro-animation
          this.classList.remove('accessibility-button-active', 'accessibility-button-inactive');
          void this.offsetWidth; // Trigger reflow to restart animation
          this.classList.add(newValue ? 'accessibility-button-active' : 'accessibility-button-inactive');
          
          // Update color preview with animation
          if (newValue) {
            const colorSquares = document.querySelectorAll('#color-tab-panel .color-example');
            colorSquares.forEach(square => {
              square.classList.add('accessibility-highlight');
              setTimeout(() => {
                square.classList.remove('accessibility-highlight');
              }, 1000);
            });
          }
        });
        
        // Low Saturation - button style
        document.getElementById('low-saturation-btn').addEventListener('click', function() {
          const newValue = !AccessibilityStore.settings.lowSaturation;
          AccessibilityStore.update('lowSaturation', newValue);
          this.style.backgroundColor = newValue ? '#4A6CF7' : '#f1f5f9';
          this.style.color = newValue ? 'white' : 'black';
          
          // Add micro-animation
          this.classList.remove('accessibility-button-active', 'accessibility-button-inactive');
          void this.offsetWidth; // Trigger reflow to restart animation
          this.classList.add(newValue ? 'accessibility-button-active' : 'accessibility-button-inactive');
          
          // Update color preview with animation
          if (newValue) {
            const colorSquares = document.querySelectorAll('#color-tab-panel .color-example');
            colorSquares.forEach(square => {
              square.classList.add('accessibility-highlight');
              setTimeout(() => {
                square.classList.remove('accessibility-highlight');
              }, 1000);
            });
          }
        });
        
        // Monochrome - button style
        document.getElementById('monochrome-btn').addEventListener('click', function() {
          const newValue = !AccessibilityStore.settings.monochrome;
          AccessibilityStore.update('monochrome', newValue);
          this.style.backgroundColor = newValue ? '#4A6CF7' : '#f1f5f9';
          this.style.color = newValue ? 'white' : 'black';
          
          // Add micro-animation
          this.classList.remove('accessibility-button-active', 'accessibility-button-inactive');
          void this.offsetWidth; // Trigger reflow to restart animation
          this.classList.add(newValue ? 'accessibility-button-active' : 'accessibility-button-inactive');
          
          // Update color preview with animation
          if (newValue) {
            const colorSquares = document.querySelectorAll('#color-tab-panel .color-example');
            colorSquares.forEach(square => {
              square.classList.add('accessibility-highlight');
              setTimeout(() => {
                square.classList.remove('accessibility-highlight');
              }, 1000);
            });
          }
        });
      }, 0);
      
      return panel;
    },
    
    // Create Orientation Adjustments Tab Panel
    createOrientationTabPanel() {
      const panel = document.createElement('div');
      panel.id = 'orientation-tab-panel';
      panel.style.padding = '16px';
      
      panel.innerHTML = `
        <div class="space-y-4">
          <h3 style="font-size: 18px; font-weight: 500; color: #111827; margin-bottom: 16px;">Orientation Adjustments</h3>
          
          <!-- Button Style Grid Layout for Orientation Options -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
            <!-- Mute All Sounds -->
            <div class="flex flex-col">
              <button id="mute-sounds-btn" style="width: 100%; height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: ${AccessibilityStore.settings.muteSounds ? '#4A6CF7' : '#f1f5f9'}; color: ${AccessibilityStore.settings.muteSounds ? 'white' : 'black'}; border-radius: 8px; border: none; cursor: pointer; padding: 12px; text-align: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 8px;">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <line x1="23" y1="9" x2="17" y2="15"></line>
                  <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>
                <span style="font-size: 14px; font-weight: 500;">Mute Sounds</span>
              </button>
            </div>
            
            <!-- Hide All Images -->
            <div class="flex flex-col">
              <button id="hide-images-btn" style="width: 100%; height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: ${AccessibilityStore.settings.hideImages ? '#4A6CF7' : '#f1f5f9'}; color: ${AccessibilityStore.settings.hideImages ? 'white' : 'black'}; border-radius: 8px; border: none; cursor: pointer; padding: 12px; text-align: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 8px;">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                  <line x1="3" y1="3" x2="21" y2="21"></line>
                </svg>
                <span style="font-size: 14px; font-weight: 500;">Hide Images</span>
              </button>
            </div>
            
            <!-- Reading Mask -->
            <div class="flex flex-col">
              <button id="reading-mask-btn" style="width: 100%; height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: ${AccessibilityStore.settings.readingMask ? '#4A6CF7' : '#f1f5f9'}; color: ${AccessibilityStore.settings.readingMask ? 'white' : 'black'}; border-radius: 8px; border: none; cursor: pointer; padding: 12px; text-align: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 8px;">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <rect x="7" y="7" width="10" height="10" rx="1" ry="1"></rect>
                </svg>
                <span style="font-size: 14px; font-weight: 500;">Reading Mask</span>
              </button>
            </div>
            
            <!-- Reading Guide -->
            <div class="flex flex-col">
              <button id="reading-guide-btn" style="width: 100%; height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: ${AccessibilityStore.settings.readingGuide ? '#4A6CF7' : '#f1f5f9'}; color: ${AccessibilityStore.settings.readingGuide ? 'white' : 'black'}; border-radius: 8px; border: none; cursor: pointer; padding: 12px; text-align: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 8px;">
                  <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"></path>
                  <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"></path>
                </svg>
                <span style="font-size: 14px; font-weight: 500;">Reading Guide</span>
              </button>
            </div>
            
            <!-- Stop Animations -->
            <div class="flex flex-col">
              <button id="stop-animations-btn" style="width: 100%; height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: ${AccessibilityStore.settings.stopAnimations ? '#4A6CF7' : '#f1f5f9'}; color: ${AccessibilityStore.settings.stopAnimations ? 'white' : 'black'}; border-radius: 8px; border: none; cursor: pointer; padding: 12px; text-align: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 8px;">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <rect x="9" y="9" width="6" height="6"></rect>
                </svg>
                <span style="font-size: 14px; font-weight: 500;">Stop Animations</span>
              </button>
            </div>
            
            <!-- Highlight Focus -->
            <div class="flex flex-col">
              <button id="highlight-focus-btn" style="width: 100%; height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: ${AccessibilityStore.settings.highlightFocus ? '#4A6CF7' : '#f1f5f9'}; color: ${AccessibilityStore.settings.highlightFocus ? 'white' : 'black'}; border-radius: 8px; border: none; cursor: pointer; padding: 12px; text-align: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 8px;">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
                <span style="font-size: 14px; font-weight: 500;">Highlight Focus</span>
              </button>
            </div>
          </div>
          
          <!-- Cursor Options -->
          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 8px;">Cursor Options</label>
            <div style="display: flex; gap: 8px;">
              <button id="default-cursor" style="padding: 8px; border: 1px solid #D1D5DB; border-radius: 4px; background-color: ${AccessibilityStore.settings.cursor === 'default' ? '#4A6CF7' : 'white'}; color: ${AccessibilityStore.settings.cursor === 'default' ? 'white' : 'black'};">
                Default
              </button>
              <button id="big-black-cursor" style="padding: 8px; border: 1px solid #D1D5DB; border-radius: 4px; background-color: ${AccessibilityStore.settings.cursor === 'bigBlack' ? '#4A6CF7' : 'white'}; color: ${AccessibilityStore.settings.cursor === 'bigBlack' ? 'white' : 'black'};">
                Large Dark
              </button>
              <button id="big-white-cursor" style="padding: 8px; border: 1px solid #D1D5DB; border-radius: 4px; background-color: ${AccessibilityStore.settings.cursor === 'bigWhite' ? '#4A6CF7' : 'white'}; color: ${AccessibilityStore.settings.cursor === 'bigWhite' ? 'white' : 'black'};">
                Large Light
              </button>
            </div>
          </div>
          
          <!-- Hover Highlight -->
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <label for="hover-highlight-toggle" style="font-size: 14px; font-weight: 500; color: #374151;">Hover Highlight</label>
            <div class="relative inline-block w-10 align-middle select-none">
              <input type="checkbox" id="hover-highlight-toggle" class="acc-checkbox sr-only" ${AccessibilityStore.settings.hoverHighlight ? 'checked' : ''}>
              <label for="hover-highlight-toggle" class="acc-toggle block h-6 w-10 rounded-full bg-gray-300 cursor-pointer"></label>
              <span class="acc-toggle-dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out"></span>
            </div>
          </div>
        </div>
      `;
      
      // Add event listeners after the panel is added to DOM
      setTimeout(() => {
        // Mute Sounds - button style
        document.getElementById('mute-sounds-btn').addEventListener('click', function() {
          const newValue = !AccessibilityStore.settings.muteSounds;
          AccessibilityStore.update('muteSounds', newValue);
          this.style.backgroundColor = newValue ? '#4A6CF7' : '#f1f5f9';
          this.style.color = newValue ? 'white' : 'black';
          
          // Add micro-animation
          this.classList.remove('accessibility-button-active', 'accessibility-button-inactive');
          void this.offsetWidth; // Trigger reflow to restart animation
          this.classList.add(newValue ? 'accessibility-button-active' : 'accessibility-button-inactive');
          
          // Add visual feedback for sound muting
          if (newValue) {
            const audioIcon = this.querySelector('svg');
            audioIcon.classList.add('accessibility-pulse');
            setTimeout(() => {
              audioIcon.classList.remove('accessibility-pulse');
            }, 1000);
          }
        });
        
        // Hide Images - button style
        document.getElementById('hide-images-btn').addEventListener('click', function() {
          const newValue = !AccessibilityStore.settings.hideImages;
          AccessibilityStore.update('hideImages', newValue);
          this.style.backgroundColor = newValue ? '#4A6CF7' : '#f1f5f9';
          this.style.color = newValue ? 'white' : 'black';
          
          // Add micro-animation
          this.classList.remove('accessibility-button-active', 'accessibility-button-inactive');
          void this.offsetWidth; // Trigger reflow to restart animation
          this.classList.add(newValue ? 'accessibility-button-active' : 'accessibility-button-inactive');
          
          // Add visual feedback for hiding images
          if (newValue) {
            const images = document.querySelectorAll('#demo-website img');
            images.forEach(img => {
              img.classList.add('accessibility-highlight');
              setTimeout(() => {
                img.classList.remove('accessibility-highlight');
              }, 1000);
            });
          }
        });
        
        // Reading Mask - button style
        document.getElementById('reading-mask-btn').addEventListener('click', function() {
          const newValue = !AccessibilityStore.settings.readingMask;
          AccessibilityStore.update('readingMask', newValue);
          this.style.backgroundColor = newValue ? '#4A6CF7' : '#f1f5f9';
          this.style.color = newValue ? 'white' : 'black';
          
          // Add micro-animation
          this.classList.remove('accessibility-button-active', 'accessibility-button-inactive');
          void this.offsetWidth; // Trigger reflow to restart animation
          this.classList.add(newValue ? 'accessibility-button-active' : 'accessibility-button-inactive');
        });
        
        // Reading Guide - button style
        document.getElementById('reading-guide-btn').addEventListener('click', function() {
          const newValue = !AccessibilityStore.settings.readingGuide;
          AccessibilityStore.update('readingGuide', newValue);
          this.style.backgroundColor = newValue ? '#4A6CF7' : '#f1f5f9';
          this.style.color = newValue ? 'white' : 'black';
          
          // Add micro-animation
          this.classList.remove('accessibility-button-active', 'accessibility-button-inactive');
          void this.offsetWidth; // Trigger reflow to restart animation
          this.classList.add(newValue ? 'accessibility-button-active' : 'accessibility-button-inactive');
        });
        
        // Stop Animations - button style
        document.getElementById('stop-animations-btn').addEventListener('click', function() {
          const newValue = !AccessibilityStore.settings.stopAnimations;
          AccessibilityStore.update('stopAnimations', newValue);
          this.style.backgroundColor = newValue ? '#4A6CF7' : '#f1f5f9';
          this.style.color = newValue ? 'white' : 'black';
          
          // Add micro-animation
          this.classList.remove('accessibility-button-active', 'accessibility-button-inactive');
          void this.offsetWidth; // Trigger reflow to restart animation
          this.classList.add(newValue ? 'accessibility-button-active' : 'accessibility-button-inactive');
        });
        
        // Highlight Focus - button style
        document.getElementById('highlight-focus-btn').addEventListener('click', function() {
          const newValue = !AccessibilityStore.settings.highlightFocus;
          AccessibilityStore.update('highlightFocus', newValue);
          this.style.backgroundColor = newValue ? '#4A6CF7' : '#f1f5f9';
          this.style.color = newValue ? 'white' : 'black';
          
          // Add micro-animation
          this.classList.remove('accessibility-button-active', 'accessibility-button-inactive');
          void this.offsetWidth; // Trigger reflow to restart animation
          this.classList.add(newValue ? 'accessibility-button-active' : 'accessibility-button-inactive');
          
          // If enabled, briefly highlight focusable elements
          if (newValue) {
            const focusables = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
            focusables.forEach((el, index) => {
              // Stagger the animations for a wave effect
              setTimeout(() => {
                el.classList.add('accessibility-highlight');
                setTimeout(() => {
                  el.classList.remove('accessibility-highlight');
                }, 500);
              }, index * 50);
            });
          }
        });
        
        // Cursor Options
        document.getElementById('default-cursor').addEventListener('click', function() {
          AccessibilityStore.update('cursor', 'default');
          this.style.backgroundColor = '#4A6CF7';
          this.style.color = 'white';
          document.getElementById('big-black-cursor').style.backgroundColor = 'white';
          document.getElementById('big-black-cursor').style.color = 'black';
          document.getElementById('big-white-cursor').style.backgroundColor = 'white';
          document.getElementById('big-white-cursor').style.color = 'black';
          
          // Add animation
          this.classList.remove('accessibility-button-active', 'accessibility-button-inactive');
          void this.offsetWidth; // Trigger reflow to restart animation
          this.classList.add('accessibility-button-active');
        });
        
        document.getElementById('big-black-cursor').addEventListener('click', function() {
          AccessibilityStore.update('cursor', 'bigBlack');
          this.style.backgroundColor = '#4A6CF7';
          this.style.color = 'white';
          document.getElementById('default-cursor').style.backgroundColor = 'white';
          document.getElementById('default-cursor').style.color = 'black';
          document.getElementById('big-white-cursor').style.backgroundColor = 'white';
          document.getElementById('big-white-cursor').style.color = 'black';
          
          // Add animation
          this.classList.remove('accessibility-button-active', 'accessibility-button-inactive');
          void this.offsetWidth; // Trigger reflow to restart animation
          this.classList.add('accessibility-button-active');
        });
        
        document.getElementById('big-white-cursor').addEventListener('click', function() {
          AccessibilityStore.update('cursor', 'bigWhite');
          this.style.backgroundColor = '#4A6CF7';
          this.style.color = 'white';
          document.getElementById('default-cursor').style.backgroundColor = 'white';
          document.getElementById('default-cursor').style.color = 'black';
          document.getElementById('big-black-cursor').style.backgroundColor = 'white';
          document.getElementById('big-black-cursor').style.color = 'black';
          
          // Add animation
          this.classList.remove('accessibility-button-active', 'accessibility-button-inactive');
          void this.offsetWidth; // Trigger reflow to restart animation
          this.classList.add('accessibility-button-active');
        });
        
        // Hover Highlight
        document.getElementById('hover-highlight-toggle').addEventListener('change', function() {
          AccessibilityStore.update('hoverHighlight', this.checked);
        });
      }, 0);
      
      return panel;
    },
    
    // Switch between tabs
    switchTab(tabName) {
      const contentTab = document.getElementById('content-tab-panel');
      const colorTab = document.getElementById('color-tab-panel');
      const orientationTab = document.getElementById('orientation-tab-panel');
      
      const contentTabBtn = document.getElementById('tab-content');
      const colorTabBtn = document.getElementById('tab-color');
      const orientationTabBtn = document.getElementById('tab-orientation');
      
      // Reset all tabs
      contentTabBtn.classList.remove('acc-tab-active');
      colorTabBtn.classList.remove('acc-tab-active');
      orientationTabBtn.classList.remove('acc-tab-active');
      
      contentTabBtn.style.color = '#6B7280';
      colorTabBtn.style.color = '#6B7280';
      orientationTabBtn.style.color = '#6B7280';
      
      // Hide all panels
      contentTab.style.display = 'none';
      colorTab.style.display = 'none';
      orientationTab.style.display = 'none';
      
      // Show selected tab with animation
      let selectedTab, selectedBtn;
      
      if (tabName === 'content') {
        selectedTab = contentTab;
        selectedBtn = contentTabBtn;
      } else if (tabName === 'color') {
        selectedTab = colorTab;
        selectedBtn = colorTabBtn;
      } else if (tabName === 'orientation') {
        selectedTab = orientationTab;
        selectedBtn = orientationTabBtn;
      }
      
      // Apply animation to tab button
      selectedBtn.classList.add('acc-tab-active');
      selectedBtn.style.color = '#4A6CF7';
      selectedBtn.classList.add('accessibility-button-active');
      setTimeout(() => {
        selectedBtn.classList.remove('accessibility-button-active');
      }, 500);
      
      // Display tab content with subtle fade-in effect
      selectedTab.style.opacity = '0';
      selectedTab.style.display = 'block';
      setTimeout(() => {
        selectedTab.style.transition = 'opacity 0.3s ease';
        selectedTab.style.opacity = '1';
      }, 50);
      
      // Update active tab in store
      AccessibilityStore.update('activeTab', tabName);
    },
    
    // Open widget panel
    openWidget() {
      const widget = document.getElementById('acc-widget');
      widget.classList.add('acc-widget-open');
      widget.classList.remove('acc-widget-close');
      widget.style.transform = 'translateX(0)';
    },
    
    // Close widget panel
    closeWidget() {
      const widget = document.getElementById('acc-widget');
      widget.classList.remove('acc-widget-open');
      widget.classList.add('acc-widget-close');
      setTimeout(() => {
        widget.style.transform = 'translateX(100%)';
      }, 300);
    },
    
    // Update UI based on current settings
    updateUI() {
      const settings = AccessibilityStore.settings;
      
      // Update tabs
      this.switchTab(settings.activeTab);
      
      // Update content tab controls
      if (document.getElementById('font-size')) {
        document.getElementById('font-size').value = settings.fontSize;
        document.getElementById('font-size-value').textContent = `${settings.fontSize}%`;
      }
      
      if (document.getElementById('line-height')) {
        document.getElementById('line-height').value = settings.lineHeight;
        document.getElementById('line-height-value').textContent = settings.lineHeight === 1 ? 'Normal' : `${settings.lineHeight}`;
      }
      
      if (document.getElementById('letter-spacing')) {
        document.getElementById('letter-spacing').value = settings.letterSpacing;
        document.getElementById('letter-spacing-value').textContent = settings.letterSpacing === 0 ? 'Normal' : `${settings.letterSpacing}px`;
      }
      
      if (document.getElementById('font-family-btn')) {
        document.getElementById('font-family-btn').style.backgroundColor = settings.useHelvetica ? '#4A6CF7' : '#f1f5f9';
        document.getElementById('font-family-btn').style.color = settings.useHelvetica ? 'white' : 'black';
      }
      
      if (document.getElementById('align-left')) {
        document.getElementById('align-left').style.backgroundColor = settings.textAlign === 'left' ? '#4A6CF7' : 'white';
        document.getElementById('align-left').style.color = settings.textAlign === 'left' ? 'white' : 'black';
      }
      
      if (document.getElementById('align-center')) {
        document.getElementById('align-center').style.backgroundColor = settings.textAlign === 'center' ? '#4A6CF7' : 'white';
        document.getElementById('align-center').style.color = settings.textAlign === 'center' ? 'white' : 'black';
      }
      
      if (document.getElementById('align-right')) {
        document.getElementById('align-right').style.backgroundColor = settings.textAlign === 'right' ? '#4A6CF7' : 'white';
        document.getElementById('align-right').style.color = settings.textAlign === 'right' ? 'white' : 'black';
      }
      
      if (document.getElementById('highlight-titles-btn')) {
        document.getElementById('highlight-titles-btn').style.backgroundColor = settings.highlightHeadings ? '#4A6CF7' : '#f1f5f9';
        document.getElementById('highlight-titles-btn').style.color = settings.highlightHeadings ? 'white' : 'black';
      }
      
      if (document.getElementById('highlight-links-btn')) {
        document.getElementById('highlight-links-btn').style.backgroundColor = settings.highlightLinks ? '#4A6CF7' : '#f1f5f9';
        document.getElementById('highlight-links-btn').style.color = settings.highlightLinks ? 'white' : 'black';
      }
      
      if (document.getElementById('text-magnifier-btn')) {
        document.getElementById('text-magnifier-btn').style.backgroundColor = settings.textMagnifier ? '#4A6CF7' : '#f1f5f9';
        document.getElementById('text-magnifier-btn').style.color = settings.textMagnifier ? 'white' : 'black';
      }
      
      if (document.getElementById('content-scaling-btn')) {
        document.getElementById('content-scaling-btn').style.backgroundColor = settings.contentScaling ? '#4A6CF7' : '#f1f5f9';
        document.getElementById('content-scaling-btn').style.color = settings.contentScaling ? 'white' : 'black';
      }
      
      // Update color tab controls - button style
      if (document.getElementById('dark-contrast-btn')) {
        document.getElementById('dark-contrast-btn').style.backgroundColor = settings.darkContrast ? '#4A6CF7' : '#f1f5f9';
        document.getElementById('dark-contrast-btn').style.color = settings.darkContrast ? 'white' : 'black';
      }
      
      if (document.getElementById('light-contrast-btn')) {
        document.getElementById('light-contrast-btn').style.backgroundColor = settings.lightContrast ? '#4A6CF7' : '#f1f5f9';
        document.getElementById('light-contrast-btn').style.color = settings.lightContrast ? 'white' : 'black';
      }
      
      if (document.getElementById('high-contrast-btn')) {
        document.getElementById('high-contrast-btn').style.backgroundColor = settings.highContrast ? '#4A6CF7' : '#f1f5f9';
        document.getElementById('high-contrast-btn').style.color = settings.highContrast ? 'white' : 'black';
      }
      
      if (document.getElementById('high-saturation-btn')) {
        document.getElementById('high-saturation-btn').style.backgroundColor = settings.highSaturation ? '#4A6CF7' : '#f1f5f9';
        document.getElementById('high-saturation-btn').style.color = settings.highSaturation ? 'white' : 'black';
      }
      
      if (document.getElementById('low-saturation-btn')) {
        document.getElementById('low-saturation-btn').style.backgroundColor = settings.lowSaturation ? '#4A6CF7' : '#f1f5f9';
        document.getElementById('low-saturation-btn').style.color = settings.lowSaturation ? 'white' : 'black';
      }
      
      if (document.getElementById('monochrome-btn')) {
        document.getElementById('monochrome-btn').style.backgroundColor = settings.monochrome ? '#4A6CF7' : '#f1f5f9';
        document.getElementById('monochrome-btn').style.color = settings.monochrome ? 'white' : 'black';
      }
      
      // Update orientation tab controls - button style
      if (document.getElementById('mute-sounds-btn')) {
        document.getElementById('mute-sounds-btn').style.backgroundColor = settings.muteSounds ? '#4A6CF7' : '#f1f5f9';
        document.getElementById('mute-sounds-btn').style.color = settings.muteSounds ? 'white' : 'black';
      }
      
      if (document.getElementById('hide-images-btn')) {
        document.getElementById('hide-images-btn').style.backgroundColor = settings.hideImages ? '#4A6CF7' : '#f1f5f9';
        document.getElementById('hide-images-btn').style.color = settings.hideImages ? 'white' : 'black';
      }
      
      if (document.getElementById('reading-mask-btn')) {
        document.getElementById('reading-mask-btn').style.backgroundColor = settings.readingMask ? '#4A6CF7' : '#f1f5f9';
        document.getElementById('reading-mask-btn').style.color = settings.readingMask ? 'white' : 'black';
      }
      
      if (document.getElementById('reading-guide-btn')) {
        document.getElementById('reading-guide-btn').style.backgroundColor = settings.readingGuide ? '#4A6CF7' : '#f1f5f9';
        document.getElementById('reading-guide-btn').style.color = settings.readingGuide ? 'white' : 'black';
      }
      
      if (document.getElementById('stop-animations-btn')) {
        document.getElementById('stop-animations-btn').style.backgroundColor = settings.stopAnimations ? '#4A6CF7' : '#f1f5f9';
        document.getElementById('stop-animations-btn').style.color = settings.stopAnimations ? 'white' : 'black';
      }
      
      if (document.getElementById('highlight-focus-btn')) {
        document.getElementById('highlight-focus-btn').style.backgroundColor = settings.highlightFocus ? '#4A6CF7' : '#f1f5f9';
        document.getElementById('highlight-focus-btn').style.color = settings.highlightFocus ? 'white' : 'black';
      }
      
      if (document.getElementById('default-cursor')) {
        document.getElementById('default-cursor').style.backgroundColor = settings.cursor === 'default' ? '#4A6CF7' : 'white';
        document.getElementById('default-cursor').style.color = settings.cursor === 'default' ? 'white' : 'black';
      }
      
      if (document.getElementById('big-black-cursor')) {
        document.getElementById('big-black-cursor').style.backgroundColor = settings.cursor === 'bigBlack' ? '#4A6CF7' : 'white';
        document.getElementById('big-black-cursor').style.color = settings.cursor === 'bigBlack' ? 'white' : 'black';
      }
      
      if (document.getElementById('big-white-cursor')) {
        document.getElementById('big-white-cursor').style.backgroundColor = settings.cursor === 'bigWhite' ? '#4A6CF7' : 'white';
        document.getElementById('big-white-cursor').style.color = settings.cursor === 'bigWhite' ? 'white' : 'black';
      }
      
      if (document.getElementById('hover-highlight-toggle')) {
        document.getElementById('hover-highlight-toggle').checked = settings.hoverHighlight;
      }
    },
    
    // Setup keyboard shortcut (Alt + L) to reset settings
    setupKeyboardShortcut() {
      document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key === 'l') {
          AccessibilityStore.resetAll();
          AccessibilityWidget.updateUI();
        }
      });
    }
  };
  
  // Make objects accessible globally (for debugging and manual initialization)
  window.AccessibilityStore = AccessibilityStore;
  window.AccessibilityEffects = AccessibilityEffects;
  window.AccessibilityWidget = AccessibilityWidget;

  // Initialize the widget
  const initialize = function() {
    // Load saved settings
    AccessibilityStore.load();
    
    // Create the widget
    AccessibilityWidget.create();
    
    // Apply all effects based on saved settings
    AccessibilityEffects.applyAll();
    
    // Open widget if it was open in previous session
    if (AccessibilityStore.settings.isOpen) {
      AccessibilityWidget.openWidget();
    }
    
    console.log("AccessibilityWidget initialized");
  };
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    // DOMContentLoaded has already fired
    initialize();
  }
})();
