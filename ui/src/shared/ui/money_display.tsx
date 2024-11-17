import { Box, BoxProps, cn } from "@kit/ui";
import { MoneyIcon, MoneyIconVariant } from "../icons/money";
import { beatifyPrice } from "../lib";

interface MoneyDisplayProps extends BoxProps {
  count: number;
  variant?: MoneyIconVariant;
}

export const MoneyDisplay = ({
  className,
  count,
  variant,
  ...rest
}: MoneyDisplayProps) => {
  return (
    <Box className={cn("flex gap-2 items-center", className)} {...rest}>
      {beatifyPrice(count)} <MoneyIcon className="w-8 h-8" variant={variant} />
    </Box>
  );
};
