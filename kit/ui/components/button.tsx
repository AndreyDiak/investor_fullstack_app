import { HTMLAttributes } from "react";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export const BaseButton = (props: ButtonProps) => {
  return <button css={{ cursor: "pointer" }} {...props} />;
};
