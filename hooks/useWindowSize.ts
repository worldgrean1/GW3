import { useState, useEffect } from 'react'

interface WindowSize {
  width: number
  height: number
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export function useWindowSize(): WindowSize {
  // Default to desktop size during SSR
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 1200,
    height: 800,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  })

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      const width = window.innerWidth
      setWindowSize({
        width,
        height: window.innerHeight,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      })
    }
    
    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Call handler right away so state gets updated with initial window size
    handleResize()
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures effect runs only on mount and unmount

  return windowSize
} 