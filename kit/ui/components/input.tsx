import { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const TextInput = ({ ...rest }: InputProps) => {
  return (
    <input
      css={{
        padding: "0.25rem 0.375rem",
        borderRadius: "0.25rem",
        outline: "none",
        border: "none",
      }}
      {...rest}
    />
  );
};
