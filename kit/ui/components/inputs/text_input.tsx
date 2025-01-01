import { InputHTMLAttributes } from "react";
import { BaseInput } from "./_base_input";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const TextInput = ({ ...rest }: TextInputProps) => {
  return <BaseInput {...rest} />;
};
