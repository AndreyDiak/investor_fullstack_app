import { Theme } from "@emotion/react";
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
  const variantStyles = variantToStyles[variant];
  const sizeStyles = sizeToStyles[size];
  return (
    <Box
      css={{
        ...variantStyles,
        ...sizeStyles,
        fontWeight: "500",
      }}
      {...rest}
    />
  );
};

const sizeToStyles: Record<BadgeSize, Theme> = {
  large: {
    padding: "12px 16px",
    fontSize: "18px",
    lineHeight: "28px",
    borderRadius: "6px",
  },
  medium: {
    padding: "8px 12px",
    fontSize: "16px",
    lineHeight: "24px",
    borderRadius: "4px",
  },
  small: {
    padding: "4px 8px",
    fontSize: "14px",
    lineHeight: "20px",
    borderRadius: "2px",
  },
};

const variantToStyles: Record<BadgeVariants, Theme> = {
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
