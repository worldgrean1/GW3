import React, { useState, useEffect } from 'react';
import { createLazyComponent } from '../utils/code-splitting';
import { useBreakpoint } from '../utils/responsive';

// Loading placeholder for premium components
const PremiumLoadingPlaceholder = () => (
  <div className="w-full h-[600px] bg-gradient-to-b from-slate-100 to-slate-200 animate-pulse rounded-lg flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-slate-500 font-medium">Loading premium experience...</p>
    </div>
  </div>
);

// Lazy load premium components only when needed
const LazyPremiumInteractiveDemo = createLazyComponent(
  () => import('../components/premium/PremiumInteractiveDemo'),
  {
    loadingComponent: <PremiumLoadingPlaceholder />,
    ssr: false
  }
);

const LazyPremiumBackground = createLazyComponent(
  () => import('../components/premium/PremiumBackground'),
  {
    loadingComponent: <div className="w-full h-64 bg-slate-100"></div>,
    ssr: false
  }
);

export default function LazyPremiumExample() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [showPremiumDemo, setShowPremiumDemo] = useState(false);
  const breakpoint = useBreakpoint();
  
  // Update window dimensions on resize
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="p-4 space-y-8">
      <h2 className="text-2xl font-bold">Premium Components (Optimized)</h2>
      <p className="text-gray-600">
        This example demonstrates how to lazy load large premium components 
        to improve initial page load performance.
      </p>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Current breakpoint: {breakpoint}</h3>
        
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => setShowPremiumDemo(prev => !prev)}
        >
          {showPremiumDemo ? "Hide" : "Load"} Premium Interactive Demo
        </button>
      </div>
      
      {/* Only render premium component when requested */}
      {showPremiumDemo && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <LazyPremiumInteractiveDemo 
            showInfoPanel={showInfoPanel}
            setShowInfoPanel={setShowInfoPanel}
            windowWidth={windowDimensions.width}
            windowHeight={windowDimensions.height}
          />
        </div>
      )}
      
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Premium Background (Lazy Loaded)</h3>
        <LazyPremiumBackground />
      </div>
      
      <div className="bg-blue-50 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Implementation Notes</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>All premium components are lazy loaded using <code>createLazyComponent</code></li>
          <li>The interactive demo is only loaded when explicitly requested</li>
          <li>Loading states provide visual feedback during component loading</li>
          <li>Window dimensions are tracked to properly size responsive components</li>
        </ul>
      </div>
    </div>
  );
} 