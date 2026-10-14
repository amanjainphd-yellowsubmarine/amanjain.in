"use client";

import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import type { HomeStories } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const perSlide = 2;

export function StoriesSection({ stories }: { stories: HomeStories }) {
  const cards = stories?.cards ?? [];
  const slides: HomeStories["cards"][] = [];
  for (let index = 0; index < cards.length; index += perSlide) {
    slides.push(cards.slice(index, index + perSlide));
  }
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const current = Math.min(index, Math.max(slides.length - 1, 0));

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused, slides.length, timerKey]);

  if (slides.length === 0) return null;

  return (
    <section data-edit="home-stories" className={`bg-white px-4 py-8 md:px-8 md:py-10 ${poppins.className}`}>
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-500 via-blue-400 to-cyan-400 p-6 shadow-xl md:p-10 lg:p-14">
        <div className="pointer-events-none absolute top-0 left-4 -translate-y-12 font-serif text-[18rem] leading-none text-white opacity-20 select-none">
          &ldquo;
        </div>
        <div className="pointer-events-none absolute right-4 bottom-0 translate-y-24 font-serif text-[18rem] leading-none text-white opacity-20 select-none">
          &rdquo;
        </div>

        <div className="relative z-10 mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold text-white md:text-5xl">{stories.title}</h2>
          <p className="text-base font-semibold text-white md:text-lg">{stories.subtitle}</p>
        </div>

        <div
          className="relative z-10 -mx-2 overflow-hidden px-2 py-2"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex w-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((group, slideIndex) => (
              <div className="w-full shrink-0 px-2" key={slideIndex}>
                <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-2">
                  {group.map((card, cardIndex) => {
                    const longRole = card.role.length > 80;
                    return (
                      <article key={`${slideIndex}-${cardIndex}`} className="flex flex-col rounded-[24px] bg-[#EBF3E1] p-6 shadow-sm md:p-8">
                        <p className="mb-8 flex-grow text-sm leading-relaxed text-gray-900 md:text-base">{card.quote}</p>
                        <div className="mt-auto flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex min-w-0 items-center gap-4">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={card.photo} alt={card.name} className="h-12 w-12 shrink-0 rounded-full object-cover shadow-sm" />
                            <div className="min-w-0">
                              <h3 className="text-sm font-bold text-gray-900">{card.name}</h3>
                              <p className={`mt-1 text-xs leading-snug text-gray-800 ${longRole ? "italic" : ""}`}>{card.role}</p>
                            </div>
                          </div>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={card.logo} alt={card.logoAlt} className="h-8 max-w-[120px] shrink-0 self-end object-contain mix-blend-multiply lg:self-center" />
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-10 flex items-center justify-center gap-3">
          {slides.map((_, slideIndex) => (
            <button
              key={slideIndex}
              type="button"
              aria-label={`Go to stories ${slideIndex + 1}`}
              onClick={() => {
                setIndex(slideIndex);
                setTimerKey((value) => value + 1);
              }}
              className={
                slideIndex === current
                  ? "h-3.5 w-3.5 cursor-pointer rounded-full border-2 border-teal-300 bg-transparent p-0 transition-all duration-300"
                  : "h-2.5 w-2.5 cursor-pointer rounded-full border-0 bg-white/60 p-0 transition-all duration-300 hover:bg-white"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
