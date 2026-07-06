"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      setSending(true);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Message sent successfully! Thank you for reaching out.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(
          data.error || "Something went wrong. Please try again later.",
        );
      }
    } catch (error: any) {
      toast.error(
        error.message || "Failed to send message. Please try again later.",
      );
    } finally {
      setSending(false);
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
              href="https://github.com/rakib-utsho"
              target="_blank"
              className="hover:text-emerald-400 transition-colors"
            >
              github/rakib-utsho
            </a>
            <span className="text-white/20">•</span>
            <a
              href="https://www.linkedin.com/in/md-rakibutsho-cse"
              target="_blank"
              className="hover:text-emerald-400 transition-colors"
            >
              linkedin/rakib-utsho
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
            onSubmit={handleSubmit}
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
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-[#121214] border border-white/5 text-[14px] text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-mono uppercase tracking-widest text-[#a1a1aa]">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                title="Please enter a valid email address (e.g., name@example.com)"
                className="w-full px-4 py-3 rounded-lg bg-[#121214] border border-white/5 text-[14px] text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-mono uppercase tracking-widest text-[#a1a1aa]">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-[#121214] border border-white/5 text-[14px] text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
              <div className="flex flex-wrap gap-2 mt-1">
                {["Job Opportunity", "Freelance Project", "Networking", "Project Inquiry"].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setFormData({ ...formData, subject: suggestion })}
                    className={`text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
                      formData.subject === suggestion
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
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-[#121214] border border-white/5 text-[14px] text-white resize-none focus:outline-none focus:border-emerald-500/50 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full mt-4 py-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {sending ? "Sending..." : "Send"}{" "}
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
