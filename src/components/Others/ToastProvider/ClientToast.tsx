"use client";

import { useSyncExternalStore } from "react";
import ToastProvider from "./ToastProvider";

const emptySubscribe = () => () => {};

export default function ClientToast() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!mounted) return null;
  return <ToastProvider />;
}
