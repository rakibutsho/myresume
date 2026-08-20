"use client";

import { X, Download } from "lucide-react";
import { useEffect } from "react";

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

const getDownloadUrl = (url: string) => {
  if (url.includes("drive.google.com")) {
    const match = url.match(/\/d\/(.*?)\//);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
  }
  return url;
};

export const PdfModal = ({ isOpen, onClose, pdfUrl }: PdfModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0A2647]/80 backdrop-blur-md p-4 sm:p-6 md:p-8">
      {/* Backdrop click to close */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      <div className="relative w-full max-w-5xl h-full flex flex-col bg-[#0A2647] rounded-xl overflow-hidden border border-[#205295] shadow-[0_0_40px_rgba(10,38,71,0.8)]">
        {/* Terminal Header */}
        <div className="relative flex items-center justify-between px-4 py-3 border-b border-[#205295] bg-gradient-to-r from-[#144272] to-[#0A2647]">
          {/* Left: Traffic light dots */}
          <div className="flex items-center gap-2 relative z-10">
            <button
              onClick={onClose}
              aria-label="Close Resume Modal"
              className="w-3.5 h-3.5 rounded-full bg-red-500/90 hover:bg-red-400 shadow-[0_0_10px_rgba(239,68,68,0.6)] flex items-center justify-center group cursor-pointer"
            >
              <X className="w-2.5 h-2.5 text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
            </button>
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/90 shadow-[0_0_10px_rgba(234,179,8,0.6)]" />
            <div className="w-3.5 h-3.5 rounded-full bg-green-500/90 shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
          </div>

          {/* Center: Title */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[#8B9BB4] font-mono text-[13px] tracking-wider">
              bash - view_resume.pdf
            </span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 relative z-10">
            <a
              href={getDownloadUrl(pdfUrl)}
              download
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#205295]/30 text-[#60A8E0] hover:bg-[#205295]/60 hover:text-white transition-colors text-[13px] font-mono border border-[#205295]/50 group"
            >
              <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              <span className="hidden sm:inline">download_file</span>
            </a>
          </div>
        </div>

        {/* Modal Body / PDF Viewer */}
        <div className="flex-1 w-full bg-black/40 relative">
          <iframe
            src={
              pdfUrl.includes("drive.google.com")
                ? pdfUrl.replace(/\/view.*$/, "/preview")
                : `${pdfUrl}#toolbar=0&view=FitH`
            }
            className="w-full h-full border-none absolute inset-0"
            title="Resume PDF"
          />
        </div>
      </div>
    </div>
  );
};
