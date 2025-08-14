import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ResponsiveLayoutProps {
  children: ReactNode;
  className?: string;
}

export const ResponsiveLayout = ({ children, className }: ResponsiveLayoutProps) => {
  return (
    <div className={cn(
      "h-screen flex flex-col bg-background",
      // Ensure proper viewport handling on mobile
      "overflow-hidden",
      // Add safe area padding for mobile devices
      "supports-[padding:env(safe-area-inset-top)]:pt-[env(safe-area-inset-top)]",
      "supports-[padding:env(safe-area-inset-bottom)]:pb-[env(safe-area-inset-bottom)]",
      className
    )}>
      {children}
    </div>
  );
};