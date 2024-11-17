import { CSSProperties } from "react";
import { cn } from "./../utils";
import { Box, BoxProps } from "./box";

type BadgeSize = "small" | "medium" | "large";
type BadgeVariants = "danger" | "primary" | "warning" | "secondary";

interface BadgeProps extends BoxProps {
  size?: BadgeSize;
  variant?: BadgeVariants;
}

export const Badge = ({
  className,
  size = "medium",
  variant = "secondary",
  ...rest
}: BadgeProps) => {
  return (
    <Box
      className={cn(
        {
          small: "py-1 px-2 text-sm rounded-sm",
          medium: "py-2 px-3 text-base rounded",
          large: "py-3 px-4 text-lg rounded-md",
        }[size],
        "font-medium",
        className
      )}
      style={{
        ...badgeVariantToBgColorMap[variant],
      }}
      {...rest}
    />
  );
};

const badgeVariantToBgColorMap: Record<BadgeVariants, CSSProperties> = {
  danger: {
    backgroundColor: "#fca5a5",
    color: "#dc2626",
  },
  primary: {
    backgroundColor: "#a7f3d0",
    color: "#047857",
  },
  secondary: {
    backgroundColor: "#e5e7eb",
    color: "#374151",
  },
  warning: {
    backgroundColor: "#a7f3d0",
    color: "#eab308",
  },
};
