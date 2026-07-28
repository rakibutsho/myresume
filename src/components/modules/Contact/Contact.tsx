"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { ArrowRight, Mail, LinkedinIcon, AtSign } from "lucide-react";

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
      className="w-full relative overflow-hidden font-sans text-white flex flex-col items-start"
    >
      {/* Modern Background Glows */}

      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col items-start relative z-10">
        {/* Section Identifier */}
        <div className="fade-up-element flex items-center gap-4 mb-2">
          <span className="text-sm font-mono text-emerald-400">07</span>
          <div className="w-8 h-[1px] bg-emerald-500/50" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 font-bold">
            Contact
          </span>
        </div>

        {/* Heading & Contact Info */}
        <div
          ref={headingRef}
          className="w-full flex flex-col items-start mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-6 font-serif">
            <span className="text-white">Let's build</span>{" "}
            <span className="text-emerald-400">something.</span>
          </h2>
          <p className="text-[#a1a1aa] text-[15px] font-medium max-w-[500px] leading-[1.8]">
            Have a project or a role in mind? Send a message and I'll get back
            to you soon.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="w-full">
          <div className="w-full p-8 md:p-12 rounded-[24px] bg-[#0f0f11] border border-white/5 flex flex-col gap-10 hover:border-white/10 transition-all duration-300">
            {/* Tabs */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-[13px] font-bold tracking-wide transition-colors">
                <AtSign className="w-4 h-4 text-emerald-400" /> Email
              </button>
              <a
                href="https://www.linkedin.com/in/rakibutsho"
                target="_blank"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent border border-transparent text-[#a1a1aa] text-[13px] font-bold tracking-wide hover:bg-white/5 hover:border-white/10 hover:text-white transition-all"
              >
                <LinkedinIcon className="w-4 h-4" /> LinkedIn
              </a>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Your name"
                    {...register("name", { required: true })}
                    className="w-full px-5 py-4 rounded-xl bg-[#18181b] border border-white/5 text-[15px] text-white placeholder:text-[#6b7280] focus:outline-none focus:border-white/20 focus:bg-[#1f1f22] transition-all"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    {...register("email", { required: true })}
                    className="w-full px-5 py-4 rounded-xl bg-[#18181b] border border-white/5 text-[15px] text-white placeholder:text-[#6b7280] focus:outline-none focus:border-white/20 focus:bg-[#1f1f22] transition-all"
                  />
                  <Mail className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7280]" />
                </div>
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  placeholder="Your message"
                  {...register("message", { required: true })}
                  rows={6}
                  className="w-full px-5 py-4 rounded-xl bg-[#18181b] border border-white/5 text-[15px] text-white placeholder:text-[#6b7280] resize-none focus:outline-none focus:border-white/20 focus:bg-[#1f1f22] transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full mt-4 py-4 rounded-xl font-bold text-[14px] tracking-wide transition-all cursor-pointer ${
                  isSubmitting
                    ? "bg-white/5 backdrop-blur-md border border-white/10 text-white/70 cursor-not-allowed"
                    : "bg-[#34d399] hover:bg-[#2ebc89] text-black"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white/70"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 mt-32 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[#6b7280] font-mono text-[10px] uppercase tracking-widest">
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
      </div> */}
    </section>
  );
}

export default Contact;
