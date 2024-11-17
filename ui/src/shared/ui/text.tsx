import { cn } from "@kit/ui";
import { CSSProperties, HTMLAttributes } from "react";

type TextFontFamily = "roboto";

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  children: string | number | null;
  fontFamily?: TextFontFamily;
}

export const Text = ({
  children,
  className,
  fontFamily = "roboto",
  ...rest
}: TextProps) => {
  return (
    <span
      className={cn("", className)}
      style={{ fontFamily: fontToStyleMap[fontFamily] }}
      {...rest}
    >
      {children}
    </span>
  );
};

const fontToStyleMap: Record<TextFontFamily, CSSProperties["fontFamily"]> = {
  roboto: "Roboto Mono",
};
