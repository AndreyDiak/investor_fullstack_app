import { InputHTMLAttributes } from "react";
import { BaseInput } from "./_base_input";

export interface NumberInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export const NumberInput = ({ ...rest }: NumberInputProps) => {
  return <BaseInput {...rest} />;
};
