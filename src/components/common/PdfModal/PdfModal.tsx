"use client";

import { Download, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  const previewUrl = pdfUrl.includes("drive.google.com")
    ? pdfUrl.replace(/\/view.*$/, "/preview")
    : `${pdfUrl}#toolbar=0&view=FitH`;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl h-[85vh] flex flex-col p-0 gap-0 border-border bg-background">
        <DialogHeader className="p-4 border-b border-border flex flex-row items-center justify-between space-y-0 pr-12">
          <div className="flex items-center gap-3">
            <span className="text-2xs font-bold uppercase tracking-widest text-accent">
              DOC
            </span>
            <span className="text-border">|</span>
            <DialogTitle className="text-sm font-semibold tracking-wider normal-case">
              Curriculum Vitae — Md. Rakibul Islam
            </DialogTitle>
          </div>
          <DialogDescription className="sr-only">
            PDF Preview of Rakibul Islam&apos;s Curriculum Vitae
          </DialogDescription>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs uppercase tracking-wider gap-2 h-8"
              asChild
            >
              <a
                href={getDownloadUrl(pdfUrl)}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs uppercase tracking-wider gap-2 h-8"
              asChild
            >
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open Drive</span>
              </a>
            </Button>
          </div>
        </DialogHeader>
        <div className="flex-1 w-full bg-surface relative">
          <iframe
            src={previewUrl}
            className="w-full h-full border-none absolute inset-0"
            title="Resume PDF"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
