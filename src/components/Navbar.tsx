"use client";
import Image from "next/image";
import Link from "next/link";
import { CtaPrimary } from "./CtaButtons";
import { motion } from "framer-motion";
import { useLoading } from "@/contexts/LoadingContext";

export default function Navbar() {
  const { isLoading } = useLoading();
  const pages: { name: string; href: string }[] = [
    { name: "Service", href: "/#service" },
    { name: "Showcase", href: "/#showcase" },
    { name: "About Us", href: "/#about" },
  ];

  if (isLoading) return null;

  return (
    <motion.nav
      className="flex rounded-full justify-between items-center absolute w-[75%] px-5 py-2.5 bg-primaryLight/25 top-10 left-1/2 -translate-x-1/2 border-[0.5px] shadow-2xl shadow-secondaryLight/5 border-borderColor/50 z-90"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo */}
      <div>
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
      </div>
      {/* links */}
      <div className="flex gap-x-10 items-center">
        {pages.map((page) => (
          <Link
            className="text-secondary hover:underline hover:text-accent transition-all hover:duration-500 "
            key={page.name}
            href={page.href}
          >
            {page.name}
          </Link>
        ))}
        <CtaPrimary>Get a Quote</CtaPrimary>
      </div>
    </motion.nav>
  );
}
