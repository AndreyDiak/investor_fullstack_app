import { HTMLAttributes } from "react";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export const BaseButton = ({ className, ...rest }: ButtonProps) => {
  return <button css={{ cursor: "pointer" }} {...rest} />;
};
