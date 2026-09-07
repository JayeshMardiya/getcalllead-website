import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "teal" | "blue" | "neutral" | "success" | "warning" | "danger" | "outline";
  size?: "sm" | "md";
}

export function Badge({
  children,
  className,
  variant = "teal",
  size = "md",
  ...props
}: BadgeProps) {
  const variantStyles = {
    teal: "bg-[#E6F3F2] text-[#0E7C7A] border-[#CDE5E3]",
    blue: "bg-[#E3EDFF] text-[#2563EB] border-[#BFDBFE]",
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
    success: "bg-[#DCF7E6] text-[#16A34A] border-[#BBF7D0]",
    warning: "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]",
    danger: "bg-[#FDE1E1] text-[#EF4444] border-[#FECACA]",
    outline: "bg-transparent text-slate-700 border-slate-300",
  };

  const sizeStyles = {
    sm: "text-xs px-2.5 py-0.5",
    md: "text-xs font-semibold px-3 py-1",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
