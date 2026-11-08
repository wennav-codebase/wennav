"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const AUTO_PLAY_MS = 4000;

// Mobile/tablet: side cards are offset by a percentage of their own width
const SIDE_PERCENT = 45;
// Desktop (xl and up): side cards are offset by a fixed distance in px.
// Card width is 380px, so 400px leaves roughly a 40px gap between cards.
const SIDE_PX_DESKTOP = 400;

interface Testimonial {
  name: string;
  description: string;
  star: number;
  clientPhoto: string;
  serviceTaken: string;
}

// Tracks whether the screen matches a media query. Starts false so the
// server render and first client render match.
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return matches;
}

// Position of a card relative to the active one. Wrapped so the carousel loops.
const getOffset = (index: number, active: number, total: number) => {
  let offset = (((index - active) % total) + total) % total;
  if (offset > total / 2) offset -= total;
  return offset;
};

// Horizontal position for a side card. direction is -1 (left) or 1 (right).
// multiplier is 1 for the visible side cards and 2 for the hidden ones.
const getSideX = (direction: -1 | 1, isDesktop: boolean, multiplier = 1) =>
  isDesktop
    ? direction * multiplier * SIDE_PX_DESKTOP
    : `${direction * multiplier * SIDE_PERCENT}%`;

const getCardStyle = (offset: number, isDesktop: boolean) => {
  if (offset === 0) {
    return { x: "0%", rotate: 0, scale: 1, opacity: 1 };
  }

  const direction = offset < 0 ? -1 : 1;

  if (Math.abs(offset) === 1) {
    return {
      x: getSideX(direction, isDesktop),
      rotate: direction * 8,
      scale: 0.9,
      opacity: 0.5,
      y: 50,
    };
  }

  // Cards further away stay hidden behind the visible three
  return {
    x: getSideX(direction, isDesktop, 2),
    rotate: direction * 12,
    scale: 0.8,
    opacity: 0,
  };
};

export default function TestimonialCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const total = testimonials.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  // Advance automatically. Each change schedules the next one,
  // so clicking a dot also restarts the timer.
  useEffect(() => {
    if (paused || total < 2) return;
    const timer = window.setTimeout(() => {
      setActive((a) => (a + 1) % total);
    }, AUTO_PLAY_MS);
    return () => window.clearTimeout(timer);
  }, [active, paused, total]);

  return (
    <section className="bg-primary py-20 overflow-hidden">
      <div
        className="grid grid-cols-1 grid-rows-1 justify-items-center py-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {testimonials.map((t, index) => {
          const offset = getOffset(index, active, total);
          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 1;
          const style = getCardStyle(offset, isDesktop);
          const zIndex = isActive ? 30 : isVisible ? 20 : 10;

          return (
            <motion.article
              key={t.name}
              animate={style}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              style={{ zIndex }}
              onClick={() => {
                if (!isActive) setActive(index);
              }}
              className={`col-start-1 row-start-1 flex w-70 sm:w-85 md:w-95 flex-col items-center gap-4 rounded-3xl bg-secondary text-primary p-6 md:p-8 shadow-xl ${
                isActive ? "" : "cursor-pointer"
              } ${isVisible ? "" : "pointer-events-none"}`}
            >
              {/* Client photo */}
              <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-primary/15">
                <Image
                  src={t.clientPhoto}
                  alt={t.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>

              {/* Rating stars */}
              <div className="flex gap-1 ">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    size={18}
                    className={
                      s < t.star ? "fill-accent text-accent" : "text-primary/20"
                    }
                  />
                ))}
              </div>

              {/* Full review */}
              <p className="text-start text-sm md:text-base leading-relaxed">
                &ldquo;{t.description}&rdquo;
              </p>

              {/* Client name and service */}
              <div className="mt-auto text-end self-end">
                <h3 className="font-heading text-lg font-bold uppercase">
                  {t.name}
                </h3>
                <p className="text-sm font-semibold text-primary/70">
                  {t.serviceTaken}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Pagination dots */}
      <div className="mt-6 flex justify-center gap-3">
        {testimonials.map((t, i) => (
          <button
            key={t.name}
            type="button"
            aria-label={`Show testimonial ${i + 1}`}
            aria-current={i === active}
            onClick={() => setActive(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === active
                ? "w-8 bg-accent"
                : "w-2.5 bg-accent/30 hover:bg-accent/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
