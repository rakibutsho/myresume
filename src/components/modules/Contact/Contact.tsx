"use client";

import { useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ContactFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormInputs>({
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hybrid-contact-content",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resData = await response.json();
      if (resData.success) {
        toast.success("Dispatch delivered successfully! I will be in touch shortly.");
        reset();
      } else {
        toast.error(resData.error || "Failed to deliver message. Please retry.");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to deliver message. Please retry.");
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full py-28 bg-background border-t border-border"
    >
      <div className="max-w-[1340px] mx-auto px-6 md:px-12">
        
        {/* Section Header Indicator */}
        <div className="flex flex-wrap items-end justify-between gap-6 pb-6 border-b border-border mb-16">
          <div className="flex items-center gap-3 font-mono text-2xs uppercase tracking-widest text-fg-subtle">
            <span className="text-accent font-bold">05</span>
            <span className="text-border">/</span>
            <span>COMMISSION & DIRECT INQUIRY</span>
          </div>
          <span className="text-xs text-fg-subtle font-mono uppercase tracking-widest">
            ACTIVE TRANSMISSION
          </span>
        </div>

        {/* Two-Column Grid */}
        <div className="hybrid-contact-content grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start opacity-0">
          
          {/* Left Column (5 cols): Editorial Inquiry */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-foreground leading-[0.95]">
                Let&apos;s build<br />
                <span className="text-accent">something</span><br />
                lasting.
              </h2>
              <p className="text-base text-fg-muted font-normal leading-relaxed">
                Whether you have an ambitious greenfield product to architect or need high-concurrency engineering firepower on an existing team, my inbox is open.
              </p>
            </div>

            {/* Direct Channels */}
            <div className="space-y-4 border-t border-border pt-6">
              {[
                { label: "Direct Mail", val: "mail@rakibutsho.dev", href: "mailto:mail@rakibutsho.dev" },
                { label: "LinkedIn", val: "in/rakibutsho", href: "https://www.linkedin.com/in/rakibutsho" },
                { label: "GitHub", val: "github.com/rakibutsho", href: "https://github.com/rakibutsho" },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-3 border-b border-border group hover:border-accent transition-colors"
                >
                  <span className="font-mono text-2xs uppercase tracking-widest text-fg-subtle">
                    {c.label}
                  </span>
                  <span className="text-sm text-foreground group-hover:text-accent font-medium transition-colors">
                    {c.val} ↗
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column (7 cols): Contact Form with shadcn Input & Card */}
          <div className="lg:col-span-7">
            <Card className="rounded-2xl border border-border bg-surface p-8 sm:p-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block font-mono text-2xs uppercase tracking-widest text-fg-subtle font-bold">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. Elena Rostova"
                      {...register("name", { required: true })}
                      className={`h-11 rounded-lg bg-background border-border text-sm ${errors.name ? "border-destructive" : ""}`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-2xs uppercase tracking-widest text-fg-subtle font-bold">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      placeholder="e.g. elena@domain.com"
                      {...register("email", { required: true })}
                      className={`h-11 rounded-lg bg-background border-border text-sm ${errors.email ? "border-destructive" : ""}`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-2xs uppercase tracking-widest text-fg-subtle font-bold">
                    Project Scope / Subject
                  </label>
                  <Input
                    type="text"
                    placeholder="Architecture advisory, full-time opportunity, SaaS build..."
                    {...register("subject")}
                    className="h-11 rounded-lg bg-background border-border text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-2xs uppercase tracking-widest text-fg-subtle font-bold">
                    Dispatch Narrative *
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Outline your timeline, goals, and technical requirements..."
                    {...register("message", { required: true })}
                    className={`w-full rounded-lg bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-fg-subtle focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:border-accent resize-none transition-colors ${
                      errors.message ? "border-destructive" : ""
                    }`}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-lg font-mono text-xs uppercase tracking-widest font-bold bg-foreground text-background hover:bg-accent hover:text-white transition-colors"
                >
                  {isSubmitting ? "TRANSMITTING..." : "SEND INQUIRY DISPATCH →"}
                </Button>
              </form>
            </Card>
          </div>

        </div>

      </div>
    </section>
  );
}
