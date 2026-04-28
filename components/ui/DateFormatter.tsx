"use client";

import { useEffect, useState } from "react";

interface DateFormatterProps {
  date: string | Date;
  format?: "full" | "time" | "date";
  className?: string;
}

export default function DateFormatter({ date, format = "full", className }: DateFormatterProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className={className}>...</span>;
  }

  let dateObj: Date;
  if (typeof date === "string") {
    // If it looks like a database timestamp without 'Z' or offset, append 'Z' to treat as UTC
    const normalizedDate = (date.includes("Z") || date.includes("+")) 
      ? date 
      : `${date.replace(" ", "T")}Z`;
    dateObj = new Date(normalizedDate);
  } else {
    dateObj = date;
  }
  
  // Format based on Indonesian locale and WIB timezone
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Jakarta",
  };

  if (format === "full" || format === "date") {
    options.day = "numeric";
    options.month = "short";
  }

  if (format === "full" || format === "time") {
    options.hour = "2-digit";
    options.minute = "2-digit";
    options.hour12 = false;
  }

  const formatted = dateObj.toLocaleString("id-ID", options);

  // If full, we might want to customize the separator
  if (format === "full") {
    const d = dateObj.toLocaleDateString("id-ID", { ...options, hour: undefined, minute: undefined });
    const t = dateObj.toLocaleTimeString("id-ID", { ...options, day: undefined, month: undefined });
    return <span className={className}>{d} · {t}</span>;
  }

  return <span className={className}>{formatted}</span>;
}
