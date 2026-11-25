"use client"
import { useLoading } from "@/contexts/LoadingContext";
import Link from "next/link";

const mainPages = [
  { label: "Home", href: "#", accent: false },
  { label: "Services", href: "#", accent: false },
  { label: "Showcase", href: "#", accent: false },
  { label: "About Us", href: "#", accent: false },
  { label: "Reviews", href: "#", accent: false },
  { label: "Contact", href: "#", accent: true },
];

const innerPages = [
  { label: "Services Details", href: "#" },
  { label: "Showcase Details", href: "#" },
  { label: "About Details", href: "#" },
  { label: "All Reviews", href: "#" },
  { label: "Terms & Conditions", href: "#" },
];

const socialHandles = [
  { label: "Website", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer() {
    const { isLoading } = useLoading();
  
  if (isLoading) return null;
  
  return (
    <footer className="bg-primary text-secondary relative overflow-hidden border-t border-borderColor/10">
      <div className="h-90 w-90 bg-primaryLight/60 absolute top-0 -left-10 z-10 rounded-full blur-3xl"></div>
      <div className="mx-auto max-w-7xl px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-8 lg:gap-y-12 gap-x-8 lg:gap-x-32  ">
          {/* Left: Mail */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-heading font-bold mb-6 tracking-tight">
              Send us a Mail
            </h2>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your mail"
                className="flex-1 px-4 py-2.5 rounded-lg bg-secondary/10 border border-secondary/50 placeholder-secondary/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors"
              >
                Send
              </button>
            </form>
          </div>

          {/* Right: Three link grids */}
          <div className="lg:col-span-3 grid grid-cols-3">
            <div>
              <h3 className="text-xs font-heading font-bold uppercase mb-5 tracking-wider text-secondary">
                Main Pages
              </h3>
              <ul className="space-y-2.5 text-sm">
                {mainPages.map((page) => (
                  <li key={page.label}>
                    <Link
                      href={page.href}
                      className={`hover:text-secondary transition-colors ${
                        page.accent ? "text-accent hover:text-accent/90" : ""
                      }`}
                    >
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-heading font-bold uppercase mb-5 tracking-wider text-secondary">
                Inner Pages
              </h3>
              <ul className="space-y-2.5 text-sm">
                {innerPages.map((page) => (
                  <li key={page.label}>
                    <Link
                      href={page.href}
                      className="hover:text-secondary transition-colors"
                    >
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-heading font-bold uppercase mb-5 tracking-wider text-secondary">
                Social Handles
              </h3>
              <ul className="space-y-2.5 text-sm">
                {socialHandles.map((handle) => (
                  <li key={handle.label}>
                    <Link
                      href={handle.href}
                      className="hover:text-secondary transition-colors"
                    >
                      {handle.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom watermark */}
        <div className="mt-16 relative">
          <h1 className="text-9xl font-black uppercase text-secondary/10 select-none pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 whitespace-nowrap ">
            wennav
          </h1>
        </div>
      </div>
    </footer>
  );
}
