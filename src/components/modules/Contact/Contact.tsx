"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ContactFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormInputs>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const subjectValue = watch("subject");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading & Info
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // Form
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.2,
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await response.json();
      if (resData.success) {
        toast.success("Message sent successfully! Thank you for reaching out.");
        reset();
      } else {
        toast.error(
          resData.error || "Something went wrong. Please try again later.",
        );
      }
    } catch (error: any) {
      toast.error(
        error.message || "Failed to send message. Please try again later.",
      );
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full py-24 relative bg-[#0a0a0c] border-t border-white/5 font-sans text-white flex flex-col items-center"
    >
      <div className="w-full max-w-[800px] mx-auto px-4 md:px-8 flex flex-col items-center">
        {/* Header Bar */}
        <div className="text-xs font-mono text-[#a1a1aa] mb-12 uppercase tracking-widest text-center">
          — 05 - GET IN TOUCH
        </div>

        {/* Heading & Contact Info */}
        <div
          ref={headingRef}
          className="w-full flex flex-col items-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-8 text-center">
            <span className="font-serif italic text-white">
              Let's build something
            </span>{" "}
            <span className="font-serif italic text-emerald-400">
              together.
            </span>
          </h2>

          <div className="flex items-center gap-2 mb-10 group">
            <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            <a
              href="mailto:rakibutsho1920@gmail.com"
              className="text-[15px] md:text-lg font-mono text-white/90 hover:text-emerald-400 transition-colors"
            >
              rakibutsho1920@gmail.com
            </a>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 text-[#a1a1aa] font-mono text-[11px] md:text-xs uppercase tracking-widest">
            <a
              href="https://github.com/rakibutsho"
              target="_blank"
              className="hover:text-emerald-400 transition-colors"
            >
              github/rakibutsho
            </a>
            <span className="text-white/20">•</span>
            <a
              href="https://www.linkedin.com/in/rakibutsho"
              target="_blank"
              className="hover:text-emerald-400 transition-colors"
            >
              linkedin/rakibutsho
            </a>
            <span className="text-white/20">•</span>
            <a
              href="tel:+8801707934655"
              className="hover:text-emerald-400 transition-colors"
            >
              +880 1707-934655
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full">
          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className="w-full p-6 md:p-10 rounded-2xl bg-[#0f0f11] border border-white/5 shadow-2xl flex flex-col gap-6"
          >
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#6b7280] mb-2">
              SEND A MESSAGE
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-mono uppercase tracking-widest text-[#a1a1aa]">
                Your Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className={`w-full px-4 py-3 rounded-lg bg-[#121214] border ${errors.name ? "border-red-500/50" : "border-white/5"} text-[14px] text-white focus:outline-none focus:border-emerald-500/50 transition-colors`}
              />
              {errors.name && (
                <span className="text-red-400 text-xs font-mono">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-mono uppercase tracking-widest text-[#a1a1aa]">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                className={`w-full px-4 py-3 rounded-lg bg-[#121214] border ${errors.email ? "border-red-500/50" : "border-white/5"} text-[14px] text-white focus:outline-none focus:border-emerald-500/50 transition-colors`}
              />
              {errors.email && (
                <span className="text-red-400 text-xs font-mono">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-mono uppercase tracking-widest text-[#a1a1aa]">
                Subject
              </label>
              <input
                type="text"
                {...register("subject")}
                className="w-full px-4 py-3 rounded-lg bg-[#121214] border border-white/5 text-[14px] text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
              <div className="flex flex-wrap gap-2 mt-1">
                {[
                  "Job Opportunity",
                  "Freelance Project",
                  "Networking",
                  "Project Inquiry",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() =>
                      setValue("subject", suggestion, { shouldValidate: true })
                    }
                    className={`text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
                      subjectValue === suggestion
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-[#121214] text-[#a1a1aa] border-white/5 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-mono uppercase tracking-widest text-[#a1a1aa]">
                Message
              </label>
              <textarea
                {...register("message", { required: "Message is required" })}
                rows={4}
                className={`w-full px-4 py-3 rounded-lg bg-[#121214] border ${errors.message ? "border-red-500/50" : "border-white/5"} text-[14px] text-white resize-none focus:outline-none focus:border-emerald-500/50 transition-colors`}
              />
              {errors.message && (
                <span className="text-red-400 text-xs font-mono">
                  {errors.message.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 py-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Sending..." : "Send"}{" "}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 mt-32 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[#6b7280] font-mono text-[10px] uppercase tracking-widest">
        <div>
          © {new Date().getFullYear()} Rakibul Islam — crafted with care in
          Dhaka.
        </div>
        <div>
          last updated{" "}
          {new Date().toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}{" "}
          - v1.0
        </div>
      </div>
    </section>
  );
}

export default Contact;
