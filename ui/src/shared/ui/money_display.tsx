import { Box, BoxProps } from "@kit/ui";
import { MoneyIcon, MoneyIconVariant } from "../icons/money";
import { beatifyPrice } from "../lib";

interface MoneyDisplayProps extends BoxProps {
  count: number;
  variant?: MoneyIconVariant;
}

export const MoneyDisplay = ({
  count,
  variant,
  ...rest
}: MoneyDisplayProps) => {
  return (
    <Box
      css={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
      {...rest}
    >
      {beatifyPrice(count)} <MoneyIcon className="w-8 h-8" variant={variant} />
    </Box>
  );
};
