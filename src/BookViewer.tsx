import React, { forwardRef, useRef, useEffect, useState, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';

// ── Each page must accept a forwarded ref for react-pageflip ──
const FlipPage = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; pageNum: number; total: number; title: string; isCover?: boolean }
>(({ children, pageNum, total, title, isCover }, ref) => (
  <div ref={ref} className={`fp-page ${isCover ? 'fp-cover' : ''}`}>
    {!isCover && (
      <div className="fp-header">
        <span className="fp-header-title">{title}</span>
        <span className="fp-header-num">{pageNum} / {total}</span>
      </div>
    )}
    <div className="fp-body">{children}</div>
    {!isCover && <div className="fp-footer-num">{pageNum}</div>}
  </div>
));
FlipPage.displayName = 'FlipPage';

// ── Public interface ──
export interface BookPage {
  id: string;
  title: string;
  content: React.ReactNode;
  isCover?: boolean;
}

interface BookViewerProps {
  pages: BookPage[];
  activePageId: string;
  onPageChange: (id: string) => void;
}

export function BookViewer({ pages, activePageId, onPageChange }: BookViewerProps) {
  const bookRef = useRef<any>(null);
  const [cur, setCur] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const total = pages.length;

  // Responsive dims
  const calcDims = () => {
    const mobile = window.innerWidth < 768;
    const h = Math.round(window.innerHeight * 0.80);
    const w = mobile
      ? Math.round(window.innerWidth * 0.96)
      : Math.round(Math.min(window.innerWidth * 0.44, 580));
    return { mobile, h, w };
  };
  const [dims, setDims] = useState(calcDims);

  useEffect(() => {
    const onResize = () => {
      const d = calcDims();
      setDims(d);
      setIsMobile(d.mobile);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Jump to page when activePageId changes from sidebar
  useEffect(() => {
    const idx = pages.findIndex(p => p.id === activePageId);
    if (idx !== -1 && bookRef.current) {
      try { bookRef.current.pageFlip().flip(idx, 'top'); } catch {}
    }
  }, [activePageId, pages]);

  const handleFlip = useCallback((e: any) => {
    const idx: number = e.data;
    setCur(idx);
    if (pages[idx]) onPageChange(pages[idx].id);
  }, [pages, onPageChange]);

  const goNext = () => bookRef.current?.pageFlip().flipNext();
  const goPrev = () => bookRef.current?.pageFlip().flipPrev();

  return (
    <div className="bv-wrapper">
      {/* Book scene */}
      <div className="bv-scene">
        <HTMLFlipBook
          ref={bookRef}
          width={dims.w}
          height={dims.h}
          size="fixed"
          minWidth={260}
          maxWidth={680}
          minHeight={380}
          maxHeight={1100}
          usePortrait={isMobile}
          startPage={0}
          drawShadow={true}
          flippingTime={700}
          useMouseEvents={true}
          showCover={true}
          mobileScrollSupport={true}
          clickEventForward={false}
          onFlip={handleFlip}
          className="bv-flipbook"
          style={{}}
          startZIndex={10}
          autoSize={false}
          maxShadowOpacity={0.5}
          showPageCorners={true}
          disableFlipByClick={true}
          swipeDistance={30}
        >
          {pages.map((page, i) => (
            <FlipPage
              key={page.id}
              pageNum={i + 1}
              total={total}
              title={page.title}
              isCover={page.isCover}
            >
              {page.content}
            </FlipPage>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Navigation bar */}
      <div className="bv-nav">
        <button className="bv-btn" onClick={goPrev} disabled={cur === 0}>
          ‹ السابق
        </button>
        <span className="bv-indicator">
          {cur + 1} / {total}
        </span>
        <button className="bv-btn" onClick={goNext} disabled={cur >= total - 1}>
          التالي ›
        </button>
      </div>
    </div>
  );
}
