import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

const variantClass = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-emerald-600 text-white hover:bg-emerald-700",
  outline: "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
  ghost: "text-slate-700 hover:bg-slate-100"
};

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: keyof typeof variantClass;
  icon?: ReactNode;
}

export function Button({ className, variant = "primary", icon, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
        variantClass[variant],
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  children,
  variant = "primary",
  className,
  icon
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variantClass;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500",
        variantClass[variant],
        className
      )}
    >
      {icon}
      {children}
    </Link>
  );
}
