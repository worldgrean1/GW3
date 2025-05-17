# Optimization Utilities

This document provides an overview of the optimization utilities available in the project and how to use them effectively.

## Table of Contents

1. [Code Splitting](#code-splitting)
2. [Image Optimization](#image-optimization)
3. [Responsive Design](#responsive-design)
4. [Bundle Analyzer](#bundle-analyzer)
5. [Premium Components](#premium-components)

## Code Splitting

Code splitting allows you to split your JavaScript into smaller chunks that can be loaded on demand, improving initial page load time.

### Available Utilities

- `createDynamicComponent`: Creates a dynamically imported component with custom loading state
- `lazyImport`: Optimizes imports for components used conditionally
- `createLazyComponent`: Creates a dynamically loaded component with viewport-based loading
- `getOptimizedImagePath`: Returns the path to an optimized image if available

### Examples

See the [Code Splitting Documentation](./code-splitting.md) and the [LazyComponentExample](../examples/LazyComponentExample.tsx) for detailed usage examples.

## Image Optimization

The project includes several utilities to optimize images:

1. **Optimized Images Script**

   Run the image optimization script to process all images in the `/images` directory:

   ```bash
   npm run optimize-images
   ```

2. **OptimizedImage Component**

   Use the `OptimizedImage` component for automatic image optimization:

   ```tsx
   import { OptimizedImage } from '../components/OptimizedImage';

   <OptimizedImage 
     src="/images/example.jpg" 
     alt="Example" 
     width={800} 
     height={600}
     fallbackSrc="/images/placeholder.jpg"
   />
   ```

3. **BackgroundImage Component**

   For background images with optimization:

   ```tsx
   import { BackgroundImage } from '../components/OptimizedImage';

   <BackgroundImage 
     src="/images/background.jpg"
     fallbackSrc="/images/default-bg.jpg" 
     className="h-64 bg-cover bg-center"
   >
     <div>Content over background</div>
   </BackgroundImage>
   ```

## Responsive Design

The project includes utilities for responsive design in `utils/responsive.ts`:

### Available Utilities

- `useBreakpoint`: Hook to detect current breakpoint
- `useMediaQuery`: Hook to check if screen is above a specific breakpoint
- `useResponsiveValue`: Hook to get value for current breakpoint
- `ResponsiveValue`: Utility type for defining responsive props

### Example

```tsx
import { useResponsiveValue, ResponsiveValue } from '../utils/responsive';

interface Props {
  responsive: ResponsiveValue<{
    columns: 1 | 2 | 3 | 4;
    showDetails: boolean;
  }>;
}

function MyComponent({ responsive }) {
  const { columns, showDetails } = useResponsiveValue(responsive);
  
  return (
    <div className={`grid grid-cols-${columns}`}>
      {/* Component content */}
      {showDetails && <div>Additional details</div>}
    </div>
  );
}

// Usage
<MyComponent 
  responsive={{
    base: { columns: 1, showDetails: false },
    md: { columns: 2, showDetails: true },
    lg: { columns: 4, showDetails: true },
  }}
/>
```

See the [ResponsiveExample](../examples/ResponsiveExample.tsx) for a complete example.

## Bundle Analyzer

The project includes the Next.js Bundle Analyzer to help you identify and optimize large bundles:

```bash
npm run analyze
```

This will generate an interactive visualization of your bundle sizes in your browser.

See the [Bundle Analysis Guide](./bundle-analysis.md) for more information on interpreting results and optimization strategies.

## Premium Components

The project includes premium interactive components that can benefit significantly from optimization due to their size and complexity.

### Available Premium Components

The `/components/premium/` directory contains several high-fidelity, interactive components:

- `PremiumInteractiveDemo`: A large, complex interactive visualization (85KB)
- `PremiumBackground` and `TealEnergyBackground`: Premium visual effects
- `IntelligentEnergyHero`: Complex hero section with animations
- Various supporting components for premium sections

### Optimization Recommendations

Due to their size, these premium components are ideal candidates for optimization:

1. **Lazy Loading**

   Use the code splitting utilities to defer loading premium components until needed:

   ```tsx
   import { createLazyComponent } from '../utils/code-splitting';

   const LazyPremiumInteractiveDemo = createLazyComponent(
     () => import('../components/premium/PremiumInteractiveDemo'),
     {
       loadingComponent: <PremiumLoadingPlaceholder />,
       ssr: false
     }
   );
   ```

2. **Viewport-Based Loading**

   Only load premium components when they enter the viewport:

   ```tsx
   function PremiumSection() {
     const { ref, isInView } = useElementInView();
     
     return (
       <div ref={ref}>
         {isInView && <PremiumInteractiveDemo />}
       </div>
     );
   }
   ```

3. **Component Splitting**

   Consider breaking down the largest premium components (like `PremiumInteractiveDemo.tsx`) into smaller, more manageable pieces that can be loaded independently.

4. **Deferred Animation Initialization**

   Initialize complex animations only after the component is visible:

   ```tsx
   const PremiumOptimized = () => {
     const [animationsInitialized, setAnimationsInitialized] = useState(false);
     const { ref, isInView } = useElementInView();
     
     useEffect(() => {
       if (isInView && !animationsInitialized) {
         setAnimationsInitialized(true);
       }
     }, [isInView]);
     
     return (
       <div ref={ref}>
         <PremiumBackground animated={animationsInitialized} />
       </div>
     );
   };
   ```

## Best Practices

1. **Use Code Splitting for Large Components**
   - Only dynamically import components that are large or not immediately needed

2. **Optimize Images**
   - Always use the OptimizedImage component for images
   - Run the optimize-images script before deployment

3. **Responsive Design**
   - Use the responsive utilities to create adaptable UIs
   - Test your application at different viewport sizes

4. **Monitor Bundle Size**
   - Regularly run the bundle analyzer to identify optimization opportunities
   - Keep third-party dependencies to a minimum
   - Use tree-shaking-friendly imports 