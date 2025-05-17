# Code Splitting Utilities

This document describes the code splitting utilities available in the project for optimizing performance and loading times.

## Overview

Code splitting is a technique that allows you to split your code into various bundles which can then be loaded on demand. This can significantly improve the initial loading performance of your application by reducing the size of the initial bundle.

The utilities in this project provide easy-to-use functions for implementing code splitting in a Next.js application.

## Available Utilities

### 1. `createDynamicComponent`

Dynamically imports a component with a custom loading state.

```tsx
import { createDynamicComponent } from '@/utils/code-splitting';

const LoadingPlaceholder = () => <div className="loading-spinner" />;

const MyHeavyComponent = createDynamicComponent(
  () => import('@/components/HeavyComponent'),
  <LoadingPlaceholder />
);

// Use it just like a regular component
function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
      <MyHeavyComponent />
    </div>
  );
}
```

### 2. `lazyImport`

Optimizes imports for components used conditionally, helping with tree-shaking.

```tsx
import { lazyImport } from '@/utils/code-splitting';

// Instead of:
// import { HeavyComponent } from './components';

// Use:
const HeavyComponent = lazyImport(
  () => import('./components').then(mod => mod.HeavyComponent)
);
```

### 3. `createLazyComponent`

Creates a dynamically imported component with code splitting that only loads when needed.

```tsx
import { createLazyComponent } from '@/utils/code-splitting';

const LoadingPlaceholder = () => <div className="loading-spinner" />;

const LazyComponent = createLazyComponent(
  () => import('@/components/SomeComponent'),
  { 
    loadingComponent: <LoadingPlaceholder />,
    ssr: false // Disable server-side rendering
  }
);
```

### 4. `getOptimizedImagePath`

Utility to optimize image paths to use optimized versions if available.

```tsx
import { getOptimizedImagePath } from '@/utils/code-splitting';

function MyComponent() {
  const imagePath = getOptimizedImagePath('/images/example.jpg');
  
  return (
    <div>
      <img src={imagePath} alt="Example" />
    </div>
  );
}
```

## Best Practices

1. **Use code splitting for large components** that aren't needed immediately on page load.
2. **Provide fallback UI** to prevent layout shifts and improve user experience during loading.
3. **Only split code at logical boundaries** where it makes sense for your application flow.
4. **Monitor performance impact** of code splitting using tools like Lighthouse or the Next.js bundle analyzer.

## Example

See the complete example in `examples/LazyComponentExample.tsx` which demonstrates all the utilities in action. 