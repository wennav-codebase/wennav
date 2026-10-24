import { CtaPrimary, CtaSecondary } from "@/components/CtaButtons";
import LoaderWrapper from "@/components/LoaderWrapper";
import HeroCards from "@/components/HeroCards";
import Image from "next/image";
import HeroMarquee from "@/components/HeroMarquee";
export default function Home() {
  return (
    <LoaderWrapper>
      <div className="flex flex-col max-w-screen">
        {/* Hero Section */}
        <section className="hero-bg flex flex-col items-center pt-40 pb-10 gap-y-5 relative max-h-[1080px]">
          <Image
            src="/hero/home-bg.jpeg"
            fill
            alt="hero image background"
            className="absolute inset-0 z-0 object-cover opacity-20"
          />

          <div className="relative z-10 flex flex-col items-center gap-y-5 w-full">
            <h1 className="font-bold text-6xl text-secondary text-center font-heading leading-16">
              Transforming Ideas Into{" "}
              <span className="text-accent">
                <br />
                Scalable
              </span>
              Technology
            </h1>
            <p className="text-secondary text-center text-xl font-semibold">
              Your Problem's Solution Is Almost Here!
            </p>
            {/* Button Container */}
            <div className="flex gap-x-4">
              <CtaPrimary>Get Started</CtaPrimary>
              <CtaSecondary>About Wennav</CtaSecondary>
            </div>
            {/* Animation Card */}
            <HeroCards />
          </div>
        </section>
        {/* Hero Marquess */}
        <HeroMarquee />
      </div>
    </LoaderWrapper>
  );
}
