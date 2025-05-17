import dynamic from 'next/dynamic';
import React, { ComponentType } from 'react';

/**
 * Creates a dynamically imported component with custom loading state
 * 
 * @param importFn Function that imports the component using dynamic import
 * @param loadingComponent Optional component to show while loading
 * @returns Dynamically loaded component
 */
export function createDynamicComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  loadingComponent?: React.ReactElement
) {
  return dynamic(importFn, {
    loading: () => loadingComponent || null,
    ssr: false,
  });
}

/**
 * Utility to optimize imports for components used conditionally
 * (Helps with tree-shaking)
 * 
 * @example
 * // Instead of:
 * import { HeavyComponent } from './components';
 * 
 * // Use:
 * const HeavyComponent = lazyImport(() => import('./components').then(mod => mod.HeavyComponent));
 */
export function lazyImport<T extends ComponentType<any>>(
  importFn: () => Promise<T>
) {
  return dynamic(() => importFn(), {
    ssr: false,
  });
}

/**
 * Creates a dynamically imported component with code splitting
 * that only loads when the component enters the viewport
 * 
 * @param importFn Function that imports the component
 * @param options Additional options
 * @returns Dynamically loaded component
 */
export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: {
    loadingComponent?: React.ReactElement,
    ssr?: boolean,
  } = {}
) {
  const { loadingComponent, ssr = false } = options;
  
  return dynamic(importFn, {
    loading: () => loadingComponent || null,
    ssr,
  });
}

/**
 * Utility to optimize image paths to use optimized versions if available
 * 
 * @param path Original image path 
 * @returns Optimized image path if available
 */
export function getOptimizedImagePath(path: string): string {
  if (typeof window === 'undefined') return path;
  
  // Skip if already pointing to optimized path
  if (path.includes('/optimized/')) return path;
  
  // Get filename from path
  const fileName = path.split('/').pop();
  if (!fileName) return path;
  
  // Check if path starts with /images
  if (!path.startsWith('/images/')) return path;
  
  return `/images/optimized/${fileName}`;
} 