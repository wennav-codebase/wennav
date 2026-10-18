import Image from "next/image";
import Link from "next/link";
import { CtaPrimary } from "./CtaButtons";

export default function Navbar() {
  const pages: { name: string; href: string }[] = [
    { name: "Service", href: "/#service" },
    { name: "Showcase", href: "/#showcase" },
    { name: "About Us", href: "/#about" },
  ];
  return (
    <nav className="flex rounded-full justify-between items-center absolute w-[75%] px-5 py-2.5 bg-[#6B1E85]/25 top-10 left-1/2 -translate-x-1/2 border-[0.5px] border-borderColor/30 shadow-2xl shadow-secondarylight">
      {/* Logo */}
      <div>
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
      </div>
      {/* links */}
      <div className="flex gap-x-10 items-center">
        {pages.map((page) => (
          <Link className="text-secondary hover:underline hover:text-accent transition-all " key={page.name} href={page.href}>
            {page.name}
          </Link>
        ))}
        <CtaPrimary>Get a Quote</CtaPrimary>
      </div>
    </nav>
  );
}