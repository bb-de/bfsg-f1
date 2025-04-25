import { useAccessibilityStore } from '@/hooks/use-accessibility-store';

export default function OrientationTab() {
  const {
    muteSounds,
    hideImages,
    readingMask,
    readingGuide,
    stopAnimations,
    highlightFocus,
    cursor,
    hoverHighlight,
    setMuteSounds,
    setHideImages,
    setReadingMask,
    setReadingGuide,
    setStopAnimations,
    setHighlightFocus,
    setCursor,
    setHoverHighlight,
  } = useAccessibilityStore();
  
  return (
    <div id="orientation-tab-panel" className="p-4 space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Orientation Adjustments</h3>
        
        {/* Mute All Sounds */}
        <div className="flex justify-between items-center">
          <label htmlFor="mute-sounds-toggle" className="block text-sm font-medium text-gray-700">Mute All Sounds</label>
          <div className="relative inline-block w-10 align-middle select-none">
            <input 
              type="checkbox" 
              id="mute-sounds-toggle" 
              className="sr-only"
              checked={muteSounds}
              onChange={(e) => setMuteSounds(e.target.checked)}
            />
            <div className={`block h-6 w-10 rounded-full cursor-pointer ${muteSounds ? 'bg-primary' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${muteSounds ? 'translate-x-4' : 'translate-x-0'}`}></div>
          </div>
        </div>
        
        {/* Hide All Images */}
        <div className="flex justify-between items-center">
          <label htmlFor="hide-images-toggle" className="block text-sm font-medium text-gray-700">Hide All Images</label>
          <div className="relative inline-block w-10 align-middle select-none">
            <input 
              type="checkbox" 
              id="hide-images-toggle" 
              className="sr-only"
              checked={hideImages}
              onChange={(e) => setHideImages(e.target.checked)}
            />
            <div className={`block h-6 w-10 rounded-full cursor-pointer ${hideImages ? 'bg-primary' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${hideImages ? 'translate-x-4' : 'translate-x-0'}`}></div>
          </div>
        </div>
        
        {/* Reading Mask */}
        <div className="flex justify-between items-center">
          <label htmlFor="reading-mask-toggle" className="block text-sm font-medium text-gray-700">Reading Mask</label>
          <div className="relative inline-block w-10 align-middle select-none">
            <input 
              type="checkbox" 
              id="reading-mask-toggle" 
              className="sr-only"
              checked={readingMask}
              onChange={(e) => setReadingMask(e.target.checked)}
            />
            <div className={`block h-6 w-10 rounded-full cursor-pointer ${readingMask ? 'bg-primary' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${readingMask ? 'translate-x-4' : 'translate-x-0'}`}></div>
          </div>
        </div>
        
        {/* Reading Guide */}
        <div className="flex justify-between items-center">
          <label htmlFor="reading-guide-toggle" className="block text-sm font-medium text-gray-700">Reading Guide</label>
          <div className="relative inline-block w-10 align-middle select-none">
            <input 
              type="checkbox" 
              id="reading-guide-toggle" 
              className="sr-only"
              checked={readingGuide}
              onChange={(e) => setReadingGuide(e.target.checked)}
            />
            <div className={`block h-6 w-10 rounded-full cursor-pointer ${readingGuide ? 'bg-primary' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${readingGuide ? 'translate-x-4' : 'translate-x-0'}`}></div>
          </div>
        </div>
        
        {/* Stop Animations */}
        <div className="flex justify-between items-center">
          <label htmlFor="stop-animations-toggle" className="block text-sm font-medium text-gray-700">Stop Animations</label>
          <div className="relative inline-block w-10 align-middle select-none">
            <input 
              type="checkbox" 
              id="stop-animations-toggle" 
              className="sr-only"
              checked={stopAnimations}
              onChange={(e) => setStopAnimations(e.target.checked)}
            />
            <div className={`block h-6 w-10 rounded-full cursor-pointer ${stopAnimations ? 'bg-primary' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${stopAnimations ? 'translate-x-4' : 'translate-x-0'}`}></div>
          </div>
        </div>
        
        {/* Highlight Focus */}
        <div className="flex justify-between items-center">
          <label htmlFor="highlight-focus-toggle" className="block text-sm font-medium text-gray-700">Highlight Focus</label>
          <div className="relative inline-block w-10 align-middle select-none">
            <input 
              type="checkbox" 
              id="highlight-focus-toggle" 
              className="sr-only"
              checked={highlightFocus}
              onChange={(e) => setHighlightFocus(e.target.checked)}
            />
            <div className={`block h-6 w-10 rounded-full cursor-pointer ${highlightFocus ? 'bg-primary' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${highlightFocus ? 'translate-x-4' : 'translate-x-0'}`}></div>
          </div>
        </div>
        
        {/* Cursor Options */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Cursor Options</label>
          <div className="flex space-x-2">
            <button 
              id="default-cursor" 
              onClick={() => setCursor('default')}
              className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${cursor === 'default' ? 'bg-primary text-white' : 'border-gray-300 hover:bg-gray-100'}`}
            >
              Default
            </button>
            <button 
              id="big-black-cursor" 
              onClick={() => setCursor('bigBlack')}
              className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${cursor === 'bigBlack' ? 'bg-primary text-white' : 'border-gray-300 hover:bg-gray-100'}`}
            >
              Big Black
            </button>
            <button 
              id="big-white-cursor" 
              onClick={() => setCursor('bigWhite')}
              className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${cursor === 'bigWhite' ? 'bg-primary text-white' : 'border-gray-300 hover:bg-gray-100'}`}
            >
              Big White
            </button>
          </div>
        </div>
        
        {/* Hover Highlight */}
        <div className="flex justify-between items-center">
          <label htmlFor="hover-highlight-toggle" className="block text-sm font-medium text-gray-700">Hover Highlight</label>
          <div className="relative inline-block w-10 align-middle select-none">
            <input 
              type="checkbox" 
              id="hover-highlight-toggle" 
              className="sr-only"
              checked={hoverHighlight}
              onChange={(e) => setHoverHighlight(e.target.checked)}
            />
            <div className={`block h-6 w-10 rounded-full cursor-pointer ${hoverHighlight ? 'bg-primary' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${hoverHighlight ? 'translate-x-4' : 'translate-x-0'}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
