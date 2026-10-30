import { CtaPrimary, CtaSecondary } from "@/components/CtaButtons";
import LoaderWrapper from "@/components/LoaderWrapper";
import HeroCards from "@/components/HeroCards";
import Image from "next/image";
import HeroMarquee from "@/components/HeroMarquee";
import ServiceCard from "@/components/ServiceCard";
import { Asterisk } from "lucide-react";
export default function Home() {
  const services = [
    {
      icon: "/service-icons/web-development.png",
      heading: "Web Development",
      description: "Designing robust front-end and back-end web frameworks.",
    },
    {
      icon: "/service-icons/mobile-development.png",
      heading: "Mobile App Development",
      description:
        "User-focused native & cross-platform apps for iOS and Android.",
    },
    {
      icon: "/service-icons/saas.png",
      heading: "SaaS App Development",
      description:
        "Cloud-connected multi-tenant software platforms engineered to scale.",
    },
    {
      icon: "/service-icons/whatsapp.png",
      heading: "WhatsApp Automation",
      description:
        "Cloud-connected multi-tenant software platforms engineered to scale.",
    },
    {
      icon: "/service-icons/ui-ux.png",
      heading: "UI/UX Design",
      description:
        "Intuitive user research, wireframing, and interactive design systems.",
    },
    {
      icon: "/service-icons/brand-kit.png",
      heading: "Brand Kit",
      description:
        "Graphic design assets, color palettes, logo identity, and typography.",
    },
    {
      icon: "/service-icons/social-media-marketing.png",
      heading: "Social Media Posts & Managment",
      description:
        "Data-driven visual content strategy and creative campaign design.",
    },
    {
      icon: "/service-icons/full-stack.png",
      heading: "Full Stack Development",
      description:
        "End-to-end web architectures, secure APIs, and database engines.",
    },
  ];
  return (
    <LoaderWrapper>
      <div className="flex flex-col max-w-screen overflow-x-hidden">
        {/* Hero Section */}
        <section className="hero-bg flex flex-col items-center pt-40 pb-10 gap-y-5 relative max-h-270">
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
        {/* Service Section */}
        <section className="bg-primary relative flex flex-col items-center py-20 gap-y-10 justify-center z-30 overflow-hidden">
          <div className="h-120 w-120 bg-primaryLight/60  absolute bottom-0 -right-10 z-10 rounded-full translate-y-[25%] blur-3xl"></div>
          <h1 className="text-secondary text-5xl font-heading font-bold uppercase">
            Services & Solutions
          </h1>
          {/* Services Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 py-5 w-full max-w-7xl justify-center mx-10 relative z-20 px-10">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </section>
        {/* Our Best Work */}
        <section>
          
        </section>
      </div>
    </LoaderWrapper>
  );
}
