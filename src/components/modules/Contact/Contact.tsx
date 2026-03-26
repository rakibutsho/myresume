"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Phone, Send, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "rakibutsho@gmail.com",
    href: "mailto:rakibutsho@gmail.com",
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

const contactSocials = [
  {
    icon: Github,
    href: "https://github.com/rakib-utsho",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/rakib-utsho/",
    label: "LinkedIn",
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
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setSending(true);

    // Construct mailto link
    const subject = encodeURIComponent(
      `Portfolio Contact from ${formData.name}`,
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    );
    window.open(
      `mailto:rakibutsho@gmail.com?subject=${subject}&body=${body}`,
      "_self",
    );

    setTimeout(() => {
      setSending(false);
      toast.success("Email client opened! Thank you for reaching out.");
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <section id="contact" ref={sectionRef} className="w-full mt-20">
      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        {/* Heading */}
        <div ref={headingRef} className="mb-12">
          <h2 className="text-4xl sm:text-6xl font-bold">
            Get In{" "}
            <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl">
            Have a project idea or want to collaborate? I&apos;d love to hear
            from you. Let&apos;s build something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="lg:col-span-3 p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
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
                    w-full px-4 py-3 rounded-xl
                    bg-white/5 border border-white/10
                    text-white placeholder:text-white/30
                    focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25
                    transition-all duration-200
                  "
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
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
                    w-full px-4 py-3 rounded-xl
                    bg-white/5 border border-white/10
                    text-white placeholder:text-white/30
                    focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25
                    transition-all duration-200
                  "
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
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
                  w-full px-4 py-3 rounded-xl resize-none
                  bg-white/5 border border-white/10
                  text-white placeholder:text-white/30
                  focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25
                  transition-all duration-200
                "
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="
                inline-flex items-center gap-2
                px-6 py-3 rounded-xl text-sm font-semibold text-white
                bg-linear-to-r from-fuchsia-500 via-purple-500 to-violet-500
                hover:brightness-110 transition
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              <Send className="h-4 w-4" />
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="lg:col-span-2 space-y-5">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              const content = (
                <div
                  className="
                    flex items-center gap-4 p-5 rounded-2xl
                    border border-white/10 bg-white/5 backdrop-blur-sm
                    hover:bg-white/10 hover:border-white/20
                    transition-all duration-300
                  "
                >
                  <div className="h-12 w-12 rounded-xl bg-linear-to-br from-fuchsia-500/20 to-violet-500/20 border border-fuchsia-500/20 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-fuchsia-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider">
                      {info.label}
                    </p>
                    <p className="text-sm text-white font-medium mt-0.5">
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

            {/* Social links */}
            <div className="flex gap-3 pt-2">
              {contactSocials.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    aria-label={social.label}
                    className="
                      group flex h-12 w-12 items-center justify-center rounded-xl
                      border border-white/10 bg-white/5 text-white/60
                      transition-all duration-200
                      hover:bg-white/10 hover:text-white hover:-translate-y-0.5
                    "
                  >
                    <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
