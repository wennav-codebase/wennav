"use client"
import { useParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import serviceData from '@/data/service.json'
import LoaderWrapper from '@/components/LoaderWrapper';
import { useLoading } from '@/contexts/LoadingContext';
import { useState } from 'react';
import Image from 'next/image';
import { CtaPrimary } from '@/components/CtaButtons';

function ServiceContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const {id} = useParams();
  const { setIsLoading } = useLoading();
  const [email, setEmail] = useState('');
  const decodedId = typeof id === 'string' ? decodeURIComponent(id) : Array.isArray(id) ? decodeURIComponent(id[0]) : '';
  const service = serviceData.services.find((s: any) => s.id === decodedId);
  const handleEnquirySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Opens the visitor's mail app. Replace this with your API call if you have one.
    window.location.href = `mailto:contact@wennav.com?subject=${encodeURIComponent(
      `Project enquiry: ${service?.name ?? ""}`,
    )}&body=${encodeURIComponent(`Hi, my email is ${email}.`)}`;
  };

  useEffect(() => {
    setIsLoading(true);
  }, [setIsLoading]);

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <LoaderWrapper>
      {/* Hero */}
      <section className="bg-primary flex flex-col items-center pt-50 pb-30 relative overflow-hidden z-20 gap-y-4">
        {/* Glow (behind, centered) */}
        <div className="pointer-events-none absolute left-1/2 top-[35%] z-0 h-120 w-220 -translate-x-1/2 rounded-full bg-primaryLight/30 blur-3xl"></div>

        {/* Text (in front) */}
        <p className="relative z-10 text-secondary text-xs font-bold">
          SERVICE WE PROVIDE
        </p>
        <h1 className="relative z-10 text-8xl text-secondary font-bold uppercase font-heading text-center whitespace-pre-line">
          {service.hero?.heading || service.name}
        </h1>
        <p className="relative z-10 text-secondary text-base">
          {service.hero?.description}
        </p>
      </section>
      {/* Our Offearings */}
      <section className='grid grid-cols-1 bg-[url("/backgrounds/offerings.jpeg")] relative bg-cover  '>
        <div className="absolute inset-0 bg-primary/50 "></div>
        {/* Left */}
        <div className="items-start relative z-10 px-20 py-10">
          {service.offerings && (
            <ul className="flex flex-col gap-y-4">
              {service.offerings.map((offering, index) => (
                <li
                  key={index}
                  className="flex flex-row items-center gap-x-2 text-secondary"
                >
                  <div className="bg-accent w-3 h-3 rounded-full"></div>
                  {offering}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      {/* Steps */}
      <section className="bg-primary py-20 px-10 border-t border-b border-borderColor">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-secondary text-4xl font-heading font-bold mb-12 text-center">
            How We Work
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-16 gap-y-8 relative ">
            {service.steps?.map((step: any, index: number) => (
              <div key={index} className="relative flex items-stretch">
                {/* Card */}
                <div className="bg-secondary p-6 rounded-2xl border border-borderColor/50 hover:border-accent/50 transition-colors w-full">
                  <span className="text-accent text-5xl font-bold font-heading block mb-4">
                    {step.number}
                  </span>
                  <h3 className="text-primary text-xl font-bold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-primary/80 text-sm">{step.description}</p>
                </div>
                {/* Arrow for desktop (except last card) */}
                {index < (service.steps?.length || 0) - 1 && (
                  <div className="hidden lg:flex absolute left-full top-1/2 transform -translate-y-1/2 ml-4 text-accent text-4xl z-20">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FAQ */}
      {service.faq && (
        <section className="bg-primary py-20 px-5 lg:px-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-x-16 gap-y-10">
            {/* Left */}
            <div className="flex flex-col gap-y-4 self-start lg:sticky lg:top-24">
              <p className="text-secondary text-sm font-semibold">FAQs</p>
              <h2 className="text-secondary text-4xl font-heading font-bold leading-tight max-w-xs">
                Frequently asked questions
              </h2>
              <p className="text-secondary/70 text-sm max-w-xs">
                {service.faq.description}
              </p>
            </div>

            {/* Right: accordion */}
            <div className="flex flex-col">
              {service.faq.items?.map((item: any, index: number) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} className="border-b border-borderColor/60">
                    <button
                      type="button"
                      id={`faq-trigger-${index}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-x-6 py-5 text-left text-secondary hover:text-accent transition-colors duration-300"
                    >
                      <span className="text-lg font-semibold">
                        {item.question}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`shrink-0 text-3xl leading-none text-accent transition-transform duration-300 ${
                          isOpen ? "rotate-45" : "rotate-0"
                        }`}
                      >
                        +
                      </span>
                    </button>

                    <div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${index}`}
                      aria-hidden={!isOpen}
                      className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-5 text-sm leading-relaxed text-secondary/70 max-w-2xl">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
      {/* Project Enquiry */}
      <section className=" grid grid-cols-1 lg:grid-cols-2 bg-cover bg-center relative bg-[url('/backgrounds/enquiry.png')] py-20 z-20">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-primary to-primary/20 z-0 from-50%"></div>

        <div className="flex justify-center items-center relative z-10">
          <h1 className="text-secondary text-4xl font-heading font-bold">
            Have any project in mind?
          </h1>
        </div>
        <div className="flex flex-col gap-y-5 items-start relative z-10">
          <h1 className="text-secondary text-4xl font-heading font-bold">
           Send us a Mail
          </h1>
          <div className='flex gap-x-2'>
            <input
              type="email"
              placeholder="Your mail"
              className="flex-1 px-4 py-2.5 rounded-lg bg-secondary/10 border border-secondary/50 placeholder-secondary/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors text-primary"
            />
            <CtaPrimary>Send</CtaPrimary>
          </div>
        </div>
      </section>
    </LoaderWrapper>
  );
}

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServiceContent />
    </Suspense>
  )
}

export default page