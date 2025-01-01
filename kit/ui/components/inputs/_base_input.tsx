import { InputHTMLAttributes } from "react";

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const BaseInput = ({ ...rest }: BaseInputProps) => {
  return (
    <input
      css={{
        width: "100%",
        paddingBlock: 0,
        paddingInline: 0,
        height: "28px",
        padding: "0.25rem 0.5rem",
        borderRadius: "0.25rem",
        outline: "none",
        border: "none",
      }}
      {...rest}
    />
  );
};
