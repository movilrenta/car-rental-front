import type React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

interface BadgeOfferProps {
  text: string;
  variant?: "default" | "secondary" | "destructive" | "outline" | "special";
  className?: string;
  icon?: React.ReactNode;
}

export default function BadgeOffer({
  text,
  variant = "special",
  className,
  icon,
}: BadgeOfferProps) {
  return (
    <Badge
      variant={variant === "special" ? "outline" : variant}
      className={cn(
        " text-xs text-white px-2 py-1 rounded-full text-nowrap",
        variant === "special" && "bg-red-500",
        className
      )}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {text}
    </Badge>
  );
}
