import React, { useState } from 'react';
import { Maximize2, ImageOff } from 'lucide-react';

interface PortfolioImageProps {
  src: string;
  alt: string;
  caption?: string;
  onExpand?: (src: string, alt: string, caption?: string) => void;
  className?: string;
  aspectClass?: string;
}

export const PortfolioImage: React.FC<PortfolioImageProps> = ({
  src,
  alt,
  caption,
  onExpand,
  className = '',
  aspectClass = '',
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className={`my-6 group ${className}`}>
      <div
        onClick={() => !hasError && onExpand && onExpand(src, alt, caption)}
        className={`relative overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-150 ${
          !hasError && onExpand ? 'cursor-zoom-in hover:border-blue-600/40 hover:shadow-md' : ''
        } ${aspectClass}`}
      >
        {!hasError ? (
          <>
            <img
              src={src}
              alt={alt}
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={() => setHasError(true)}
              className="w-full h-auto object-contain max-h-[620px] mx-auto block"
            />
            {onExpand && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onExpand(src, alt, caption);
                }}
                aria-label="Phóng to hình ảnh"
                className="absolute top-3 right-3 px-2.5 py-1.5 rounded-lg bg-slate-900/80 text-white text-xs font-medium flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 hover:bg-slate-900 whitespace-nowrap shrink-0"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Xem rõ ảnh</span>
              </button>
            )}
          </>
        ) : (
          <div className="p-10 bg-slate-50 flex flex-col items-center justify-center text-center min-h-[220px]">
            <ImageOff className="w-8 h-8 text-slate-400 mb-2" />
            <p className="text-sm font-medium text-slate-700">{alt}</p>
            {caption && <p className="text-xs text-slate-500 mt-1">{caption}</p>}
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2.5 text-center text-xs text-slate-500 leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
