"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "rakibutsho1920@gmail.com",
    href: "mailto:rakibutsho1920@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+880 1707-934655",
    href: "tel:+8801707934655",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dhaka, Bangladesh",
    href: null,
  },
];

function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
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
          { opacity: 0, x: -40, scale: 0.98 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // Info Cards
      if (infoRef.current) {
        const cards = infoRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: infoRef.current,
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
      toast.error("Please fill in all fields");
      return;
    }

    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
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
        setFormData({ name: "", email: "", message: "" });
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
    <section id="contact" ref={sectionRef} className="w-full pt-32 pb-20 relative">
      <div className="w-full max-w-6xl mx-auto px-4">
        
        {/* Premium Header */}
        <div ref={headingRef} className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0f172a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/5 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
              Get In Touch
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white leading-tight">
            Let&apos;s Build{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 via-emerald-400 to-[#10b981]">
              Together
            </span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed font-medium">
            Hiring for a frontend role or planning a product build? Share your goals and timeline. I usually respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative p-8 md:p-10 rounded-[2rem] bg-[#131b2c] border border-[#1e293b] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden"
            >
              {/* Subtle ambient light inside the form */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />

              <div className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-emerald-400/80 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="John Doe"
                      className="
                        w-full px-5 py-4 rounded-xl
                        bg-[#0f172a] border border-[#1e293b] shadow-inner
                        text-white placeholder:text-white/20 font-medium
                        focus:outline-none focus:border-emerald-500/50 focus:bg-[#131b2c]
                        transition-all duration-300
                      "
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-emerald-400/80 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="john@example.com"
                      className="
                        w-full px-5 py-4 rounded-xl
                        bg-[#0f172a] border border-[#1e293b] shadow-inner
                        text-white placeholder:text-white/20 font-medium
                        focus:outline-none focus:border-emerald-500/50 focus:bg-[#131b2c]
                        transition-all duration-300
                      "
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-emerald-400/80 mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell me about your project or idea..."
                    rows={5}
                    className="
                      w-full px-5 py-4 rounded-xl resize-none
                      bg-[#0f172a] border border-[#1e293b] shadow-inner
                      text-white placeholder:text-white/20 font-medium
                      focus:outline-none focus:border-emerald-500/50 focus:bg-[#131b2c]
                      transition-all duration-300
                    "
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-white/40 font-medium max-w-xs">
                    Open to full-time roles, contract work, and long-term product collaboration.
                  </p>
                  <button
                    type="submit"
                    disabled={sending}
                    className="
                      inline-flex items-center justify-center gap-2 shrink-0
                      px-8 py-4 rounded-xl text-sm font-bold text-slate-900
                      bg-linear-to-r from-emerald-500 to-[#10b981]
                      hover:brightness-110 transition-all duration-300
                      shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]
                      disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
                    "
                  >
                    {sending ? "Sending..." : "Send Message"}
                    <Send className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Contact Info Sidebar */}
          <div ref={infoRef} className="lg:col-span-5 space-y-4">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              const content = (
                <div
                  className="
                    group flex items-center gap-5 p-6 rounded-[2rem]
                    bg-[#131b2c] border border-[#1e293b]
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_10px_20px_rgba(0,0,0,0.2)]
                    hover:border-emerald-500/30 hover:bg-[#152033] hover:-translate-y-1
                    transition-all duration-300
                  "
                >
                  {/* 3D Icon Container */}
                  <div className="relative w-14 h-14 rounded-2xl bg-[#0f172a] shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_8px_16px_rgba(0,0,0,0.4)] border border-[#1e293b] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-400/80 mb-1">
                      {info.label}
                    </p>
                    <p className="text-base text-white font-semibold group-hover:text-emerald-300 transition-colors">
                      {info.value}
                    </p>
                  </div>
                </div>
              );

              return info.href ? (
                <Link
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith("mailto") ? undefined : "_blank"}
                  className="block"
                >
                  {content}
                </Link>
              ) : (
                <div key={info.label}>{content}</div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;
