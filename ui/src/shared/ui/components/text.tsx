import { CSSProperties, HTMLAttributes } from "react";

type TextFontFamily = "roboto";

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  children: string | number | null;
  fontFamily?: TextFontFamily;
}

export const Text = ({
  children,
  fontFamily = "roboto",
  ...rest
}: TextProps) => {
  return (
    <span css={{ fontFamily: fontToCss[fontFamily] }} {...rest}>
      {children}
    </span>
  );
};

const fontToCss: Record<TextFontFamily, CSSProperties["fontFamily"]> = {
  roboto: "Roboto Mono",
};
