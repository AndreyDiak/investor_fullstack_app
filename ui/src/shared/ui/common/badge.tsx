import { mergeClassNames } from "../../lib";
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
      className={mergeClassNames(
        {
          small: "py-1 px-2 text-sm rounded-sm",
          medium: "py-2 px-3 text-base rounded",
          large: "py-3 px-4 text-lg rounded-md",
        }[size],
        {
          danger: "bg-red-300 text-red-600",
          secondary: "bg-gray-200 text-gray-700",
          warning: "bg-yellow-200 text-yellow-500",
          primary: "bg-emerald-200 text-emerald-700",
        }[variant],
        "font-medium",
        className
      )}
      {...rest}
    />
  );
};
