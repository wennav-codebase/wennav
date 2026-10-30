"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { CtaPrimary, CtaSecondary } from "./CtaButtons";
import Link from "next/link";

type Service = { icon: string; heading: string; description: string };

function ServiceCard({ service , index }: { service: Service , index:number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -120 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative isolate flex w-full flex-col gap-y-5 overflow-hidden rounded-2xl border border-borderColor/50 bg-secondary/50 p-4 text-primary hover:border-borderColor before:absolute before:inset-0 before:-z-10 before:-translate-x-full before:translate-y-full before:rounded-[inherit] before:bg-accent before:transition-transform before:duration-1500 before:ease-in-out hover:before:translate-x-0 hover:before:translate-y-0 hover:cursor-pointer hover:-translate-y-1 transition-all relative"
    >
      {/* ---------- BASE LAYER (old colors) ---------- */}
      <Image src={service.icon} alt={service.heading} width={50} height={50} />
      <h3 className="mb-5 text-xl font-bold text-heading">{service.heading}</h3>
      <p className="text-base">{service.description}</p>
      <p className="absolute -bottom-5 right-0 font-bold text-9xl text-primary/10 ">
        {index + 1}
      </p>
      {/* ---------- WIPE LAYER (new colors, uncovered by the same diagonal) ---------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex flex-col gap-y-5 p-4 text-secondary [clip-path:inset(100%_100%_0_0)] transition-[clip-path] duration-1500 ease-in-out group-hover:[clip-path:inset(0_0_0_0)]"
      >
        <Image
          src={service.icon}
          alt=""
          width={50}
          height={50}
          className="invert"
        />
        <h3 className="mb-5 text-xl font-bold text-heading">
          {service.heading}
        </h3>
        <p className="text-base">{service.description}</p>
        <p className="absolute -bottom-5 right-0 font-bold text-9xl text-secondary/20 ">
        {index + 1}
      </p>
      </div>
    </motion.div>
  );
}

export default ServiceCard;
