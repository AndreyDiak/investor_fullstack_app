import { OptionHTMLAttributes, SelectHTMLAttributes } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = ({ ...rest }: SelectProps) => {
  return (
    <select
      css={{ padding: "0.25rem 0.375rem", fontFamily: "Roboto" }}
      {...rest}
    />
  );
};

export interface OptionProps extends OptionHTMLAttributes<HTMLOptionElement> {}

export const Option = ({ ...rest }: OptionProps) => {
  return <option {...rest} />;
};
