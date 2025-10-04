import React, { useState, useEffect } from "react";

const videos = [
  {
    src: "/videos/video1.mp4",
    title: "भारत उत्‍कर्ष महायज्ञ",
    subtitle: "Seva • Samridhi • Spiritual Growth",
  },
  {
    src: "/videos/video2.mp4",
    title: "महर्षि महेश योगी",
    subtitle: "Transcendental Meditation & Wisdom",
  },
  {
    src: "/videos/video3.mp4",
    title: "Independence Day Special",
    subtitle: "I am Totality – That is India",
  },
];

const VideoReels = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % videos.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + videos.length) % videos.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 10000); // 10 sec per slide
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#fde8cc] py-12 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Featured Reels</h2>

      <div className="relative w-[320px] h-[560px] overflow-hidden rounded-3xl shadow-2xl border-4 border-white">
        <div
          className="transition-transform duration-700 h-full"
          style={{ transform: `translateY(-${current * 100}%)` }}
        >
          {videos.map((v, i) => (
            <div key={i} className="w-full h-[560px] relative">
              <video
                src={v.src}
                className="w-full h-full object-cover"
                playsInline
                controls
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
                <h3 className="font-bold text-lg">{v.title}</h3>
                <p className="text-sm opacity-90">{v.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded-full"
        >
          ▲
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded-full"
        >
          ▼
        </button>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-4">
        {videos.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              current === i ? "bg-orange-600" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default VideoReels;
