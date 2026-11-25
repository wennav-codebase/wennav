"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { CtaPrimary } from "./CtaButtons";
import { useLoading } from "@/contexts/LoadingContext";

const pages: { name: string; href: string }[] = [
  { name: "Service", href: "/#service" },
  { name: "Showcase", href: "/#showcase" },
  { name: "About Us", href: "/#about" },
];

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, when: "beforeChildren", staggerChildren: 0.08 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, when: "afterChildren" },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: 10, transition: { duration: 0.15 } },
};

export default function Navbar() {
  const { isLoading } = useLoading();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  // Lock body scroll while the menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close on Escape + when resizing up to desktop
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeMenu();
    const onResize = () => window.innerWidth >= 768 && closeMenu();
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  if (isLoading) return null;

  return (
    <>
      <motion.nav
        className="flex rounded-full justify-between items-center absolute w-[90%] md:w-[75%] px-5 py-2.5 bg-primaryLight/25 top-6 md:top-10 left-1/2 -translate-x-1/2 border-[0.5px] shadow-2xl shadow-secondaryLight/5 border-borderColor/50 z-90"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <Link href="/" aria-label="Home">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-x-10 items-center">
          {pages.map((page) => (
            <Link
              className="text-secondary hover:underline hover:text-accent transition-all hover:duration-500"
              key={page.name}
              href={page.href}
            >
              {page.name}
            </Link>
          ))}
          <CtaPrimary>Get a Quote</CtaPrimary>
        </div>

        {/* Hamburger button (mobile only) */}
        <button
          type="button"
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-full"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
        >
          <span className="block h-0.5 w-6 bg-secondary rounded" />
          <span className="block h-0.5 w-6 bg-secondary rounded" />
          <span className="block h-0.5 w-4 bg-secondary rounded self-end mr-2" />
        </button>
      </motion.nav>

      {/*
        Rendered OUTSIDE the <nav>: the nav has a transform applied, which would make
        `fixed` children position relative to the nav instead of the viewport.
      */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            className="md:hidden fixed inset-0 z-100 flex flex-col overflow-y-auto bg-primary/95 backdrop-blur-xl"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Top bar: logo + close */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between px-6 pt-8"
            >
              <Link href="/" onClick={closeMenu} aria-label="Home">
                <Image src="/logo.png" alt="Logo" width={100} height={100} />
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                className="relative w-10 h-10 rounded-full"
                onClick={closeMenu}
              >
                <span className="absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-secondary rounded" />
                <span className="absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-secondary rounded" />
              </button>
            </motion.div>

            {/* Vertical grid of links, starting from the top */}
            <nav
              aria-label="Mobile"
              className="mt-10 grid grid-cols-1 border-t border-borderColor/50 mx-6"
            >
              {pages.map((page, i) => (
                <motion.div
                  key={page.name}
                  variants={itemVariants}
                  className="border-b border-borderColor/50"
                >
                  <Link
                    href={page.href}
                    onClick={closeMenu}
                    className="group flex items-center justify-between py-6 text-secondary hover:text-accent transition-colors duration-300"
                  >
                    <span className="flex items-baseline gap-x-4">
                      <span className="text-sm text-secondary/50 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-3xl font-medium">{page.name}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-2xl transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </motion.div>
              ))}

              {/* CTA as the last row of the grid */}
              <motion.div
                variants={itemVariants}
                onClick={closeMenu}
                className="py-6"
              >
                <CtaPrimary>Get a Quote</CtaPrimary>
              </motion.div>
            </nav>

            {/* Email pinned to the bottom */}
            <motion.div
              variants={itemVariants}
              className="mt-auto px-6 pt-10 pb-[max(2rem,env(safe-area-inset-bottom))]"
            >
              <p className="text-xs uppercase tracking-widest text-secondary/50">
                Contact us
              </p>
              <a
                href="mailto:contact@wennav.com"
                onClick={closeMenu}
                className="mt-2 inline-block text-lg text-secondary hover:text-accent hover:underline transition-colors duration-300"
              >
                contact@wennav.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}