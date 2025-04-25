import { useAccessibilityStore } from '@/hooks/use-accessibility-store';

export default function ColorTab() {
  const {
    darkContrast,
    lightContrast,
    highContrast,
    highSaturation,
    lowSaturation,
    monochrome,
    setDarkContrast,
    setLightContrast,
    setHighContrast,
    setHighSaturation,
    setLowSaturation,
    setMonochrome,
  } = useAccessibilityStore();
  
  return (
    <div id="color-tab-panel" className="p-4 space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Color Adjustments</h3>
        
        {/* Dark Contrast */}
        <div className="flex justify-between items-center">
          <label htmlFor="dark-contrast-toggle" className="block text-sm font-medium text-gray-700">Dark Contrast</label>
          <div className="relative inline-block w-10 align-middle select-none">
            <input 
              type="checkbox" 
              id="dark-contrast-toggle" 
              className="sr-only"
              checked={darkContrast}
              onChange={(e) => setDarkContrast(e.target.checked)}
            />
            <div className={`block h-6 w-10 rounded-full cursor-pointer ${darkContrast ? 'bg-primary' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${darkContrast ? 'translate-x-4' : 'translate-x-0'}`}></div>
          </div>
        </div>
        
        {/* Light Contrast */}
        <div className="flex justify-between items-center">
          <label htmlFor="light-contrast-toggle" className="block text-sm font-medium text-gray-700">Light Contrast</label>
          <div className="relative inline-block w-10 align-middle select-none">
            <input 
              type="checkbox" 
              id="light-contrast-toggle" 
              className="sr-only"
              checked={lightContrast}
              onChange={(e) => setLightContrast(e.target.checked)}
            />
            <div className={`block h-6 w-10 rounded-full cursor-pointer ${lightContrast ? 'bg-primary' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${lightContrast ? 'translate-x-4' : 'translate-x-0'}`}></div>
          </div>
        </div>
        
        {/* High Contrast */}
        <div className="flex justify-between items-center">
          <label htmlFor="high-contrast-toggle" className="block text-sm font-medium text-gray-700">High Contrast</label>
          <div className="relative inline-block w-10 align-middle select-none">
            <input 
              type="checkbox" 
              id="high-contrast-toggle" 
              className="sr-only"
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
            />
            <div className={`block h-6 w-10 rounded-full cursor-pointer ${highContrast ? 'bg-primary' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${highContrast ? 'translate-x-4' : 'translate-x-0'}`}></div>
          </div>
        </div>
        
        {/* High Saturation */}
        <div className="flex justify-between items-center">
          <label htmlFor="high-saturation-toggle" className="block text-sm font-medium text-gray-700">High Saturation</label>
          <div className="relative inline-block w-10 align-middle select-none">
            <input 
              type="checkbox" 
              id="high-saturation-toggle" 
              className="sr-only"
              checked={highSaturation}
              onChange={(e) => setHighSaturation(e.target.checked)}
            />
            <div className={`block h-6 w-10 rounded-full cursor-pointer ${highSaturation ? 'bg-primary' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${highSaturation ? 'translate-x-4' : 'translate-x-0'}`}></div>
          </div>
        </div>
        
        {/* Low Saturation */}
        <div className="flex justify-between items-center">
          <label htmlFor="low-saturation-toggle" className="block text-sm font-medium text-gray-700">Low Saturation</label>
          <div className="relative inline-block w-10 align-middle select-none">
            <input 
              type="checkbox" 
              id="low-saturation-toggle" 
              className="sr-only"
              checked={lowSaturation}
              onChange={(e) => setLowSaturation(e.target.checked)}
            />
            <div className={`block h-6 w-10 rounded-full cursor-pointer ${lowSaturation ? 'bg-primary' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${lowSaturation ? 'translate-x-4' : 'translate-x-0'}`}></div>
          </div>
        </div>
        
        {/* Monochrome */}
        <div className="flex justify-between items-center">
          <label htmlFor="monochrome-toggle" className="block text-sm font-medium text-gray-700">Monochrome</label>
          <div className="relative inline-block w-10 align-middle select-none">
            <input 
              type="checkbox" 
              id="monochrome-toggle" 
              className="sr-only"
              checked={monochrome}
              onChange={(e) => setMonochrome(e.target.checked)}
            />
            <div className={`block h-6 w-10 rounded-full cursor-pointer ${monochrome ? 'bg-primary' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${monochrome ? 'translate-x-4' : 'translate-x-0'}`}></div>
          </div>
        </div>
        
        {/* Color Examples */}
        <div className="mt-6 p-3 bg-gray-50 rounded-md border border-gray-200">
          <p className="text-sm text-gray-700 mb-2">Color Mode Preview:</p>
          <div className="flex flex-wrap gap-2">
            <div className="w-8 h-8 bg-primary rounded"></div>
            <div className="w-8 h-8 bg-green-500 rounded"></div>
            <div className="w-8 h-8 bg-emerald-500 rounded"></div>
            <div className="w-8 h-8 bg-amber-500 rounded"></div>
            <div className="w-8 h-8 bg-rose-500 rounded"></div>
            <div className="w-8 h-8 bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
