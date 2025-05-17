# Bundle Analysis Guide

This document explains how to analyze your application's bundle size and optimize it.

## Running the Bundle Analyzer

The project is configured with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) to help visualize the size of your JavaScript bundles.

### Steps to Analyze:

1. Run the analyze script:
   ```bash
   npm run analyze
   ```

2. This will generate an interactive visualization of the bundle sizes in your default browser.

3. The visualization will show:
   - The total size of your bundle
   - Individual chunk sizes
   - The composition of each chunk (which modules it contains)

## Interpreting Results

The bundle analyzer presents a treemap visualization where:
- Each rectangle represents a module or group of modules
- The size of the rectangle corresponds to the file size
- The color can represent either file size (default) or a custom metric

### What to Look For:

1. **Large Chunks**: Identify unexpectedly large bundles that could be split or optimized
2. **Duplicate Modules**: Check for the same module appearing in multiple chunks
3. **Unused Dependencies**: Identify large dependencies that might not be necessary

## Optimization Strategies

Based on the analysis, consider these optimization techniques:

1. **Code Splitting**:
   - Use the `code-splitting.ts` utilities to dynamically import components
   - Split routes using Next.js's built-in page-based routing

2. **Tree Shaking**:
   - Import only what you need from libraries (e.g., `import { Button } from 'ui-lib'` instead of `import UILib from 'ui-lib'`)
   - Use the `lazyImport` utility for conditional imports

3. **Reducing Bundle Size**:
   - Remove unused dependencies
   - Consider lighter alternatives for heavy libraries
   - Use the `optimization.splitChunks` configuration in `next.config.mjs`

4. **Image Optimization**:
   - Use the image optimization script (`npm run optimize-images`)
   - Utilize Next.js Image component with proper sizing

## Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| Large vendor bundle | Split vendor chunks more granularly in webpack config |
| Duplicate modules | Update import statements or resolve alias conflicts |
| Large polyfills | Target modern browsers or use conditional loading |
| Large images | Run the image optimization script |

## Further Resources

- [Next.js Performance Optimization](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Webpack Documentation](https://webpack.js.org/guides/code-splitting/)
- [Web.dev Guide to Performance](https://web.dev/fast/) 