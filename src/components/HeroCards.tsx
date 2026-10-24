"use client"

import { motion } from "framer-motion";

interface CardData {
  percentage: string;
  tagline: string;
  description: string;
  variant: "accent" | "secondary";
  baseWidth: string;
}

const cards: CardData[] = [
  {
    percentage: "5+",
    tagline: "Websites Live",
    description: "Successfully deployed and running",
    variant: "secondary",
    baseWidth: "25%",
  },
  {
    percentage: "24hr",
    tagline: "Response Time",
    description: "Quick support for your needs",
    variant: "secondary",
    baseWidth: "25%",
  },
  {
    percentage: "97%",
    tagline: "Client Satisfaction",
    description: "Trusted by businesses worldwide",
    variant: "accent",
    baseWidth: "50%",
  },
];

export default function HeroCards() {
  return (
    <div className="flex w-full gap-4 px-14 mt-5">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className={`
            relative overflow-hidden rounded-2xl px-8 pt-5 pb-5 flex flex-col items-start justify-center gap-y-4
            ${card.variant === "accent" ? "bg-accent/60 text-secondary border border-borderColor" : "bg-primary/60 text-secondary border border-borderColor"}
          `}
          style={{ width: card.baseWidth }}
          whileHover={{
            width: "50%",
            transition: { duration: 0.3, ease: "easeInOut" },
          }}
          initial={{ width: card.baseWidth }}
        >
 
          <span className="text-5xl font-bold font-heading mb-2">
            {card.percentage}
          </span>
          <span className="text-lg font-semibold font-text mb-1">
            {card.tagline}
          </span>
   
          {/* <span className="text-xs font-text opacity-80">
            {card.description}
          </span> */}
        </motion.div>
      ))}
    </div>
  );
}
