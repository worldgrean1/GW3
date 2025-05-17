import { useEffect, useState } from 'react';

// Define standard breakpoints
export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

type Breakpoint = keyof typeof breakpoints;

/**
 * Hook to detect current breakpoint
 * @returns Current breakpoint
 */
export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs');

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width >= breakpoints['2xl']) {
        setBreakpoint('2xl');
      } else if (width >= breakpoints.xl) {
        setBreakpoint('xl');
      } else if (width >= breakpoints.lg) {
        setBreakpoint('lg');
      } else if (width >= breakpoints.md) {
        setBreakpoint('md');
      } else if (width >= breakpoints.sm) {
        setBreakpoint('sm');
      } else {
        setBreakpoint('xs');
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}

/**
 * Hook to check if screen is above a specific breakpoint
 * @param breakpoint Breakpoint to check
 * @returns True if screen width is greater than or equal to breakpoint
 */
export function useMediaQuery(breakpoint: Breakpoint): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(`(min-width: ${breakpoints[breakpoint]}px)`);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Set initial value
    setMatches(mediaQuery.matches);

    // Modern browsers
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    // Older browsers
    else if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [breakpoint]);

  return matches;
}

/**
 * Utility type to define props for different breakpoints
 * @example
 * type ButtonProps = {
 *   responsive: ResponsiveValue<{
 *     size: 'sm' | 'md' | 'lg',
 *     fullWidth: boolean
 *   }>
 * }
 */
export type ResponsiveValue<T> = {
  base: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
};

/**
 * Hook to get value for current breakpoint
 * @param values Responsive values for different breakpoints
 * @returns Value for current breakpoint
 */
export function useResponsiveValue<T>(values: ResponsiveValue<T>): T {
  const breakpoint = useBreakpoint();
  
  // Get the appropriate value based on current breakpoint
  // Try the current breakpoint first, then work backwards to find the closest defined value
  if (breakpoint === '2xl' && values['2xl'] !== undefined) return values['2xl'];
  if ((breakpoint === '2xl' || breakpoint === 'xl') && values.xl !== undefined) return values.xl;
  if ((breakpoint === '2xl' || breakpoint === 'xl' || breakpoint === 'lg') && values.lg !== undefined) return values.lg;
  if ((breakpoint === '2xl' || breakpoint === 'xl' || breakpoint === 'lg' || breakpoint === 'md') && values.md !== undefined) return values.md;
  if ((breakpoint === '2xl' || breakpoint === 'xl' || breakpoint === 'lg' || breakpoint === 'md' || breakpoint === 'sm') && values.sm !== undefined) return values.sm;
  
  // Fallback to base value
  return values.base;
} 