import { HTMLAttributes } from "react";
import { cn } from "./../utils";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export const BaseButton = ({ className, ...rest }: ButtonProps) => {
  return <button className={cn(className, "cursor-pointer")} {...rest} />;
};
