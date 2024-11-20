import { Theme } from "@emotion/react";
import { forwardRef, HTMLAttributes } from "react";

type Level = 1 | 2 | 3 | 4;
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: Level;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level, ...rest }, ref) => {
    const HTMLTag = `h${level}` as const;
    return (
      <HTMLTag
        ref={ref}
        css={{
          color: "#393939",
          margin: 0,
          padding: 0,
          ...levelToStyles[level],
        }}
        {...rest}
      />
    );
  },
);

const levelToStyles: Record<Level, Theme> = {
  1: {
    fontSize: "36px",
    lineHeight: "40px",
  },
  2: {
    fontSize: "24px",
    lineHeight: "32px",
  },
  3: {
    fontSize: "20px",
    lineHeight: "28px",
  },
  4: {
    fontSize: "18px",
    lineHeight: "28px",
  },
};
