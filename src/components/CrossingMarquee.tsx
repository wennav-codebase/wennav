"use client";

import { motion } from "framer-motion";
import { Asterisk } from "lucide-react";

const LABEL = "Let's Get Started";

// 9 units = 3 groups of 3. Each unit is identical in width, so moving by
// one third of the track lands exactly on the start of the next group.
const UNITS = Array.from({ length: 9 }, (_, i) => i);

type BandProps = {
  bgClass: string;
  rotateClass: string;
  iconClass: string;
  direction: "forward" | "backward";
};

const Band = ({ bgClass, rotateClass, iconClass, direction }: BandProps) => {
  const isForward = direction === "forward";

  return (
    <div
      className={`col-start-1 row-start-1 w-full overflow-hidden py-3 ${bgClass} ${rotateClass}`}
    >
      <motion.div
        className="flex w-max whitespace-nowrap"
        animate={{
          x: isForward ? ["0%", "-33.333%"] : ["-33.333%", "0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {UNITS.map((i) => (
          <div key={i} className="flex flex-row items-center">
            <span className="mx-8 font-heading text-4xl font-bold uppercase text-secondary">
              {LABEL}
            </span>
            <Asterisk className={`shrink-0 ${iconClass}`} size={64} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function CrossingMarquee() {
  return (
    // Both bands share one grid cell, so they cross at the same center point
    <div className="relative grid grid-cols-1 grid-rows-1 place-items-center overflow-hidden py-16">
      <Band
        bgClass="bg-primaryLight"
        rotateClass="-rotate-5"
        iconClass="text-accent"
        direction="forward"
      />
      {/* Later in the DOM, so it sits on top of the primary band */}
      <Band
        bgClass="bg-accent"
        rotateClass="rotate-5"
        iconClass="text-primary"
        direction="backward"
      />
    </div>
  );
}
