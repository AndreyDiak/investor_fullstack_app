import { HTMLAttributes } from "react";
import { mergeClassNames } from "../../lib";

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {}

export const Box = ({ className, ...rest }: BoxProps) => {
  return <div className={mergeClassNames(className)} {...rest} />;
};
