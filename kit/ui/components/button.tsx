import { Theme } from "@emotion/react";
import { ButtonHTMLAttributes, forwardRef, HTMLAttributes } from "react";

export interface BaseButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    ButtonHTMLAttributes<HTMLButtonElement> {}

export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  (props, ref) => {
    return (
      <button
        ref={ref}
        css={{ cursor: "pointer", outline: "none" }}
        {...props}
      />
    );
  }
);

type ButtonSize = "small" | "medium" | "large";
type ButtonVariant = "primary" | "secondary" | "danger";

export interface ButtonProps extends BaseButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size = "medium", variant = "primary", ...rest }, ref) => {
    return (
      <BaseButton
        css={{
          ...sizeToStyles[size],
          ...variantToStyles[variant],
          outline: "none",
          border: "none",
          transitionDuration: "100ms",
          transitionTimingFunction: "ease-in-out",
          ":active": {
            outline: "none",
            border: "none",
          },
        }}
        {...rest}
        ref={ref}
      />
    );
  }
);

const sizeToStyles: Record<ButtonSize, Theme> = {
  small: {
    fontSize: "0.75rem",
    padding: "0.125rem 0.375rem",
    borderRadius: "0.25rem",
  },
  medium: {
    fontSize: "1rem",
    padding: "0.25rem 0.75rem",
    borderRadius: "0.5rem",
  },
  large: {
    fontSize: "1.25rem",
    padding: "0.5rem 1rem",
    borderRadius: "0.75rem",
  },
};

const variantToStyles: Record<ButtonVariant, Theme> = {
  primary: {
    backgroundColor: "var(--color-aqua)",
    color: "#fff",
    ":hover": {
      backgroundColor: "var(--color-aqua-darken)",
    },
  },
  secondary: { backgroundColor: "#fff", color: "#393939" },
  danger: { backgroundColor: "#dc2626", color: "#fff" },
};
