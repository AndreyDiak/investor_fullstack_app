import { HTMLAttributes } from "react";
import { cn } from "../../lib";

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {}

export const Box = ({ className, ...rest }: BoxProps) => {
  return <div className={cn(className)} {...rest} />;
};
