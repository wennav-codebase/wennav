import { CtaPrimary, CtaSecondary } from "@/components/CtaButtons";
import LoaderWrapper from "@/components/LoaderWrapper";
import HeroCards from "@/components/HeroCards";
import Image from "next/image";
import HeroMarquee from "@/components/HeroMarquee";
import ServiceCard from "@/components/ServiceCard";
import { Asterisk } from "lucide-react";
import ProjectShowcase from "@/components/ProjectShowcase";
import FallingCapsules from "@/components/FallingCapsules";
import CrossingMarquee from "@/components/CrossingMarquee";
import TestimonialCarousel from "@/components/TestimonialCarousel";
export default function Home() {
  const services: { icon: string; heading: string; description: string }[] = [
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
  const testimonials: { name: string; description: string; star: number; clientPhoto: string; serviceTaken: string }[] = [
    {
      name: "Sarah Mitchell",
      description:
        "The team rebuilt our company website from the ground up. The front-end is fast and responsive, and the back-end handles our traffic spikes without a hiccup. Communication was clear throughout the project.",
      star: 5,
      clientPhoto: "/client-photos/dummy.png",
      serviceTaken: "Web Development",
    },
    {
      name: "James Okafor",
      description:
        "We needed an iOS and Android app for our fitness community, and they delivered a polished cross-platform build on schedule. Our users love the smooth onboarding flow and the offline mode.",
      star: 5,
      clientPhoto: "/client-photos/dummy.png",
      serviceTaken: "Mobile App Development",
    },
    {
      name: "Priya Raman",
      description:
        "Our multi-tenant SaaS platform was architected with scalability in mind from day one. We onboarded our first 200 clients without any infrastructure concerns. Highly recommended for serious SaaS products.",
      star: 5,
      clientPhoto: "/client-photos/dummy.png",
      serviceTaken: "SaaS App Development",
    },
    {
      name: "Daniel Chen",
      description:
        "The WhatsApp automation they built cut our customer response time by more than half. Order updates and support flows run smoothly, and our team barely touches the queue anymore.",
      star: 4,
      clientPhoto: "/client-photos/dummy.png",
      serviceTaken: "WhatsApp Automation",
    },
    {
      name: "Amara Johnson",
      description:
        "The UX research phase uncovered pain points we had completely missed. The wireframes and interactive design system made development faster and kept our product consistent across every screen.",
      star: 5,
      clientPhoto: "/client-photos/dummy.png",
      serviceTaken: "UI/UX Design",
    },
    {
      name: "Marco Rossi",
      description:
        "They created our full brand kit, including the logo, color palette, and typography. Everything feels cohesive now, and our new materials finally look as professional as our product.",
      star: 5,
      clientPhoto: "/client-photos/dummy.png",
      serviceTaken: "Brand Kit",
    },
    {
      name: "Lena Fischer",
      description:
        "Our social media presence was inconsistent until they took over. Their data-driven content strategy grew our engagement by over 60% in three months, and the campaign visuals are excellent.",
      star: 4,
      clientPhoto: "/client-photos/dummy.png",
      serviceTaken: "Social Media Posts & Managment",
    },
    {
      name: "Tom Hayes",
      description:
        "From the database schema to the secure REST APIs and the React front-end, the team handled the entire stack with impressive consistency. Our internal tool went live two weeks early.",
      star: 5,
      clientPhoto: "/client-photos/dummy.png",
      serviceTaken: "Full Stack Development",
    },
    {
      name: "Nadia Haddad",
      description:
        "They handled both the web app and the mobile companion app, and the two feel like one product. Their attention to detail and quick turnaround on revisions impressed our entire team.",
      star: 5,
      clientPhoto: "/client-photos/dummy.png",
      serviceTaken: "Full Stack Development",
    },
    {
      name: "Kevin Walsh",
      description:
        "Our brand refresh and new landing page were delivered together, and the visual identity carried through perfectly. The project was well managed from start to finish.",
      star: 4,
      clientPhoto: "/client-photos/dummy.png",
      serviceTaken: "Brand Kit",
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
        <section className="bg-primary relative flex flex-col items-center py-20 gap-y-10 justify-center z-30 overflow-hidden ">
          <div className="h-120 w-120 bg-primaryLight/60  absolute bottom-0 -right-10 z-10 rounded-full translate-y-[25%] blur-3xl"></div>
          <h1 className="text-secondary text-5xl font-heading font-bold uppercase ">
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
        <section className="grid grid-cols-1 lg:grid-cols-2 bg-linear-to-b from-primary from-50% to-primaryLight py-10 px-10 items-center relative overflow-hidden isolate  ">
          <Image
            src="/backgrounds/service.svg"
            fill
            alt="Service"
            className="absolute inset-0 z-0 object-cover"
          />
          {/* Left */}
          <div className="relative z-10 gap-y-15 flex flex-col items-start">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-secondary font-bold text-5xl text-heading">
                Our Best <span className="text-accent">Work</span>
              </h1>
              <p className="text-secondary text-base">
                A curated collection of digital platforms, high-performance web{" "}
                <br />
                applications, and custom ecosystems built for growing brands.
              </p>
            </div>
            <CtaPrimary>View All Projects</CtaPrimary>
          </div>

          {/* Right */}
          <div className="relative z-10 w-full">
            <ProjectShowcase />
          </div>
        </section>
        {/* About Us */}
        <section className="flex flex-col bg-primary relative z-20 overflow-hidden">
          {/* Purple Card */}
          <div className="flex flex-col w-[95%] px-10 py-5 gap-y-10 mt-10 relative z-30 bg-primary rounded-r-2xl shadow-xl ">
            <h1 className="text-accent text-3xl font-heading font-bold uppercase">
              At wennav, we believe technology <br /> isn’t just about code—it’s{" "}
              <br />
              about connecting.
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
              <Image
                src="/about-wennav.png"
                width={350}
                height={350}
                alt="About Us"
                className="-ml-5"
              />
              <div className="flex flex-col items-start gap-y-8">
                <h3 className="text-heading text-secondary font-heading font-bold text-xl ">
                  About Wennav
                </h3>
                <p className="text-base text-secondary">
                  We’re a full-service IT solutions agency built to help brands
                  grow with purpose and data-driven precision. From crafting
                  compelling software to executing digital systems that convert,
                  we blend strategy to turn attention into action.
                </p>
                <CtaPrimary>Explore</CtaPrimary>
              </div>
            </div>
          </div>
          <div className="h-120 w-120 bg-primaryLight/60  absolute bottom-0 -right-10 z-10 rounded-full translate-y-[25%] blur-3xl"></div>
          <FallingCapsules />
        </section>
        {/* Testimonials */}
        <section className="bg-primary relative">
          <Image
            src="/backgrounds/testimonial.png"
            fill
            className="absolute inset-0 z-0 object-cover"
            alt="Testimonial"
          />
          <CrossingMarquee />
          <h1 className="text-secondary font-bold text-5xl text-heading text-center mt-10 ">
            WHAT
            <span className="text-accent mx-2">CLIENTS</span>
            SAYS ABOUT US
          </h1>
          <TestimonialCarousel testimonials={testimonials} />
        </section>
      </div>
    </LoaderWrapper>
  );
}
