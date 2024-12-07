import { memo } from "react";
import { Box, BoxProps } from "./box";

export const Divider = memo(({ color, ...rest }: BoxProps) => (
  <Box
    css={{
      width: "100%",
      height: "2px",
      backgroundColor: color,
      borderRadius: "0.25rem",
    }}
    {...rest}
  />
));
