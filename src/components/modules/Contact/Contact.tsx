"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

gsap.registerPlugin(ScrollTrigger);

interface ContactFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formRef    = useRef<HTMLFormElement>(null);

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
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: leftColRef.current, start: "top 80%", toggleActions: "play none none none" },
          }
        );
      }
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, x: 40 },
          {
            opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.15,
            scrollTrigger: { trigger: formRef.current, start: "top 80%", toggleActions: "play none none none" },
          }
        );
      }
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
        toast.success("Message sent successfully! I'll get back to you soon.");
        reset();
      } else {
        toast.error(resData.error || "Something went wrong. Please try again.");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to send message. Please try again.");
    }
  };

  const inputStyle = {
    background: "#1E1E1E",
    border: "1px solid #3D3D3D",
    borderRadius: "8px",
    color: "#F5F5F5",
    fontFamily: "var(--font-open-sans)",
    fontSize: "14px",
    width: "100%",
    padding: "14px 16px",
    outline: "none",
    transition: "border-color 0.2s ease",
  } as React.CSSProperties;

  const labelStyle = {
    display: "block",
    fontFamily: "var(--font-roboto)",
    fontSize: "11px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.12em",
    color: "#A6A6A6",
    marginBottom: "8px",
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full py-28 relative"
      style={{ background: "#121212" }}
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 items-start">

          {/* ── Left: heading + contacts ───────────────── */}
          <div ref={leftColRef}>
            <span className="breadcrumb-label block mb-8">... /Contact ...</span>

            <h2
              className="font-mono font-bold text-white leading-tight mb-6"
              style={{
                fontFamily: "var(--font-roboto)",
                fontSize: "clamp(32px, 5vw, 60px)",
                letterSpacing: "-0.02em",
              }}
            >
              Let&apos;s build<br />something.
            </h2>

            <p
              className="font-sans text-[15px] leading-[1.8] mb-12 max-w-[380px]"
              style={{ color: "#A6A6A6" }}
            >
              Have a project or a role in mind? Reach out and I&apos;ll get back to you as quickly as possible.
            </p>

            {/* Contact links */}
            <div className="flex flex-col gap-4">
              {[
                { label: "Email", value: "mail@rakibutsho.dev", href: "mailto:mail@rakibutsho.dev" },
                { label: "LinkedIn", value: "/in/rakibutsho", href: "https://www.linkedin.com/in/rakibutsho" },
                { label: "GitHub", value: "github.com/rakibutsho", href: "https://github.com/rakibutsho" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 py-4 transition-colors"
                  style={{ borderBottom: "1px solid #3D3D3D" }}
                >
                  <span
                    className="font-mono text-[11px] uppercase tracking-[0.15em] w-20 shrink-0"
                    style={{ color: "#A6A6A6", fontFamily: "var(--font-roboto)" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="font-sans text-[14px] transition-colors group-hover:text-white"
                    style={{ color: "#F5F5F5" }}
                  >
                    {item.value}
                  </span>
                  <span
                    className="ml-auto font-mono text-[16px] transition-transform group-hover:translate-x-1"
                    style={{ color: "#A6A6A6" }}
                  >
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: form ───────────────────────────── */}
          <div
            className="p-8 md:p-10"
            style={{
              background: "#1E1E1E",
              border: "1px solid #3D3D3D",
              borderRadius: "14px",
            }}
          >
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label style={labelStyle}>Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    {...register("name", { required: true })}
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = "#FFFFFF"; }}
                    onBlur={(e)  => { e.target.style.borderColor = errors.name ? "#F87171" : "#3D3D3D"; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    {...register("email", { required: true })}
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = "#FFFFFF"; }}
                    onBlur={(e)  => { e.target.style.borderColor = errors.email ? "#F87171" : "#3D3D3D"; }}
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label style={labelStyle}>Subject</label>
                <input
                  type="text"
                  placeholder="Project idea, job offer, collaboration..."
                  {...register("subject")}
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = "#FFFFFF"; }}
                  onBlur={(e)  => { e.target.style.borderColor = "#3D3D3D"; }}
                />
              </div>

              {/* Message */}
              <div>
                <label style={labelStyle}>Message</label>
                <textarea
                  placeholder="Hello, I'd like to discuss..."
                  {...register("message", { required: true })}
                  rows={5}
                  style={{ ...inputStyle, resize: "none" }}
                  onFocus={(e) => { e.target.style.borderColor = "#FFFFFF"; }}
                  onBlur={(e)  => { e.target.style.borderColor = errors.message ? "#F87171" : "#3D3D3D"; }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="pill-btn pill-btn-solid w-full justify-center text-[14px] mt-2 py-4 font-semibold disabled:opacity-50 disabled:cursor-wait"
                style={{ fontFamily: "var(--font-open-sans)" }}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-3">
                    <span
                      className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
                      style={{ borderColor: "#A6A6A6", borderTopColor: "transparent" }}
                    />
                    Sending...
                  </span>
                ) : (
                  "Send Message →"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
