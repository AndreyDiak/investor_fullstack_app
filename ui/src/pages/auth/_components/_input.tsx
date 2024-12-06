import { Box } from "@kit/ui";
import {
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  SVGProps,
} from "react";

interface Props
  extends HTMLAttributes<HTMLInputElement>,
    Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  Icon?: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
}

export const AuthInput = forwardRef<HTMLDivElement, Props>(
  ({ Icon, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        css={{
          backgroundColor: "rgb(229 231 235)",
          display: "flex",
          alignItems: "center",
          borderRadius: "3rem",
          position: "relative",
        }}
      >
        <input
          css={{
            padding: "0.75rem 2rem 0.75rem 4rem",
            backgroundColor: "transparent",
            color: "rgb(102, 102, 102)",
            borderRadius: "3rem",
            fontWeight: "600",
            ":focus": {
              border: "none",
              outline: "none",
              "~ .auth-icon": {
                color: "var(--text-emerald)",
                transform: "translateX(-0.5rem)",
              },
            },
          }}
          {...rest}
        />
        {Icon && (
          <Icon
            width={18}
            height={18}
            className="auth-icon"
            css={{
              position: "absolute",
              left: "1.5rem",
              transitionDuration: "300ms",
              transitionTimingFunction: "ease-in-out",
              color: "rgb(55, 65, 81)",
            }}
          />
        )}
      </Box>
    );
  }
);
