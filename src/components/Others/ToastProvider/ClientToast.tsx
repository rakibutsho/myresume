"use client";

import { useEffect, useState } from "react";
import ToastProvider from "./ToastProvider";

export default function ClientToast() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <ToastProvider />;
}
