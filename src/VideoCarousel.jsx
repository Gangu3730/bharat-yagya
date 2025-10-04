import React, { useEffect, useMemo, useRef, useState } from "react";

/* ------- your videos (put files in /public/videos) ------- */
const videos = [
  { src: "/videos/video1.mp4"},
  { src: "/videos/video2.mp4"},
  { src: "/videos/video3.mp4"},
  { src: "/videos/video4.mp4"},
  { src: "/videos/video5.mp4"},
  { src: "/videos/video6.mp4"},
];

/* ---------- small hook: drag + inertia scroll ---------- */
function useDragScroll(ref) {
  const dragging = useRef(false);
  const last = useRef({ x: 0, t: 0, left: 0 });
  const vel = useRef(0);
  const raf = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onDown = (e) => {
      dragging.current = true;
      el.classList.add("cursor-grabbing");
      cancelAnimationFrame(raf.current);
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      last.current = { x, t: performance.now(), left: el.scrollLeft };
    };

    const onMove = (e) => {
      if (!dragging.current) return;
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      const now = performance.now();
      const dx = x - last.current.x;
      el.scrollLeft = last.current.left - dx;
      vel.current = dx / (now - last.current.t); // px/ms
      last.current = { x, t: now, left: el.scrollLeft };
    };

    const onUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      el.classList.remove("cursor-grabbing");
      // inertia
      const decay = 0.94;
      const step = () => {
        if (Math.abs(vel.current) < 0.02) return;
        el.scrollLeft -= vel.current * 16; // 60fps ≈ 16ms
        vel.current *= decay;
        raf.current = requestAnimationFrame(step);
      };
      raf.current = requestAnimationFrame(step);
    };

    el.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    el.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp, { passive: true });

    // horizontal wheel support (shift/trackpads)
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      cancelAnimationFrame(raf.current);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("touchstart", onDown);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
      el.removeEventListener("wheel", onWheel);
    };
  }, [ref]);
}

/* -------------------- component -------------------- */
export default function VideoCarousel() {
  const trackRef = useRef(null);
  useDragScroll(trackRef);

  const [hover, setHover] = useState(false);
  const [perView, setPerView] = useState(3);
  const pages = useMemo(() => Math.max(1, Math.ceil(videos.length / perView)), [perView]);
  const [page, setPage] = useState(0);

  // responsive items per view
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setPerView(w >= 1024 ? 3 : w >= 768 ? 2 : 1);
      setPage(0);
      trackRef.current?.scrollTo({ left: 0, behavior: "instant" });
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // auto-page scroll (pause on hover)
  useEffect(() => {
    if (hover) return;
    const id = setInterval(() => goto(page + 1), 6000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pages, hover]);

  const goto = (p) => {
    const el = trackRef.current;
    if (!el) return;
    const next = ((p % pages) + pages) % pages;
    setPage(next);
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  // theme bits (match your site)
  const bg = "bg-[#FBEEDC]";
  const cardBorder = "border-[#E8C9A8]";
  const dotActive = "bg-[#D56A1C]";
  const dotIdle = "bg-[#EED3B8] hover:bg-[#E3BD95]";
  const arrowBg = "bg-white/90";
  const arrowClr = "text-[#8B4C1C]";

  return (
    <section className={`${bg} py-12`}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#9C4C16]">
            Featured Reels
          </h2>
          <p className="mt-2 text-sm text-[#7C5530]">Drag • Snap • Smooth</p>
        </div>

        <div
          className="relative mt-8"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* viewport */}
          <div
            ref={trackRef}
            className="
              relative flex gap-5 overflow-hidden
              snap-x snap-mandatory scroll-smooth
              rounded-2xl border border-[#EAD6BF] bg-white/70 backdrop-blur p-3
              cursor-grab
            "
          >
            {videos.map((v, i) => (
              <article
                key={i}
                className="
                  snap-start shrink-0 basis-full md:basis-[calc(50%-10px)] lg:basis-[calc(33.333%-14px)]
                  rounded-xl overflow-hidden border
                  transition-shadow duration-300
                "
              >
                <div className={`relative aspect-[2/3] sm:max-h-[360px] md:max-h-[380px] lg:max-h-[400px] mx-auto border ${cardBorder} bg-[#FFF9F2]`}>
                  <video
                    src={v.src}
                    className="h-full w-full object-cover"
                    playsInline
                    controls
                    onPlay={(e) => {
                      // pause other playing videos
                      document
                        .querySelectorAll("video")
                        .forEach((vd) => vd !== e.currentTarget && vd.pause());
                    }}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3">
                    <div className="rounded-lg bg-gradient-to-t from-black/70 via-black/20 to-transparent p-3">
                      <h3 className="text-white text-[15px] font-semibold">{v.title}</h3>
                      <p className="text-white/90 text-[12px]">{v.sub}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* arrows */}
          <button
            aria-label="Prev"
            onClick={() => goto(page - 1)}
            className={`hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 ${arrowBg} ${arrowClr} items-center justify-center rounded-full shadow-md`}
          >
            ‹
          </button>
          <button
            aria-label="Next"
            onClick={() => goto(page + 1)}
            className={`hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 ${arrowBg} ${arrowClr} items-center justify-center rounded-full shadow-md`}
          >
            ›
          </button>
        </div>

        {/* dots */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goto(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${i === page ? dotActive : dotIdle}`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
