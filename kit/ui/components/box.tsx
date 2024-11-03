import { forwardRef, HTMLAttributes } from "react";
import { cn } from "./../utils";

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ className, ...rest }, ref) => {
    return <div ref={ref} className={cn(className)} {...rest} />;
  }
);
