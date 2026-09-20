"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Copy,
  Check,
  Send,
  Sparkles,
  Terminal as TerminalIcon,
} from "lucide-react";
import { Github, Linkedin } from "@/components/common/Icons";
import { BlurText } from "@/components/common/BlurText";

interface ContactFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormInputs>({
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mail@rakibutsho.dev");
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2200);
  };

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resData = await response.json();
      if (resData.success) {
        toast.success(
          "Message transmitted successfully! I will reply promptly.",
        );
        reset();
      } else {
        toast.error(
          resData.error || "Failed to transmit message. Please retry.",
        );
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to transmit message. Please retry.");
    }
  };

  return (
    <section
      id="contact"
      className="w-full py-24 px-6 border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400 text-xs font-mono">
            <TerminalIcon className="w-3.5 h-3.5 text-sky-400" />
            <span>$ ./contact.sh --transmit</span>
            <span className="text-white/20">•</span>
            <span className="text-slate-400">secure.channel</span>
          </div>

          <BlurText
            text="Let's engineer something extraordinary together."
            highlightWords={["extraordinary", "together."]}
            highlightClass="text-shimmer"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
            as="h2"
          />

          <p className="text-base text-slate-400 max-w-2xl font-normal leading-relaxed">
            I am currently open to full-stack and frontend software engineering
            roles, high-impact freelance projects, and technical collaborations.
          </p>
        </div>

        {/* 2-Column Split: Direct Channels vs Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 5 Cols: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glow-card p-8 rounded-2xl border border-white/[0.08] bg-[#0F1117] space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Direct Inquiries
                </h3>
                <p className="text-xs text-slate-400 font-normal leading-relaxed">
                  Feel free to send a note directly to my inbox or connect on
                  professional platforms.
                </p>
              </div>

              {/* Copy Email Button Card */}
              <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono text-slate-400">
                      Primary Email
                    </div>
                    <div className="text-xs font-mono font-medium text-white truncate">
                      mail@rakibutsho.dev
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg border border-white/[0.1] bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors shrink-0"
                  aria-label="Copy email"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Social Channels List */}
              <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                <a
                  href="https://github.com/rakibutsho"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-white/[0.04] hover:border-white/[0.15] hover:bg-white/[0.03] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                    <span className="text-xs font-medium text-slate-200 group-hover:text-white">
                      GitHub
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 group-hover:text-sky-400 transition-colors">
                    @rakibutsho ↗
                  </span>
                </a>

                <a
                  href="https://www.linkedin.com/in/rakibutsho"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-white/[0.04] hover:border-white/[0.15] hover:bg-white/[0.03] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                    <span className="text-xs font-medium text-slate-200 group-hover:text-white">
                      LinkedIn
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 group-hover:text-sky-400 transition-colors">
                    /in/rakibutsho ↗
                  </span>
                </a>
              </div>

              {/* Availability Status Box */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2.5 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span>Response expected within 24 business hours</span>
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glow-card p-8 sm:p-10 rounded-2xl border border-white/[0.08] bg-[#0F1117]">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-medium">
                      Your Name *
                    </label>
                    <Input
                      type="text"
                      placeholder="Jane Doe"
                      {...register("name", { required: true })}
                      className={`h-11 rounded-xl bg-[#08090D] border-white/[0.08] text-sm text-white placeholder:text-slate-500 focus-visible:ring-sky-400 ${
                        errors.name ? "border-red-500/80" : ""
                      }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-medium">
                      Your Email *
                    </label>
                    <Input
                      type="email"
                      placeholder="jane@company.com"
                      {...register("email", { required: true })}
                      className={`h-11 rounded-xl bg-[#08090D] border-white/[0.08] text-sm text-white placeholder:text-slate-500 focus-visible:ring-sky-400 ${
                        errors.email ? "border-red-500/80" : ""
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-medium">
                    Subject / Project Context
                  </label>
                  <Input
                    type="text"
                    placeholder="Full-Stack Opportunity / Project Proposal / Discussion"
                    {...register("subject")}
                    className="h-11 rounded-xl bg-[#08090D] border-white/[0.08] text-sm text-white placeholder:text-slate-500 focus-visible:ring-sky-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-medium">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Describe your project, timeline, or engineering opportunity..."
                    {...register("message", { required: true })}
                    className={`w-full rounded-xl bg-[#08090D] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 resize-none transition-colors ${
                      errors.message ? "border-red-500/80" : ""
                    }`}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 rounded-full bg-white text-black font-semibold hover:bg-slate-200 transition-all duration-300 text-xs uppercase tracking-wider gap-2 shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
                >
                  {isSubmitting ? (
                    <span>Transmitting Message...</span>
                  ) : (
                    <>
                      <span>Transmit Inquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
