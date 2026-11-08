"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  slug: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Nebula Analytics",
    category: "Product Design",
    year: "2025",
    slug: "nebula-analytics",
    image: "https://picsum.photos/seed/nebula/1200/800",
  },
  {
    id: 2,
    title: "Kite Commerce",
    category: "Web Application",
    year: "2025",
    slug: "kite-commerce",
    image: "https://picsum.photos/seed/kite/1200/800",
  },
  {
    id: 3,
    title: "Orbit Studio",
    category: "Brand & Identity",
    year: "2024",
    slug: "orbit-studio",
    image: "https://picsum.photos/seed/orbit/1200/800",
  },
  {
    id: 4,
    title: "Ember Finance",
    category: "Dashboard UI",
    year: "2024",
    slug: "ember-finance",
    image: "https://picsum.photos/seed/ember/1200/800",
  },
  {
    id: 5,
    title: "Sable Motion",
    category: "Interactive Site",
    year: "2023",
    slug: "sable-motion",
    image: "https://picsum.photos/seed/sable/1200/800",
  },
];

// ---- Timing (desktop auto-play) ----
const INITIAL_DELAY = 600;
const FALL_DELAY = 1100;
const HOVER_DELAY = 600;
const REVERSE_DELAY = 1800;

// ---- Mobile swipe ----
const MOBILE_BREAKPOINT = 768;
const SWIPE_OFFSET_THRESHOLD = 80; // px
const SWIPE_VELOCITY_THRESHOLD = 500; // px/s

export default function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.35 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Lazy init — avoids a false→true flash on mobile that started auto-play for 1 frame.
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches
      : false,
  );

  const activeIndexRef = useRef<number>(0);
  const hasPlayedOnce = useRef<boolean>(false);
  const total = PROJECTS.length;

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Live matchMedia listener for rotation / resize
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Desktop: auto-play + hover reverse. Mobile: pin at card 1, no timer.
  useEffect(() => {
    if (!isInView) return;

    if (isMobile) {
      setActiveIndex((v) => Math.max(1, v));
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const delay = hasPlayedOnce.current ? HOVER_DELAY : INITIAL_DELAY;
    if (!hasPlayedOnce.current) hasPlayedOnce.current = true;

    const step = () => {
      if (cancelled) return;
      const current = activeIndexRef.current;
      if (isHovered) {
        if (current <= 1) return;
        setActiveIndex(current - 1);
      } else {
        if (current >= total) return;
        setActiveIndex(current + 1);
      }
      timers.push(setTimeout(step, isHovered ? REVERSE_DELAY : FALL_DELAY));
    };

    timers.push(setTimeout(step, delay));

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [isHovered, isInView, total, isMobile]);

  // direction = +1 → add a card; -1 → remove a card
  const handleSwipe = (direction: 1 | -1) => {
    setActiveIndex((v) => Math.max(1, Math.min(total, v + direction)));
  };

  const displayedCount = Math.max(1, activeIndex);
  const progress = activeIndex / total;

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => {
        if (!isMobile) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (!isMobile) setIsHovered(false);
      }}
      className="relative h-screen w-full overflow-hidden"
    >
      <div className="relative h-full w-full -left-10">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            activeIndex={activeIndex}
            isMobile={isMobile}
            onSwipe={handleSwipe}
          />
        ))}
      </div>

      {/* Right rail */}
      <div className="pointer-events-none absolute right-0 -top-10 hidden h-full w-30 flex-col items-center pt-24 md:flex">
        <div className="flex flex-col items-center">
          <div className="relative flex h-12 items-center justify-center overflow-hidden">
            <motion.span
              key={displayedCount}
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="block font-heading text-4xl leading-none text-accent"
            >
              {String(displayedCount).padStart(2, "0")}
            </motion.span>
          </div>
          <span className="mt-2 font-heading text-[11px] tracking-[0.25em] text-secondaryLight">
            / {String(total).padStart(2, "0")}
          </span>
        </div>

        <div className="relative mt-6 w-[2px] flex-1 overflow-hidden rounded-full bg-borderColor/50">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: progress }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 25,
              mass: 0.4,
            }}
            className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-primaryLight to-accent"
          />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Single card — now with drag-based swipe on top card
   ========================================================= */
interface ProjectCardProps {
  project: Project;
  index: number;
  activeIndex: number;
  isMobile: boolean;
  onSwipe: (direction: 1 | -1) => void;
}

function ProjectCard({
  project,
  index,
  activeIndex,
  isMobile,
  onSwipe,
}: ProjectCardProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState<boolean>(false);

  const hasFallen = index < activeIndex;
  const depth = activeIndex - 1 - index;
  const targetY = hasFallen ? `-${Math.max(0, depth) * 2}%` : "120%";

  // Only the top card is draggable — and only on mobile.
  const isTop = index === activeIndex - 1;
  const draggable = isMobile && isTop;

  const mouseX = useMotionValue<number>(0);
  const mouseY = useMotionValue<number>(0);
  const tooltipX = useSpring(mouseX, {
    stiffness: 500,
    damping: 40,
    mass: 0.4,
  });
  const tooltipY = useSpring(mouseY, {
    stiffness: 500,
    damping: 40,
    mass: 0.4,
  });

  const updateMouse = (e: MouseEvent<HTMLAnchorElement>): void => {
    const rect = linkRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      initial={false}
      animate={{ y: targetY }}
      transition={{ type: "spring", stiffness: 90, damping: 22, mass: 0.9 }}
      style={{ zIndex: index + 1 }}
      className="absolute inset-0 flex items-center justify-center px-6 md:px-12 lg:px-16"
    >
      <motion.div
        drag={draggable ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.8}
        dragSnapToOrigin
        onDragEnd={(_, info) => {
          if (!draggable) return;
          const offset = info.offset.x;
          const velocity = info.velocity.x;

          if (
            offset < -SWIPE_OFFSET_THRESHOLD ||
            velocity < -SWIPE_VELOCITY_THRESHOLD
          ) {
            onSwipe(-1); // swipe left → remove
          } else if (
            offset > SWIPE_OFFSET_THRESHOLD ||
            velocity > SWIPE_VELOCITY_THRESHOLD
          ) {
            onSwipe(1); // swipe right → add
          }
          // else: dragSnapToOrigin springs it back on its own
        }}
        className="w-full max-w-4xl"
      >
        <Link
          ref={linkRef}
          href={`/projects/${project.slug}`}
          onMouseEnter={(e) => {
            setHovered(true);
            updateMouse(e);
          }}
          onMouseLeave={() => setHovered(false)}
          onMouseMove={updateMouse}
          className={`group relative block select-none ${hovered ? "cursor-none" : ""}`}
        >
          <div className="relative overflow-hidden rounded-3xl border border-borderColor/60 bg-primaryLight/5 shadow-2xl shadow-black/40">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <motion.img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
                initial={{ scale: 1.12 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-accent/0 transition-colors duration-500 group-hover:bg-accent/10" />
            </div>

            <div className="flex items-end justify-between gap-4 bg-primary px-6 py-5">
              <div>
                <h3 className="font-heading text-2xl leading-tight text-secondary">
                  {project.title}
                </h3>
                <p className="mt-1 font-text text-sm text-secondaryLight">
                  {project.category}
                </p>
              </div>
              <span className="font-mono text-sm text-secondaryLight">
                {project.year}
              </span>
            </div>
          </div>

          <AnimatePresence>
            {hovered && (
              <motion.span
                key="tooltip"
                style={{ x: tooltipX, y: tooltipY }}
                initial={{ opacity: 0, scale: 0.35 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.35 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="pointer-events-none absolute left-0 top-0 z-30 origin-center"
              >
                <span className="flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent px-3 text-center font-text text-[11px] font-semibold uppercase leading-4 tracking-[0.14em] text-secondary shadow-xl shadow-accent/40">
                  View
                  <br />
                  Project
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </motion.div>
    </motion.div>
  );
}
