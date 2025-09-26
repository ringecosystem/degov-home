'use client';

import { forwardRef, useCallback, useState, type CSSProperties } from 'react';

import Image, { type ImageProps } from 'next/image';

import { cn } from '@/lib/utils';

const DEFAULT_BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjMUYxRjFGIi8+PC9zdmc+';

type LazyImageProps = ImageProps & {
  /**
   * Optional class name for the wrapping element.
   */
  wrapperClassName?: string;
  /**
   * Optional styles for the wrapping element.
   */
  wrapperStyle?: CSSProperties;
  /**
   * Toggle the animated loading overlay shown while the image is loading.
   */
  showLoadingIndicator?: boolean;
};

const LazyImage = forwardRef<HTMLImageElement, LazyImageProps>(function LazyImage(props, ref) {
  const {
    className,
    wrapperClassName,
    showLoadingIndicator = true,
    wrapperStyle,
    loading = 'lazy',
    placeholder,
    blurDataURL,
    onLoad,
    priority,
    ...rest
  } = props;

  const [isLoaded, setIsLoaded] = useState(false);

  // Ensure an alt attribute is always provided, even if it's an empty string.
  const { alt = '', ...imageProps } = rest;

  const handleLoad = useCallback<NonNullable<ImageProps['onLoad']>>(
    (event) => {
      setIsLoaded(true);
      onLoad?.(event);
    },
    [onLoad]
  );

  const effectivePlaceholder = placeholder ?? 'blur';
  const effectiveBlurDataURL =
    effectivePlaceholder === 'blur' ? (blurDataURL ?? DEFAULT_BLUR_DATA_URL) : blurDataURL;
  const effectiveLoading = priority ? undefined : (loading ?? 'lazy');

  return (
    <div
      className={cn(
        'relative inline-block overflow-hidden',
        showLoadingIndicator ? 'bg-[#1f1f1f]' : null,
        wrapperClassName
      )}
      style={wrapperStyle}
    >
      {showLoadingIndicator ? (
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 animate-pulse bg-[#272727] transition-opacity duration-300 ease-out',
            isLoaded && 'opacity-0'
          )}
        />
      ) : null}
      <Image
        ref={ref}
        {...imageProps}
        alt={alt}
        onLoad={handleLoad}
        className={cn(
          'transition-opacity duration-300 ease-out',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        placeholder={effectivePlaceholder}
        blurDataURL={effectiveBlurDataURL}
        {...(effectiveLoading ? { loading: effectiveLoading } : {})}
        priority={priority}
      />
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

export { LazyImage };
export type { LazyImageProps };
