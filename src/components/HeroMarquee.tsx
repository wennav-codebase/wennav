"use client"

import { motion } from "framer-motion";
import { Asterisk } from "lucide-react";

function HeroMarquee() {
  const marqueeText = ["Web Development", "Search Engine Optimization", "Brand Identity"];

  return (
    <div className="bg-primaryLight overflow-hidden py-3">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...marqueeText, ...marqueeText, ...marqueeText].map((text, index) => (
          <div key={index} className="flex flex-row items-center">
            <span
              className="mx-8 text-secondary font-heading text-4xl font-bold uppercase"
            >
              {text}
            </span>
            <Asterisk className="text-accent shrink-0" size={64} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default HeroMarquee;