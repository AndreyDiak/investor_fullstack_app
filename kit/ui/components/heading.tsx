import { forwardRef, HTMLAttributes } from "react";
import { cn } from "../utils";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level, className, ...rest }, ref) => {
    const HTMLTag = `h${level}` as const;
    return (
      <HTMLTag
        ref={ref}
        className={cn(
          className,
          "text-[#393939] m-0 p-0 font-normal text-",
          getHeadingCn(level),
        )}
        {...rest}
      />
    );
  },
);

function getHeadingCn(level: HeadingProps["level"]) {
  switch (level) {
    case 1:
      return "text-4xl";
    case 2:
      return "text-2xl";
    case 3:
      return "text-xl";
    case 4:
      return "text-lg";
  }
}
