"use client";

import { Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";

export default function ToastProvider() {
  const [mounted, setMounted] = useState(false);
  const refData = useRef(false);
  useEffect(() => {
    if (!refData.current) {
      setMounted(true);
      refData.current = true;
    }
  }, []);

  if (!mounted) return null;

  return <Toaster position="top-right" />;
}
