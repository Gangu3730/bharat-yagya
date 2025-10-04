import React, { useEffect, useRef, useState } from "react";

// Update with your own video files in /public/videos/
const videos = [
  { src: "/videos/video1.mp4", title: "भारत उत्‍कर्ष महायज्ञ", subtitle: "Seva • Samridhi • Growth" },
  { src: "/videos/video2.mp4", title: "महर्षि महेश योगी", subtitle: "Meditation & Wisdom" },
  { src: "/videos/video3.mp4", title: "Independence Day", subtitle: "I am Totality" },
  { src: "/videos/video4.mp4", title: "यज्ञ भाव", subtitle: "Collective Consciousness" },
  { src: "/videos/video5.mp4", title: "वैदिक धारा", subtitle: "Tradition • Culture • Dharma" },
];

export default function VideoCarouselModern() {
  const trackRef = useRef(null);
  const vidsRef = useRef([]);
  const [perView, setPerView] = useState(1);
  const [page, setPage] = useState(0);
  const [isHover, setIsHover] = useState(false);

  const totalPages = Math.max(1, Math.ceil(videos.length / perView));

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w >= 1024) setPerView(3);
      else if (w >= 768) setPerView(2);
      else setPerView(1);
      setPage(0);
      requestAnimationFrame(() => {
        trackRef.current?.scrollTo({ left: 0, behavior: "instant" });
      });
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (isHover) return;
    const id = setInterval(() => go(1), 7000);
    return () => clearInterval(id);
  }, [page, perView, isHover, totalPages]);

  useEffect(() => {
    const root = trackRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll("[data-card]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = Number(e.target.getAttribute("data-index"));
          const v = vidsRef.current[idx];
          if (!v) return;
          if (!e.isIntersecting) {
            try { v.pause(); } catch {}
          }
        });
      },
      { root, threshold: 0.6 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [perView]);

  const go = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const next = (page + dir + totalPages) % totalPages;
    setPage(next);
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  const goTo = (p) => {
    const el = trackRef.current;
    if (!el) return;
    setPage(p);
    el.scrollTo({ left: p * el.clientWidth, behavior: "smooth" });
  };

  // --- Ancient-inspired palette (soft parchment + warm ochres) ---
  const parchmentBg =
    "bg-[radial-gradient(ellipse_at_top,_rgba(255,239,219,0.9),_rgba(252,228,197,0.9)_45%,_rgba(247,213,170,0.9))]";
  const borderSoft = "border-[#E7BE93]";
  const ringSoft = "ring-1 ring-[#E7BE93]";
  const titleClr = "text-[#9C4C16]";
  const subClr = "text-[#7C5530]";
  const cardShadow = "shadow-[0_10px_36px_rgba(156,76,22,0.14)]";
  const dotActive = "bg-[#C2601D]";
  const dotIdle = "bg-[#EBC7A4] hover:bg-[#DEB087]";
  const arrowBg = "bg-[#FFF5EA]/95 hover:bg-[#FFF0E0]";
  const arrowClr = "text-[#8B4C1C]";

  return (
    <section className={`py-16 ${parchmentBg} relative`}>
      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.06),_transparent_60%)]/30" />

      <div className="container mx-auto px-4 relative">
        {/* Heading with ornamental divider */}
        <div className="text-center">
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${titleClr}`}>
            Featured Reels
          </h2>
          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent via-[#C2601D] to-transparent" />
            <span className="text-[#C2601D]">•</span>
            <span className="h-px w-16 bg-gradient-to-r from-transparent via-[#C2601D] to-transparent" />
          </div>
          <p className={`mt-2 ${subClr}`}>Short clips • Teachings • Experiences</p>
        </div>

        <div
          className="relative mt-10"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {/* soft framed container */}
          <div className={`rounded-3xl border ${borderSoft} bg-[#FFF8EF]/70 backdrop-blur-sm p-4`}>
            <div
              ref={trackRef}
              className="flex gap-6 w-full overflow-hidden scroll-smooth snap-x snap-mandatory"
            >
              {videos.map((v, i) => (
                <article
                  key={i}
                  data-card
                  data-index={i}
                  className={`
                    snap-start shrink-0 rounded-2xl overflow-hidden bg-white/95
                    border ${borderSoft} ${cardShadow} transition
                    min-w-[calc(100%-1.5rem)] md:min-w-[calc(50%-1.5rem)] lg:min-w-[calc(33.333%-1.5rem)]
                    hover:shadow-[0_16px_44px_rgba(156,76,22,0.22)]
                  `}
                >
                  <div className="relative aspect-[9/16] bg-[#FAE2C8]">
                    <video
                      ref={(el) => (vidsRef.current[i] = el)}
                      src={v.src}
                      className="h-full w-full object-cover"
                      controls
                      playsInline
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                      <div className="rounded-xl bg-gradient-to-t from-black/75 via-black/25 to-transparent p-4 ring-1 ring-white/10">
                        <h3 className="text-white text-base font-semibold">{v.title}</h3>
                        <p className="text-white/90 text-xs">{v.subtitle}</p>
                      </div>
                    </div>

                    {/* subtle corner ornaments */}
                    <span className="pointer-events-none absolute left-2 top-2 inline-block h-4 w-4 rounded-sm border-2 border-[#E7BE93]" />
                    <span className="pointer-events-none absolute right-2 top-2 inline-block h-4 w-4 rounded-sm border-2 border-[#E7BE93]" />
                    <span className="pointer-events-none absolute left-2 bottom-2 inline-block h-4 w-4 rounded-sm border-2 border-[#E7BE93]" />
                    <span className="pointer-events-none absolute right-2 bottom-2 inline-block h-4 w-4 rounded-sm border-2 border-[#E7BE93]" />
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* arrows */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className={`hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full ${arrowBg} ${arrowClr} ${ringSoft} shadow-lg transition`}
          >
            ‹
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className={`hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full ${arrowBg} ${arrowClr} ${ringSoft} shadow-lg transition`}
          >
            ›
          </button>
        </div>

        {/* dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to page ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${page === i ? dotActive : dotIdle}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
