import React from 'react';
import { createDynamicComponent, createLazyComponent, getOptimizedImagePath } from '../utils/code-splitting';

// Example of a loading placeholder
const LoadingPlaceholder = () => (
  <div className="w-full h-64 bg-gray-200 animate-pulse rounded-md"></div>
);

// Example of lazy loading a heavy component
const HeavyComponent = createDynamicComponent(
  () => import('../components/SomeHeavyComponent'),
  <LoadingPlaceholder />
);

// Example of lazy loading a component only when it enters viewport
const VisibilityLoadedComponent = createLazyComponent(
  () => import('../components/AnotherHeavyComponent'),
  { loadingComponent: <LoadingPlaceholder /> }
);

export default function LazyComponentExample() {
  // Example of using optimized image path
  const imagePath = getOptimizedImagePath('/images/example.jpg');
  
  return (
    <div className="space-y-8 p-4">
      <h2 className="text-2xl font-bold">Code Splitting Examples</h2>
      
      <section>
        <h3 className="text-xl font-semibold mb-4">Dynamic Component Loading</h3>
        <HeavyComponent />
      </section>
      
      <section>
        <h3 className="text-xl font-semibold mb-4">Viewport-based Loading</h3>
        <VisibilityLoadedComponent />
      </section>
      
      <section>
        <h3 className="text-xl font-semibold mb-4">Optimized Image</h3>
        <div className="relative h-64">
          <img 
            src={imagePath} 
            alt="Optimized image example" 
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </section>
    </div>
  );
} 