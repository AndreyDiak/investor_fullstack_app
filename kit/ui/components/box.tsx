import { forwardRef, HTMLAttributes } from "react";

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (props, ref) => {
    return <div ref={ref} {...props} />;
  },
);
