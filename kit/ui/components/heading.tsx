import { Theme } from "@emotion/react";
import { HTMLAttributes, Ref } from "react";

type HeadingLevel = 1 | 2 | 3 | 4;

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel;
  ref?: Ref<HTMLHeadingElement>;
}

export const Heading = ({ level, ...rest }: HeadingProps) => {
  const HTMLTag = `h${level}` as const;
  return (
    <HTMLTag
      css={{
        ...levelToStyles[level],
        color: "#393939",
        margin: 0,
        padding: 0,
      }}
      {...rest}
    />
  );
};

const levelToStyles: Record<HeadingLevel, Theme> = {
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
