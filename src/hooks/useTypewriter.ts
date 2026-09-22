import { useState, useRef, useCallback, useEffect } from "react";

interface TypewriterOptions {
  charSpeed?: number; // base ms per char
  jitter?: number; // randomized variance (+- ms)
  startDelay?: number; // initial pause before typing
  onComplete?: () => void;
}

export function useTypewriter() {
  const [displayText, setDisplayText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsTyping(false);
  }, []);

  const typeText = useCallback(
    (text: string, options?: TypewriterOptions) => {
      cancel();
      setDisplayText("");
      setIsTyping(true);

      const baseSpeed = options?.charSpeed ?? 32;
      const jitter = options?.jitter ?? 15;
      const startDelay = options?.startDelay ?? 100;
      let currentIndex = 0;

      const step = () => {
        if (currentIndex < text.length) {
          currentIndex++;
          setDisplayText(text.slice(0, currentIndex));

          const randomJitter =
            Math.floor(Math.random() * (jitter * 2 + 1)) - jitter;
          const nextDelay = Math.max(12, baseSpeed + randomJitter);
          timerRef.current = setTimeout(step, nextDelay);
        } else {
          setIsTyping(false);
          timerRef.current = null;
          if (options?.onComplete) {
            options.onComplete();
          }
        }
      };

      timerRef.current = setTimeout(step, startDelay);
    },
    [cancel],
  );

  const setTextImmediate = useCallback(
    (text: string) => {
      cancel();
      setDisplayText(text);
    },
    [cancel],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return {
    displayText,
    isTyping,
    typeText,
    setTextImmediate,
    cancel,
  };
}
