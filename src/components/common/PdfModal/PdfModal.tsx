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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 md:p-8">
      {/* Backdrop click to close */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      <div className="relative w-full max-w-5xl h-full flex flex-col bg-[#09090b] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0f0f11]">
          <h3 className="text-white font-serif tracking-wide text-xl">Resume</h3>
          <div className="flex items-center gap-3">
            <a
              href={getDownloadUrl(pdfUrl)}
              download
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors text-sm font-medium border border-emerald-500/20"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </a>
            <button
              onClick={onClose}
              aria-label="Close Resume Modal"
              className="p-1.5 rounded-lg text-[#a1a1aa] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="flex-1 w-full bg-white/5 relative">
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
