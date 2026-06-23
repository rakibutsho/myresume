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
    <section id="contact" ref={sectionRef} className="w-full pt-15 pb-5 relative bg-[#09090b]">
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Premium Header */}
        <div ref={headingRef} className="mb-16 text-center max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              Get In Touch
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-[1.1] tracking-tight">
            Let&apos;s Build{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-[#10b981]">
              Together
            </span>
          </h2>
          
          <p className="text-xl text-[#a1a1aa] font-light leading-relaxed">
            Hiring for a frontend role or planning a product build? Share your goals and timeline. I usually respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative p-8 md:p-10 rounded-[2rem] bg-[#121214] border border-white/5 shadow-2xl overflow-hidden"
            >
              {/* Subtle Background Pattern */}
              <div className="absolute inset-0 opacity-[0.15] transition-opacity duration-500" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

              {/* Subtle ambient light inside the form */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />

              <div className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-white mb-3">
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
                        bg-[#09090b] border border-white/10 shadow-inner
                        text-white placeholder:text-[#a1a1aa]/50 font-medium
                        focus:outline-none focus:border-emerald-500/50 focus:bg-[#09090b]
                        transition-all duration-300
                      "
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-white mb-3">
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
                        bg-[#09090b] border border-white/10 shadow-inner
                        text-white placeholder:text-[#a1a1aa]/50 font-medium
                        focus:outline-none focus:border-emerald-500/50 focus:bg-[#09090b]
                        transition-all duration-300
                      "
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-white mb-3">
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
                      bg-[#09090b] border border-white/10 shadow-inner
                      text-white placeholder:text-[#a1a1aa]/50 font-medium
                      focus:outline-none focus:border-emerald-500/50 focus:bg-[#09090b]
                      transition-all duration-300
                    "
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <p className="text-sm text-[#a1a1aa] font-light max-w-xs leading-relaxed">
                    Open to full-time roles, contract work, and long-term product collaboration.
                  </p>
                  <button
                    type="submit"
                    disabled={sending}
                    className="
                      inline-flex items-center justify-center gap-2 shrink-0
                      px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest text-black
                      bg-white hover:bg-emerald-400
                      transition-all duration-300
                      shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]
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
                    group flex items-center gap-5 p-6 md:p-8 rounded-[2rem]
                    bg-[#121214] border border-white/5
                    shadow-2xl
                    hover:border-white/10 hover:-translate-y-1
                    transition-all duration-500
                  "
                >
                  {/* 3D Icon Container */}
                  <div className="relative w-14 h-14 rounded-[1.25rem] bg-[#09090b] shadow-inner border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-emerald-500/30 transition-all duration-500">
                    <Icon className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#a1a1aa] mb-2">
                      {info.label}
                    </p>
                    <p className="text-lg text-white font-bold tracking-tight group-hover:text-emerald-400 transition-colors">
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
