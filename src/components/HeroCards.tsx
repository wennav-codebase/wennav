"use client";

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
    <div className="mt-5 flex w-full flex-col gap-4 px-4 md:w-[90%] md:flex-row md:gap-x-9 md:px-14">
      {cards.map((card) => (
        <div
          key={card.tagline}
          style={{ "--card-width": card.baseWidth } as React.CSSProperties}
          className={`
            relative flex w-full flex-col items-start justify-between gap-y-4 overflow-hidden
            rounded-2xl border border-borderColor px-6 py-5 text-secondary
            md:w-[var(--card-width)] md:px-8
            md:transition-[width] md:duration-300 md:ease-in-out md:hover:w-1/2
            ${card.variant === "accent" ? "bg-accent/60" : "bg-primary/60"}
          `}
        >
          <span className="font-heading mb-2 text-4xl font-bold md:text-5xl">
            {card.percentage}
          </span>
          <span className="font-text mb-1 text-lg font-semibold">
            {card.tagline}
          </span>

          {/* <span className="font-text text-xs opacity-80">
            {card.description}
          </span> */}
        </div>
      ))}
    </div>
  );
}