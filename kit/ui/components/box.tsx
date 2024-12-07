import { HTMLAttributes, Ref } from "react";

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export const Box = (props: BoxProps) => {
  return <div {...props} />;
};
