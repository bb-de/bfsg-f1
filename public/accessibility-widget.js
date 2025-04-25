/*
 * Accessibility Widget - Webflow Optimized Version
 * A standalone widget that provides accessibility options for any website
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
    
    // Content adjustment effects - WICHTIG: Hier werden die Selektoren angepasst, um das Widget selbst auszuschließen
    applyFontSize(size) {
      // Wichtig: Wir schließen das Widget selbst aus
      const contentSelector = 'body > *:not(#acc-widget):not(#acc-widget-toggle):not(script):not(style):not(link):not(meta)';
      const contentElements = document.querySelectorAll(contentSelector);
      
      contentElements.forEach(el => {
        // Wir prüfen, ob es sich um das Widget oder eine seiner Komponenten handelt
        if (!el.id || (el.id !== 'acc-widget' && el.id !== 'acc-widget-toggle' && 
           !el.closest('#acc-widget') && !el.closest('#acc-widget-toggle'))) {
          el.style.fontSize = `${size}%`;
        }
      });
    },
    
    applyLineHeight(height) {
      const contentSelector = 'body > *:not(#acc-widget):not(#acc-widget-toggle):not(script):not(style):not(link):not(meta)';
      const contentElements = document.querySelectorAll(contentSelector);
      
      contentElements.forEach(el => {
        if (!el.id || (el.id !== 'acc-widget' && el.id !== 'acc-widget-toggle' && 
           !el.closest('#acc-widget') && !el.closest('#acc-widget-toggle'))) {
          el.style.lineHeight = height === 1 ? '' : `${height}`;
        }
      });
    },
    
    applyLetterSpacing(spacing) {
      const contentSelector = 'body > *:not(#acc-widget):not(#acc-widget-toggle):not(script):not(style):not(link):not(meta)';
      const contentElements = document.querySelectorAll(contentSelector);
      
      contentElements.forEach(el => {
        if (!el.id || (el.id !== 'acc-widget' && el.id !== 'acc-widget-toggle' && 
           !el.closest('#acc-widget') && !el.closest('#acc-widget-toggle'))) {
          el.style.letterSpacing = spacing === 0 ? '' : `${spacing}px`;
        }
      });
    },
    
    applyHelveticaFont(useHelvetica) {
      const contentSelector = 'body > *:not(#acc-widget):not(#acc-widget-toggle):not(script):not(style):not(link):not(meta)';
      const contentElements = document.querySelectorAll(contentSelector);
      
      contentElements.forEach(el => {
        if (!el.id || (el.id !== 'acc-widget' && el.id !== 'acc-widget-toggle' && 
           !el.closest('#acc-widget') && !el.closest('#acc-widget-toggle'))) {
          el.style.fontFamily = useHelvetica ? 'Helvetica, Arial, sans-serif' : '';
        }
      });
    },
    
    applyTextAlignment(align) {
      const contentSelector = 'body > *:not(#acc-widget):not(#acc-widget-toggle):not(script):not(style):not(link):not(meta)';
      const contentElements = document.querySelectorAll(contentSelector);
      
      contentElements.forEach(el => {
        if (!el.id || (el.id !== 'acc-widget' && el.id !== 'acc-widget-toggle' && 
           !el.closest('#acc-widget') && !el.closest('#acc-widget-toggle'))) {
          el.style.textAlign = align || '';
        }
      });
    },
    
    applyHighlightHeadings(highlight) {
      const contentSelector = 'body > *:not(#acc-widget):not(#acc-widget-toggle):not(script):not(style):not(link):not(meta)';
      const contentElement = document.querySelector('body');
      
      if (contentElement) {
        const headings = contentElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
        
        headings.forEach(heading => {
          if (!heading.closest('#acc-widget') && !heading.closest('#acc-widget-toggle')) {
            if (highlight) {
              heading.style.backgroundColor = 'rgba(74, 108, 247, 0.2)';
              heading.style.padding = '4px';
              heading.style.borderRadius = '4px';
            } else {
              heading.style.backgroundColor = '';
              heading.style.padding = '';
              heading.style.borderRadius = '';
            }
          }
        });
      }
    },
    
    applyHighlightLinks(highlight) {
      const contentElement = document.querySelector('body');
      
      if (contentElement) {
        const links = contentElement.querySelectorAll('a');
        
        links.forEach(link => {
          if (!link.closest('#acc-widget') && !link.closest('#acc-widget-toggle')) {
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
          }
        });
      }
    },
    
    // Function to handle text magnification on hover
    magnifyText(e) {
      const target = e.target;
      
      // Prüfen, ob das Element Teil des Widgets ist
      if (target.closest('#acc-widget') || target.closest('#acc-widget-toggle')) {
        return;
      }
      
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
      const contentElement = document.querySelector('body');
      
      if (contentElement) {
        if (enable) {
          contentElement.addEventListener('mouseover', this.magnifyText);
        } else {
          contentElement.removeEventListener('mouseover', this.magnifyText);
          
          // Reset any magnified elements
          const elements = contentElement.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, span, li');
          elements.forEach(el => {
            if (!el.closest('#acc-widget') && !el.closest('#acc-widget-toggle')) {
              el.style.transform = '';
              el.style.display = '';
              el.style.transformOrigin = '';
            }
          });
        }
      }
    },
    
    applyContentScaling(enable) {
      // Finde den Haupt-Content-Container anhand gängiger Webflow-Klassen
      const contentSelectors = ['.w-container', '.container', '.section', 'main', '.main', '.content', '.page-wrapper', '#page-wrapper'];
      let contentElement = null;
      
      for (const selector of contentSelectors) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          // Wähle das erste Element, das nicht Teil des Widgets ist
          for (const el of elements) {
            if (!el.closest('#acc-widget') && !el.closest('#acc-widget-toggle')) {
              contentElement = el;
              break;
            }
          }
          if (contentElement) break;
        }
      }
      
      // Fallback: Verwende den Body, wenn kein spezifischer Container gefunden wurde
      if (!contentElement) {
        contentElement = document.body;
      }
      
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
    
    // Die restlichen Funktionen folgen demselben Muster...
    // Color adjustment effects
    applyDarkContrast(enable) {
      const contentSelectors = ['.w-container', '.container', '.section', 'main', '.main', '.content', '.page-wrapper', '#page-wrapper'];
      let contentElement = null;
      
      for (const selector of contentSelectors) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          for (const el of elements) {
            if (!el.closest('#acc-widget') && !el.closest('#acc-widget-toggle')) {
              contentElement = el;
              break;
            }
          }
          if (contentElement) break;
        }
      }
      
      if (!contentElement) {
        contentElement = document.body;
      }
      
      if (contentElement) {
        if (enable) {
          contentElement.style.backgroundColor = '#121212';
          contentElement.style.color = '#ffffff';
          
          const elements = contentElement.querySelectorAll('*');
          elements.forEach(el => {
            if (!el.closest('#acc-widget') && !el.closest('#acc-widget-toggle')) {
              const computedStyle = window.getComputedStyle(el);
              const bgColor = computedStyle.backgroundColor;
              
              // Nur Elemente mit weißem/hellem Hintergrund ändern
              if (bgColor === 'rgb(255, 255, 255)' || bgColor === 'rgba(255, 255, 255, 1)' || 
                  bgColor === 'rgb(255, 255, 255, 0)' || bgColor === 'transparent') {
                el.setAttribute('data-original-bg', el.style.backgroundColor || 'transparent');
                el.style.backgroundColor = '#333';
                el.style.color = '#fff';
              }
            }
          });
        } else {
          contentElement.style.backgroundColor = '';
          contentElement.style.color = '';
          
          const elements = contentElement.querySelectorAll('[data-original-bg]');
          elements.forEach(el => {
            if (!el.closest('#acc-widget') && !el.closest('#acc-widget-toggle')) {
              el.style.backgroundColor = el.getAttribute('data-original-bg');
              el.style.color = '';
              el.removeAttribute('data-original-bg');
            }
          });
        }
      }
    },
    
    // Weitere Effekte hier implementieren...
    // Diese folgen einem ähnlichen Muster und schließen das Widget aus
    
    applyLightContrast(enable) {
      // Implementierung hier...
    },
    
    applyHighContrast(enable) {
      // Implementierung hier...
    },
    
    applyHighSaturation(enable) {
      // Implementierung hier...
    },
    
    applyLowSaturation(enable) {
      // Implementierung hier...
    },
    
    applyMonochrome(enable) {
      const contentElement = document.querySelector('body');
      
      if (contentElement) {
        if (enable) {
          const filter = 'grayscale(100%)';
          
          // Wende den Filter auf alles außer dem Widget an
          const elements = contentElement.querySelectorAll('*');
          elements.forEach(el => {
            if (!el.closest('#acc-widget') && !el.closest('#acc-widget-toggle')) {
              el.style.filter = filter;
              el.style.webkitFilter = filter;
            }
          });
        } else {
          const elements = contentElement.querySelectorAll('*');
          elements.forEach(el => {
            if (!el.closest('#acc-widget') && !el.closest('#acc-widget-toggle')) {
              el.style.filter = '';
              el.style.webkitFilter = '';
            }
          });
        }
      }
    },
    
    applyMuteSounds(mute) {
      const audios = document.querySelectorAll('audio, video');
      
      audios.forEach(audio => {
        if (mute) {
          audio.muted = true;
          audio.setAttribute('data-accessibility-muted', 'true');
        } else {
          if (audio.getAttribute('data-accessibility-muted') === 'true') {
            audio.muted = false;
            audio.removeAttribute('data-accessibility-muted');
          }
        }
      });
    },
    
    applyHideImages(hide) {
      const contentElement = document.querySelector('body');
      
      if (contentElement) {
        const images = contentElement.querySelectorAll('img, svg, [role="img"], [aria-label*="image"], [style*="background-image"]');
        
        images.forEach(img => {
          if (!img.closest('#acc-widget') && !img.closest('#acc-widget-toggle')) {
            if (hide) {
              img.style.visibility = 'hidden';
            } else {
              img.style.visibility = '';
            }
          }
        });
      }
    },
    
    // Function for reading mask
    ensureReadingMaskElements() {
      let topMask = document.getElementById('acc-reading-mask-top');
      let bottomMask = document.getElementById('acc-reading-mask-bottom');
      
      if (!topMask) {
        topMask = document.createElement('div');
        topMask.id = 'acc-reading-mask-top';
        topMask.style.position = 'fixed';
        topMask.style.top = '0';
        topMask.style.left = '0';
        topMask.style.width = '100%';
        topMask.style.height = '40%';
        topMask.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        topMask.style.zIndex = '999990'; // Höher als Widget aber niedriger als Reading Guide
        topMask.style.pointerEvents = 'none'; // Allow clicking through
        document.body.appendChild(topMask);
      }
      
      if (!bottomMask) {
        bottomMask = document.createElement('div');
        bottomMask.id = 'acc-reading-mask-bottom';
        bottomMask.style.position = 'fixed';
        bottomMask.style.bottom = '0';
        bottomMask.style.left = '0';
        bottomMask.style.width = '100%';
        bottomMask.style.height = '40%';
        bottomMask.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        bottomMask.style.zIndex = '999990';
        bottomMask.style.pointerEvents = 'none'; // Allow clicking through
        document.body.appendChild(bottomMask);
      }
      
      return { top: topMask, bottom: bottomMask };
    },
    
    moveReadingMask(e) {
      const { top, bottom } = this.ensureReadingMaskElements();
      const mouseY = e.clientY;
      const windowHeight = window.innerHeight;
      
      // Calculate the position of the mask
      const maskHeight = windowHeight * 0.4; // 40% of window height
      const maskCenter = mouseY;
      
      // Position the masks
      top.style.height = `${maskCenter - (maskHeight / 2)}px`;
      bottomMask = document.getElementById('acc-reading-mask-bottom');
      bottom.style.height = `${windowHeight - maskCenter - (maskHeight / 2)}px`;
    },
    
    applyReadingMask(enable) {
      const { top, bottom } = this.ensureReadingMaskElements();
      
      if (enable) {
        document.addEventListener('mousemove', this.moveReadingMask.bind(this));
        top.style.display = 'block';
        bottom.style.display = 'block';
      } else {
        document.removeEventListener('mousemove', this.moveReadingMask.bind(this));
        top.style.display = 'none';
        bottom.style.display = 'none';
      }
    },
    
    // Function for reading guide
    ensureReadingGuideElement() {
      let guide = document.getElementById('acc-reading-guide');
      
      if (!guide) {
        guide = document.createElement('div');
        guide.id = 'acc-reading-guide';
        guide.style.position = 'fixed';
        guide.style.left = '0';
        guide.style.width = '100%';
        guide.style.height = '30px';
        guide.style.backgroundColor = 'rgba(255, 255, 0, 0.2)';
        guide.style.zIndex = '999991'; // Higher than reading mask
        guide.style.pointerEvents = 'none'; // Allow clicking through
        document.body.appendChild(guide);
      }
      
      return guide;
    },
    
    moveReadingGuide(e) {
      const guide = this.ensureReadingGuideElement();
      guide.style.top = `${e.clientY - 15}px`; // 15 is half the height
    },
    
    applyReadingGuide(enable) {
      const guide = this.ensureReadingGuideElement();
      
      if (enable) {
        document.addEventListener('mousemove', this.moveReadingGuide.bind(this));
        guide.style.display = 'block';
      } else {
        document.removeEventListener('mousemove', this.moveReadingGuide.bind(this));
        guide.style.display = 'none';
      }
    },
    
    applyStopAnimations(stop) {
      if (stop) {
        const style = document.createElement('style');
        style.id = 'acc-stop-animations';
        style.textContent = `
          * {
            animation-duration: 0.001s !important;
            animation-delay: 0.001s !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001s !important;
            transition-delay: 0.001s !important;
          }
        `;
        document.head.appendChild(style);
      } else {
        const style = document.getElementById('acc-stop-animations');
        if (style) style.remove();
      }
    },
    
    applyHighlightFocus(highlight) {
      if (highlight) {
        const style = document.createElement('style');
        style.id = 'acc-highlight-focus';
        style.textContent = `
          *:focus {
            outline: 3px solid #4A6CF7 !important;
            outline-offset: 3px !important;
          }
        `;
        document.head.appendChild(style);
      } else {
        const style = document.getElementById('acc-highlight-focus');
        if (style) style.remove();
      }
    },
    
    applyCursor(cursor) {
      let newCursor = 'default';
      
      switch (cursor) {
        case 'bigBlack':
          newCursor = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'%3E%3Ccircle cx=\'16\' cy=\'16\' r=\'15\' fill=\'%23000\'/%3E%3C/svg%3E") 16 16, auto';
          break;
        case 'bigWhite':
          newCursor = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'%3E%3Ccircle cx=\'16\' cy=\'16\' r=\'15\' fill=\'%23fff\' stroke=\'%23000\' stroke-width=\'1\'/%3E%3C/svg%3E") 16 16, auto';
          break;
        default:
          newCursor = '';
      }
      
      document.body.style.cursor = newCursor;
    },
    
    applyHoverHighlight(highlight) {
      if (highlight) {
        const style = document.createElement('style');
        style.id = 'acc-hover-highlight';
        style.textContent = `
          *:hover:not(#acc-widget *):not(#acc-widget-toggle):not(#acc-widget):not(#acc-widget-toggle *) {
            outline: 2px dashed #4A6CF7 !important;
            outline-offset: 2px !important;
          }
        `;
        document.head.appendChild(style);
      } else {
        const style = document.getElementById('acc-hover-highlight');
        if (style) style.remove();
      }
    },
  };
  
  // Main widget component
  const AccessibilityWidget = {
    // Initialize the widget
    create() {
      // Create the toggle button and widget panel
      this.createToggleButton();
      this.createWidgetPanel();
      
      // Create tab panels
      this.createContentTabPanel();
      this.createColorTabPanel();
      this.createOrientationTabPanel();
      
      // Initialize keyboard shortcut
      this.setupKeyboardShortcut();
      
      // Update UI based on settings
      this.updateUI();
      
      // Expose the widget functionality globally
      window.AccessibilityWidget = this;
      window.AccessibilityStore = AccessibilityStore;
      window.AccessibilityEffects = AccessibilityEffects;
    },
    
    // Create CSS styles for the widget
    injectStyles() {
      const css = `
        #acc-widget {
          font-family: Arial, sans-serif;
          color: #333;
          font-size: 16px;
          line-height: 1.5;
        }
        
        #acc-widget * {
          box-sizing: border-box;
        }
        
        #acc-widget button {
          background-color: #f0f0f0;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 10px;
          margin: 5px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          width: calc(50% - 10px);
          font-size: 14px;
          transition: all 0.2s ease;
        }
        
        #acc-widget button:hover {
          background-color: #e0e0e0;
        }
        
        #acc-widget button.active {
          background-color: #4A6CF7;
          color: white;
        }
        
        #acc-widget .tab-panel {
          display: none;
          padding: 16px;
        }
        
        #acc-widget .tab-panel.active {
          display: block;
        }
        
        #acc-widget .button-group {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        
        #acc-widget .slider-container {
          margin: 15px 0;
        }
        
        #acc-widget .slider-container label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        
        #acc-widget input[type="range"] {
          width: 100%;
        }
        
        #acc-widget .slider-value {
          display: inline-block;
          margin-left: 10px;
          font-weight: bold;
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
      button.style.zIndex = '999999'; // Sehr hoher z-index
      button.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      // Feste Positionierung
      button.style.position = 'fixed';
      button.style.bottom = '20px';
      button.style.right = '20px';
      button.style.width = '50px';
      button.style.height = '50px';
      
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414-6.414a2 2 0 0 1 2.828 0L21 12M3 12h18" />
        </svg>
      `;
      
      button.addEventListener('click', () => {
        AccessibilityStore.update('isOpen', true);
        this.openWidget();
        
        // Einfügen einer Animation
        button.classList.add('accessibility-pulse');
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
      widget.style.zIndex = '999998'; // Sehr hoher z-index
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
        <h2 id="acc-widget-title" style="margin: 0; font-size: 18px; font-weight: bold;">Accessibility Options</h2>
        <button id="acc-widget-close" aria-label="Close accessibility menu" style="background: none; border: none; cursor: pointer; color: white;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      `;
      
      // Tabs
      const tabs = document.createElement('div');
      tabs.style.display = 'flex';
      tabs.style.borderBottom = '1px solid #ddd';
      
      const tabLabels = ['Content', 'Color', 'Orientation'];
      const tabIds = ['content', 'color', 'orientation'];
      
      tabIds.forEach((id, index) => {
        const tab = document.createElement('button');
        tab.id = `acc-tab-${id}`;
        tab.style.flex = '1';
        tab.style.padding = '12px';
        tab.style.background = 'none';
        tab.style.border = 'none';
        tab.style.borderBottom = id === AccessibilityStore.settings.activeTab ? '2px solid #4A6CF7' : 'none';
        tab.style.color = id === AccessibilityStore.settings.activeTab ? '#4A6CF7' : '#333';
        tab.style.fontWeight = id === AccessibilityStore.settings.activeTab ? 'bold' : 'normal';
        tab.style.cursor = 'pointer';
        tab.innerText = tabLabels[index];
        
        tab.addEventListener('click', () => {
          AccessibilityStore.update('activeTab', id);
          this.switchTab(id);
        });
        
        tabs.appendChild(tab);
      });
      
      // Reset button
      const resetContainer = document.createElement('div');
      resetContainer.style.padding = '16px';
      resetContainer.style.textAlign = 'center';
      resetContainer.style.borderTop = '1px solid #ddd';
      
      const resetButton = document.createElement('button');
      resetButton.id = 'acc-reset-all';
      resetButton.style.padding = '10px 20px';
      resetButton.style.backgroundColor = '#f44336';
      resetButton.style.color = 'white';
      resetButton.style.border = 'none';
      resetButton.style.borderRadius = '4px';
      resetButton.style.cursor = 'pointer';
      resetButton.style.fontWeight = 'bold';
      resetButton.innerText = 'Reset All Settings';
      
      resetButton.addEventListener('click', () => {
        AccessibilityStore.resetAll();
        this.updateUI();
        
        // Animation
        resetButton.classList.add('accessibility-button-active');
        setTimeout(() => {
          resetButton.classList.remove('accessibility-button-active');
        }, 500);
      });
      
      resetContainer.appendChild(resetButton);
      
      // Assemble widget
      widget.appendChild(header);
      widget.appendChild(tabs);
      
      // Add empty tab panels (will be filled later)
      tabIds.forEach(id => {
        const panel = document.createElement('div');
        panel.id = `acc-panel-${id}`;
        panel.className = `tab-panel ${id === AccessibilityStore.settings.activeTab ? 'active' : ''}`;
        widget.appendChild(panel);
      });
      
      widget.appendChild(resetContainer);
      
      // Close button event
      document.body.appendChild(widget);
      document.getElementById('acc-widget-close').addEventListener('click', () => {
        AccessibilityStore.update('isOpen', false);
        this.closeWidget();
      });
      
      // Inject styles
      this.injectStyles();
    },
    
    // Create the content tab panel
    createContentTabPanel() {
      const panel = document.getElementById('acc-panel-content');
      
      // Font size slider
      const fontSizeContainer = document.createElement('div');
      fontSizeContainer.className = 'slider-container';
      
      const fontSizeLabel = document.createElement('label');
      fontSizeLabel.innerText = 'Font Size';
      
      const fontSizeSlider = document.createElement('input');
      fontSizeSlider.type = 'range';
      fontSizeSlider.min = '100';
      fontSizeSlider.max = '200';
      fontSizeSlider.step = '10';
      fontSizeSlider.value = AccessibilityStore.settings.fontSize;
      
      const fontSizeValue = document.createElement('span');
      fontSizeValue.className = 'slider-value';
      fontSizeValue.innerText = `${AccessibilityStore.settings.fontSize}%`;
      
      fontSizeSlider.addEventListener('input', () => {
        const value = parseInt(fontSizeSlider.value);
        fontSizeValue.innerText = `${value}%`;
        AccessibilityStore.update('fontSize', value);
      });
      
      fontSizeContainer.appendChild(fontSizeLabel);
      fontSizeContainer.appendChild(fontSizeSlider);
      fontSizeContainer.appendChild(fontSizeValue);
      
      // Line height slider
      const lineHeightContainer = document.createElement('div');
      lineHeightContainer.className = 'slider-container';
      
      const lineHeightLabel = document.createElement('label');
      lineHeightLabel.innerText = 'Line Height';
      
      const lineHeightSlider = document.createElement('input');
      lineHeightSlider.type = 'range';
      lineHeightSlider.min = '1';
      lineHeightSlider.max = '3';
      lineHeightSlider.step = '0.1';
      lineHeightSlider.value = AccessibilityStore.settings.lineHeight;
      
      const lineHeightValue = document.createElement('span');
      lineHeightValue.className = 'slider-value';
      lineHeightValue.innerText = AccessibilityStore.settings.lineHeight;
      
      lineHeightSlider.addEventListener('input', () => {
        const value = parseFloat(lineHeightSlider.value);
        lineHeightValue.innerText = value;
        AccessibilityStore.update('lineHeight', value);
      });
      
      lineHeightContainer.appendChild(lineHeightLabel);
      lineHeightContainer.appendChild(lineHeightSlider);
      lineHeightContainer.appendChild(lineHeightValue);
      
      // Letter spacing slider
      const letterSpacingContainer = document.createElement('div');
      letterSpacingContainer.className = 'slider-container';
      
      const letterSpacingLabel = document.createElement('label');
      letterSpacingLabel.innerText = 'Letter Spacing';
      
      const letterSpacingSlider = document.createElement('input');
      letterSpacingSlider.type = 'range';
      letterSpacingSlider.min = '0';
      letterSpacingSlider.max = '10';
      letterSpacingSlider.step = '0.5';
      letterSpacingSlider.value = AccessibilityStore.settings.letterSpacing;
      
      const letterSpacingValue = document.createElement('span');
      letterSpacingValue.className = 'slider-value';
      letterSpacingValue.innerText = `${AccessibilityStore.settings.letterSpacing}px`;
      
      letterSpacingSlider.addEventListener('input', () => {
        const value = parseFloat(letterSpacingSlider.value);
        letterSpacingValue.innerText = `${value}px`;
        AccessibilityStore.update('letterSpacing', value);
      });
      
      letterSpacingContainer.appendChild(letterSpacingLabel);
      letterSpacingContainer.appendChild(letterSpacingSlider);
      letterSpacingContainer.appendChild(letterSpacingValue);
      
      // Buttons for other content adjustments in a 2-column layout
      const buttonGroup = document.createElement('div');
      buttonGroup.className = 'button-group';
      
      const contentButtons = [
        { id: 'useHelvetica', text: 'Helvetica Font', icon: 'Aa' },
        { id: 'textAlign', text: 'Align Center', icon: '≡', value: 'center' },
        { id: 'highlightHeadings', text: 'Highlight Titles', icon: 'H' },
        { id: 'highlightLinks', text: 'Highlight Links', icon: '🔗' },
        { id: 'textMagnifier', text: 'Text Magnifier', icon: '🔍' },
        { id: 'contentScaling', text: 'Content Scaling', icon: '↔' }
      ];
      
      contentButtons.forEach(btn => {
        const button = document.createElement('button');
        button.id = `acc-${btn.id}`;
        button.className = AccessibilityStore.settings[btn.id] ? 'active' : '';
        button.innerHTML = `<div style="font-size: 24px; margin-bottom: 5px;">${btn.icon}</div>${btn.text}`;
        
        button.addEventListener('click', () => {
          let newValue;
          
          if (btn.id === 'textAlign') {
            newValue = AccessibilityStore.settings.textAlign === 'center' ? null : 'center';
          } else {
            newValue = !AccessibilityStore.settings[btn.id];
          }
          
          AccessibilityStore.update(btn.id, newValue);
          button.className = newValue ? 'active accessibility-button-active' : 'accessibility-button-inactive';
          
          // Animation for active state change
          if (newValue) {
            button.classList.add('accessibility-button-active');
            setTimeout(() => { button.classList.remove('accessibility-button-active'); }, 500);
          } else {
            button.classList.add('accessibility-button-inactive');
            setTimeout(() => { button.classList.remove('accessibility-button-inactive'); }, 300);
          }
        });
        
        buttonGroup.appendChild(button);
      });
      
      // Assemble the panel
      panel.appendChild(fontSizeContainer);
      panel.appendChild(lineHeightContainer);
      panel.appendChild(letterSpacingContainer);
      panel.appendChild(buttonGroup);
    },
    
    // Create the color tab panel
    createColorTabPanel() {
      const panel = document.getElementById('acc-panel-color');
      
      // Buttons for color adjustments in a 2-column layout
      const buttonGroup = document.createElement('div');
      buttonGroup.className = 'button-group';
      
      const colorButtons = [
        { id: 'darkContrast', text: 'Dark Contrast', icon: '🌑' },
        { id: 'lightContrast', text: 'Light Contrast', icon: '🌕' },
        { id: 'highContrast', text: 'High Contrast', icon: '◐' },
        { id: 'highSaturation', text: 'High Saturation', icon: '🎨' },
        { id: 'lowSaturation', text: 'Low Saturation', icon: '◯' },
        { id: 'monochrome', text: 'Monochrome', icon: '⬛' }
      ];
      
      colorButtons.forEach(btn => {
        const button = document.createElement('button');
        button.id = `acc-${btn.id}`;
        button.className = AccessibilityStore.settings[btn.id] ? 'active' : '';
        button.innerHTML = `<div style="font-size: 24px; margin-bottom: 5px;">${btn.icon}</div>${btn.text}`;
        
        button.addEventListener('click', () => {
          const newValue = !AccessibilityStore.settings[btn.id];
          
          // Update store
          AccessibilityStore.update(btn.id, newValue);
          
          // Update all color buttons to reflect that only one can be active
          colorButtons.forEach(colorBtn => {
            const colorButton = document.getElementById(`acc-${colorBtn.id}`);
            if (colorButton) {
              colorButton.className = AccessibilityStore.settings[colorBtn.id] ? 'active' : '';
            }
          });
          
          // Animation for active state change
          if (newValue) {
            button.classList.add('accessibility-button-active');
            setTimeout(() => { button.classList.remove('accessibility-button-active'); }, 500);
          } else {
            button.classList.add('accessibility-button-inactive');
            setTimeout(() => { button.classList.remove('accessibility-button-inactive'); }, 300);
          }
        });
        
        buttonGroup.appendChild(button);
      });
      
      // Assemble the panel
      panel.appendChild(buttonGroup);
    },
    
    // Create the orientation tab panel
    createOrientationTabPanel() {
      const panel = document.getElementById('acc-panel-orientation');
      
      // Buttons for orientation adjustments in a 2-column layout
      const buttonGroup = document.createElement('div');
      buttonGroup.className = 'button-group';
      
      const orientationButtons = [
        { id: 'muteSounds', text: 'Mute Sounds', icon: '🔇' },
        { id: 'hideImages', text: 'Hide Images', icon: '🖼️' },
        { id: 'readingMask', text: 'Reading Mask', icon: '👁️' },
        { id: 'readingGuide', text: 'Reading Guide', icon: '📏' },
        { id: 'stopAnimations', text: 'Stop Animations', icon: '⏹️' },
        { id: 'highlightFocus', text: 'Highlight Focus', icon: '🔎' },
        { id: 'hoverHighlight', text: 'Hover Highlight', icon: '👆' }
      ];
      
      orientationButtons.forEach(btn => {
        const button = document.createElement('button');
        button.id = `acc-${btn.id}`;
        button.className = AccessibilityStore.settings[btn.id] ? 'active' : '';
        button.innerHTML = `<div style="font-size: 24px; margin-bottom: 5px;">${btn.icon}</div>${btn.text}`;
        
        button.addEventListener('click', () => {
          const newValue = !AccessibilityStore.settings[btn.id];
          AccessibilityStore.update(btn.id, newValue);
          button.className = newValue ? 'active' : '';
          
          // Animation for active state change
          if (newValue) {
            button.classList.add('accessibility-button-active');
            setTimeout(() => { button.classList.remove('accessibility-button-active'); }, 500);
          } else {
            button.classList.add('accessibility-button-inactive');
            setTimeout(() => { button.classList.remove('accessibility-button-inactive'); }, 300);
          }
        });
        
        buttonGroup.appendChild(button);
      });
      
      // Cursor options
      const cursorContainer = document.createElement('div');
      cursorContainer.style.marginTop = '20px';
      
      const cursorLabel = document.createElement('div');
      cursorLabel.style.fontWeight = 'bold';
      cursorLabel.style.marginBottom = '10px';
      cursorLabel.innerText = 'Cursor';
      
      const cursorButtonGroup = document.createElement('div');
      cursorButtonGroup.className = 'button-group';
      
      const cursorOptions = [
        { id: 'default', text: 'Default', icon: '↖️' },
        { id: 'bigBlack', text: 'Big Black', icon: '⚫' },
        { id: 'bigWhite', text: 'Big White', icon: '⚪' }
      ];
      
      cursorOptions.forEach(option => {
        const button = document.createElement('button');
        button.id = `acc-cursor-${option.id}`;
        button.className = AccessibilityStore.settings.cursor === option.id ? 'active' : '';
        button.innerHTML = `<div style="font-size: 24px; margin-bottom: 5px;">${option.icon}</div>${option.text}`;
        
        button.addEventListener('click', () => {
          AccessibilityStore.update('cursor', option.id);
          
          // Update button states
          cursorOptions.forEach(opt => {
            const cursorButton = document.getElementById(`acc-cursor-${opt.id}`);
            if (cursorButton) {
              cursorButton.className = AccessibilityStore.settings.cursor === opt.id ? 'active' : '';
            }
          });
          
          // Animation
          button.classList.add('accessibility-button-active');
          setTimeout(() => { button.classList.remove('accessibility-button-active'); }, 500);
        });
        
        cursorButtonGroup.appendChild(button);
      });
      
      cursorContainer.appendChild(cursorLabel);
      cursorContainer.appendChild(cursorButtonGroup);
      
      // Assemble the panel
      panel.appendChild(buttonGroup);
      panel.appendChild(cursorContainer);
    },
    
    // Switch between tabs
    switchTab(tabName) {
      // Update tab buttons
      const tabButtons = document.querySelectorAll('[id^="acc-tab-"]');
      tabButtons.forEach(button => {
        const id = button.id.replace('acc-tab-', '');
        button.style.borderBottom = id === tabName ? '2px solid #4A6CF7' : 'none';
        button.style.color = id === tabName ? '#4A6CF7' : '#333';
        button.style.fontWeight = id === tabName ? 'bold' : 'normal';
      });
      
      // Update tab panels
      const tabPanels = document.querySelectorAll('[id^="acc-panel-"]');
      tabPanels.forEach(panel => {
        const id = panel.id.replace('acc-panel-', '');
        panel.style.display = id === tabName ? 'block' : 'none';
        
        // Add animation
        if (id === tabName) {
          panel.classList.add('accessibility-highlight');
          setTimeout(() => {
            panel.classList.remove('accessibility-highlight');
          }, 1000);
        }
      });
    },
    
    // Open the widget
    openWidget() {
      const widget = document.getElementById('acc-widget');
      
      if (widget) {
        widget.style.transform = 'translateX(0)';
        
        // Hide the toggle button when widget is open
        const toggleButton = document.getElementById('acc-widget-toggle');
        if (toggleButton) {
          toggleButton.style.display = 'none';
        }
      }
    },
    
    // Close the widget
    closeWidget() {
      const widget = document.getElementById('acc-widget');
      
      if (widget) {
        widget.style.transform = 'translateX(100%)';
        
        // Show toggle button when widget is closed
        const toggleButton = document.getElementById('acc-widget-toggle');
        if (toggleButton) {
          toggleButton.style.display = 'flex';
        }
      }
    },
    
    // Update UI to reflect current settings
    updateUI() {
      const settings = AccessibilityStore.settings;
      
      // Update tab
      this.switchTab(settings.activeTab);
      
      // Update content controls
      document.getElementById('acc-useHelvetica').className = settings.useHelvetica ? 'active' : '';
      document.getElementById('acc-textAlign').className = settings.textAlign === 'center' ? 'active' : '';
      document.getElementById('acc-highlightHeadings').className = settings.highlightHeadings ? 'active' : '';
      document.getElementById('acc-highlightLinks').className = settings.highlightLinks ? 'active' : '';
      document.getElementById('acc-textMagnifier').className = settings.textMagnifier ? 'active' : '';
      document.getElementById('acc-contentScaling').className = settings.contentScaling ? 'active' : '';
      
      // Update color controls
      document.getElementById('acc-darkContrast').className = settings.darkContrast ? 'active' : '';
      document.getElementById('acc-lightContrast').className = settings.lightContrast ? 'active' : '';
      document.getElementById('acc-highContrast').className = settings.highContrast ? 'active' : '';
      document.getElementById('acc-highSaturation').className = settings.highSaturation ? 'active' : '';
      document.getElementById('acc-lowSaturation').className = settings.lowSaturation ? 'active' : '';
      document.getElementById('acc-monochrome').className = settings.monochrome ? 'active' : '';
      
      // Update orientation controls
      document.getElementById('acc-muteSounds').className = settings.muteSounds ? 'active' : '';
      document.getElementById('acc-hideImages').className = settings.hideImages ? 'active' : '';
      document.getElementById('acc-readingMask').className = settings.readingMask ? 'active' : '';
      document.getElementById('acc-readingGuide').className = settings.readingGuide ? 'active' : '';
      document.getElementById('acc-stopAnimations').className = settings.stopAnimations ? 'active' : '';
      document.getElementById('acc-highlightFocus').className = settings.highlightFocus ? 'active' : '';
      document.getElementById('acc-hoverHighlight').className = settings.hoverHighlight ? 'active' : '';
      
      // Update cursor controls
      document.getElementById('acc-cursor-default').className = settings.cursor === 'default' ? 'active' : '';
      document.getElementById('acc-cursor-bigBlack').className = settings.cursor === 'bigBlack' ? 'active' : '';
      document.getElementById('acc-cursor-bigWhite').className = settings.cursor === 'bigWhite' ? 'active' : '';
      
      // Update sliders
      const fontSizeSlider = document.querySelector('input[type="range"][min="100"]');
      const fontSizeValue = fontSizeSlider.nextElementSibling;
      fontSizeSlider.value = settings.fontSize;
      fontSizeValue.innerText = `${settings.fontSize}%`;
      
      const lineHeightSlider = document.querySelector('input[type="range"][min="1"][max="3"]');
      const lineHeightValue = lineHeightSlider.nextElementSibling;
      lineHeightSlider.value = settings.lineHeight;
      lineHeightValue.innerText = settings.lineHeight;
      
      const letterSpacingSlider = document.querySelector('input[type="range"][min="0"][max="10"]');
      const letterSpacingValue = letterSpacingSlider.nextElementSibling;
      letterSpacingSlider.value = settings.letterSpacing;
      letterSpacingValue.innerText = `${settings.letterSpacing}px`;
    },
    
    // Setup keyboard shortcut (Alt+A)
    setupKeyboardShortcut() {
      document.addEventListener('keydown', (e) => {
        // Alt+A (or Option+A on Mac)
        if (e.altKey && e.key === 'a') {
          const newState = !AccessibilityStore.settings.isOpen;
          AccessibilityStore.update('isOpen', newState);
          
          if (newState) {
            this.openWidget();
          } else {
            this.closeWidget();
          }
        }
      });
    }
  };
  
  // Initialize when DOM is ready
  const initialize = () => {
    // Load saved settings
    AccessibilityStore.load();
    
    // Create the widget components
    AccessibilityWidget.create();
    
    // Apply all effects based on saved settings
    AccessibilityEffects.applyAll();
    
    // Open widget if it was open in previous session
    if (AccessibilityStore.settings.isOpen) {
      AccessibilityWidget.openWidget();
    }
    
    console.log("AccessibilityWidget initialized");
    console.log("AccessibilityWidget loaded successfully");
  };
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    // DOMContentLoaded has already fired
    initialize();
  }
  
  window.initialize = initialize;
})();
