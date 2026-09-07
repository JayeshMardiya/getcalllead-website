import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      href,
      external,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none cursor-pointer";

    const variantStyles = {
      primary:
        "bg-[#0E7C7A] text-white hover:bg-[#0B6D6B] active:bg-[#095755] focus-visible:outline-[#0E7C7A] shadow-sm hover:shadow-md",
      secondary:
        "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 focus-visible:outline-slate-400 shadow-sm",
      dark:
        "bg-slate-900 text-white hover:bg-slate-800 active:bg-black focus-visible:outline-slate-900 shadow-sm hover:shadow-md",
      outline:
        "bg-transparent text-slate-700 border border-slate-300 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-slate-400",
      ghost:
        "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-slate-400",
    };

    const sizeStyles = {
      sm: "h-10 px-4 text-sm gap-1.5",
      md: "min-h-[44px] h-11 px-5 text-sm font-semibold gap-2",
      lg: "min-h-[48px] h-12 px-7 text-base font-semibold gap-2.5",
    };

    const combinedClasses = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClasses}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClasses}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={combinedClasses}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
