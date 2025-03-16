"use client";
import { useRef } from "react";

const useScrollToFeedback = () => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollToFeedback = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return { ref, scrollToFeedback };
};

export default useScrollToFeedback;
