import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Main image + clickable thumbnails with prev/next arrows, keyboard and swipe support. */
export function MissionGallery({ images, label }: { images: string[]; label: (i: number) => string }) {
  const [i, setI] = useState(0);
  const n = images.length;
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);
  const [touch, setTouch] = useState<number | null>(null);

  useEffect(() => {
    images.forEach((src) => {
      const im = new Image();
      im.src = src;
    });
  }, [images]);

  return (
    <div>
      <div
        className="group relative aspect-[9/16] max-h-[640px] w-full overflow-hidden rounded-[2rem] bg-secondary shadow-lift"
        onTouchStart={(e) => setTouch(e.touches[0]?.clientX ?? null)}
        onTouchEnd={(e) => {
          if (touch === null) return;
          const dx = (e.changedTouches[0]?.clientX ?? touch) - touch;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          setTouch(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
      >
        {images.map((src, k) => (
          <img
            key={src}
            src={src}
            alt=""
            loading={k === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-lux ${k === i ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
          <button type="button" onClick={() => go(-1)} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full bg-background/80 text-foreground backdrop-blur transition hover:bg-primary hover:text-primary-foreground">
            <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
          </button>
          <span className="rounded-full bg-background/80 px-3 py-1 text-xs tracking-widest text-foreground backdrop-blur">
            {i + 1} / {n}
          </span>
          <button type="button" onClick={() => go(1)} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full bg-background/80 text-foreground backdrop-blur transition hover:bg-primary hover:text-primary-foreground">
            <ChevronRight className="h-5 w-5 rtl:rotate-180" />
          </button>
        </div>
      </div>
      <div className="mt-4 grid gap-2" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
        {images.map((src, k) => (
          <button
            key={src}
            type="button"
            onClick={() => setI(k)}
            aria-label={label(k + 1)}
            aria-current={k === i}
            className={`overflow-hidden rounded-xl ring-2 transition ${k === i ? "ring-primary opacity-100" : "ring-transparent opacity-60 hover:opacity-100"}`}
          >
            <img src={src} alt="" loading="lazy" className="aspect-[9/16] w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
