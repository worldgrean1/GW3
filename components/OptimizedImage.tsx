import React from 'react';
import Image, { ImageProps } from 'next/image';
import { getOptimizedImagePath } from '../utils/code-splitting';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
  imgClassName?: string;
}

/**
 * Wrapper around Next.js Image component that uses optimized image paths
 * and provides fallback handling
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  fallbackSrc,
  alt,
  width,
  height,
  imgClassName,
  className,
  ...props
}) => {
  const [imgSrc, setImgSrc] = React.useState<string>(getOptimizedImagePath(src));
  const [error, setError] = React.useState<boolean>(false);

  // Handle image load error
  const handleError = () => {
    if (!error && fallbackSrc) {
      setError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <div className={className}>
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={imgClassName}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

/**
 * Optimized background image component
 */
export const BackgroundImage: React.FC<{
  src: string;
  fallbackSrc?: string;
  className?: string;
  children?: React.ReactNode;
}> = ({ src, fallbackSrc, className, children }) => {
  const [bgSrc, setBgSrc] = React.useState<string>(getOptimizedImagePath(src));
  const [error, setError] = React.useState<boolean>(false);
  
  // Handle image load error
  React.useEffect(() => {
    if (error || !fallbackSrc) return;
    
    const img = new window.Image();
    img.src = bgSrc;
    
    img.onerror = () => {
      setError(true);
      setBgSrc(fallbackSrc);
    };
  }, [bgSrc, error, fallbackSrc]);
  
  return (
    <div 
      className={className}
      style={{ backgroundImage: `url(${bgSrc})` }}
    >
      {children}
    </div>
  );
}; 