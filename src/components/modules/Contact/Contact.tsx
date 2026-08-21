"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { AtSign, LinkedinIcon, Mail, Terminal as TerminalIcon, Send, TerminalSquare } from "lucide-react";

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
  const leftColRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const terminalLogRef = useRef<HTMLDivElement>(null);

  const [logs, setLogs] = useState<string[]>([
    "[OK] Boot sequence initiated...",
    "[OK] Loading network modules...",
    "[OK] Establishing secure connection...",
    "System ready. Awaiting user input..."
  ]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormInputs>({
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const watchName = watch("name");

  // Add terminal logs when user types
  useEffect(() => {
    if (watchName && watchName.length > 2 && logs.length < 3) {
      setLogs(prev => [...prev, `User identified: ${watchName}`]);
    }
  }, [watchName]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Left column animation
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftColRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Form animation
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, x: 40 },
          {
            opacity: 1, x: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.2,
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    setLogs(prev => [...prev, "Transmitting data packet..."]);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resData = await response.json();
      if (resData.success) {
        setLogs(prev => [...prev, "[200 OK] Message successfully delivered."]);
        toast.success("Message sent successfully! Thank you for reaching out.");
        reset();
        setTimeout(() => setLogs(["Connection established.", "Awaiting input..."]), 5000);
      } else {
        setLogs(prev => [...prev, "[ERROR] Transmission failed."]);
        toast.error(resData.error || "Something went wrong. Please try again later.");
      }
    } catch (error: any) {
      setLogs(prev => [...prev, "[ERROR] Transmission failed."]);
      toast.error(error.message || "Failed to send message. Please try again later.");
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full py-24 relative overflow-hidden font-sans text-white flex flex-col items-start"
    >
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col relative z-10">

        {/* Section identifier */}
        <div className="flex items-center gap-4 mb-2">
          <span className="text-sm font-mono text-[#2C74B3]">07</span>
          <div className="w-8 h-[1px] bg-[#205295]/50" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#2C74B3] font-bold">Contact</span>
        </div>

        {/* Heading */}
        <div ref={headingRef} className="w-full flex flex-col items-start mb-16 relative">
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-6 font-serif text-white">
            Let&apos;s build <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A8E0] to-[#2C74B3] drop-shadow-[0_0_15px_rgba(44,116,179,0.5)]">something.</span>
          </h2>
          <p className="text-[#8B9BB4] text-[15px] font-sans max-w-[500px] leading-[1.8]">
            Have a project or a role in mind? Initialize a connection and I'll get back to you as soon as possible.
          </p>
          <div className="absolute -inset-10 bg-[#2C74B3]/5 blur-3xl -z-10 rounded-full w-1/2" />
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-start w-full">

          {/* Left Column: Info & Terminal */}
          <div ref={leftColRef} className="lg:col-span-2 flex flex-col gap-8 w-full">

            {/* Social Links Panel */}
            <div className="flex flex-col gap-4 p-6 rounded-2xl bg-[#0A2647]/30 border border-[#1E3A5F] backdrop-blur-sm">
              <h3 className="font-mono text-[12px] uppercase tracking-widest text-[#4A6274] mb-2 flex items-center gap-2">
                <TerminalIcon className="w-4 h-4 text-[#2C74B3]" /> Network Links
              </h3>

              <a href="mailto:mail@rakibutsho.dev" className="group flex items-center gap-4 p-4 rounded-xl bg-[#0D1421] border border-[#1E3A5F] hover:border-[#60A8E0]/50 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-[#144272]/30 flex items-center justify-center text-[#60A8E0] group-hover:bg-[#60A8E0] group-hover:text-[#0A2647] transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[15px] font-semibold text-white group-hover:text-[#60A8E0] transition-colors">Email</span>
                  <span className="font-mono text-[12px] text-[#8B9BB4]">mail@rakibutsho.dev</span>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/rakibutsho" target="_blank" rel="noreferrer" className="group flex items-center gap-4 p-4 rounded-xl bg-[#0D1421] border border-[#1E3A5F] hover:border-[#60A8E0]/50 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-[#144272]/30 flex items-center justify-center text-[#60A8E0] group-hover:bg-[#60A8E0] group-hover:text-[#0A2647] transition-colors">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[15px] font-semibold text-white group-hover:text-[#60A8E0] transition-colors">LinkedIn</span>
                  <span className="font-mono text-[12px] text-[#8B9BB4]">/in/rakibutsho</span>
                </div>
              </a>
            </div>

            {/* Live Terminal Log */}
            <div className="hidden md:flex flex-col rounded-2xl bg-[#09090B] border border-[#1E3A5F] overflow-hidden shadow-2xl h-[200px]">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#144272]/20 border-b border-[#1E3A5F]">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 font-mono text-[11px] text-[#8B9BB4]">server_log.sh</span>
              </div>
              <div ref={terminalLogRef} className="p-4 flex flex-col gap-2 font-mono text-[12px] overflow-y-auto">
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-2 items-start opacity-100">
                    <span className="text-[#205295] shrink-0">›</span>
                    <span className={log.includes("ERROR") ? "text-red-400" : log.includes("200") || log.includes("OK") ? "text-green-400" : "text-[#60A8E0]"}>{log}</span>
                  </div>
                ))}
                <div className="flex gap-2 items-start mt-1">
                  <span className="text-[#2C74B3] shrink-0">~</span>
                  <span className="w-2 h-3 bg-[#60A8E0]/70 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-3 w-full">
            <div className="w-full p-6 sm:p-10 rounded-[24px] bg-[#0A2647]/60 backdrop-blur-xl border border-[#205295]/50 flex flex-col gap-8 shadow-[0_0_40px_rgba(10,38,71,0.5)]">

              <div className="font-mono text-[13px] text-[#60A8E0] flex items-center gap-2">
                <TerminalSquare className="w-4 h-4" />
                <span>./init_transmission.sh</span>
              </div>

              <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-2 group">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-[#4A6274] group-focus-within:text-[#60A8E0] transition-colors">
                      <span className="text-[#2C74B3] mr-1">$</span> enter_name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      {...register("name", { required: true })}
                      className="w-full px-5 py-3.5 rounded-lg bg-[#071626]/80 border border-[#1E3A5F] text-[15px] text-white placeholder:text-[#1E3A5F] font-sans focus:outline-none focus:border-[#60A8E0] focus:shadow-[0_0_15px_rgba(96,168,224,0.15)] transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2 group">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-[#4A6274] group-focus-within:text-[#60A8E0] transition-colors">
                      <span className="text-[#2C74B3] mr-1">$</span> input_email
                    </label>
                    <input
                      type="email"
                      placeholder="john@server.com"
                      {...register("email", { required: true })}
                      className="w-full px-5 py-3.5 rounded-lg bg-[#071626]/80 border border-[#1E3A5F] text-[15px] text-white placeholder:text-[#1E3A5F] font-sans focus:outline-none focus:border-[#60A8E0] focus:shadow-[0_0_15px_rgba(96,168,224,0.15)] transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2 group">
                  <label className="font-mono text-[11px] uppercase tracking-wider text-[#4A6274] group-focus-within:text-[#60A8E0] transition-colors">
                    <span className="text-[#2C74B3] mr-1">$</span> write_payload
                  </label>
                  <textarea
                    placeholder="Hello, I'd like to discuss..."
                    {...register("message", { required: true })}
                    rows={5}
                    className="w-full px-5 py-4 rounded-lg bg-[#071626]/80 border border-[#1E3A5F] text-[15px] text-white placeholder:text-[#1E3A5F] font-sans resize-none focus:outline-none focus:border-[#60A8E0] focus:shadow-[0_0_15px_rgba(96,168,224,0.15)] transition-all"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`relative overflow-hidden w-full mt-2 py-4 rounded-lg font-mono font-bold text-[14px] tracking-widest uppercase transition-all duration-300 group ${isSubmitting
                    ? "bg-[#0A2647] border border-[#1E3A5F] text-[#4A6274] cursor-wait"
                    : "bg-[#2C74B3] hover:bg-[#144272] border border-[#60A8E0]/30 text-white shadow-[0_0_20px_rgba(44,116,179,0.4)] hover:shadow-[0_0_30px_rgba(96,168,224,0.5)] cursor-pointer"
                    }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <div className="w-4 h-4 border-2 border-[#4A6274] border-t-[#60A8E0] rounded-full animate-spin" />
                      Transmitting...
                    </span>
                  ) : (
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Send className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                      Execute Transmission
                    </span>
                  )}
                  {/* Subtle hover scanline inside button */}
                  {!isSubmitting && (
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-y-full group-hover:animate-scanline" />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
