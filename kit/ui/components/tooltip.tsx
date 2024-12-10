import { keyframes, Theme } from "@emotion/react";
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  Placement,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
} from "@floating-ui/react";
import {
  cloneElement,
  createContext,
  HTMLProps,
  isValidElement,
  ReactElement,
  ReactNode,
  Ref,
  useContext,
  useMemo,
  useState,
} from "react";
import { Box, BoxProps } from "./box";

type TooltipVariant = "tooltip" | "preview";
type TooltipSize = "small" | "medium";

export interface UseTooltipProps {
  inittialOpen?: boolean;
  variant?: TooltipVariant;
  placement?: Placement;
  open?: boolean;
  size?: TooltipSize;
  delay?: number;
  enabled?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function useTooltip({
  inittialOpen = false,
  enabled = true,
  size = "medium",
  variant = "tooltip",
  placement = "top",
  delay = 0,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: UseTooltipProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(inittialOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip()],
  });

  const context = data.context;
  const hover = useHover(context, {
    move: false,
    delay,
    enabled: enabled && controlledOpen == null,
  });
  const focus = useFocus(context, {
    enabled: enabled && controlledOpen == null,
  });

  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });
  const interactions = useInteractions([hover, focus, dismiss, role]);

  return useMemo(
    () => ({
      open,
      setOpen,
      size,
      ...interactions,
      ...data,
    }),
    [open, setOpen, size, interactions, data]
  );
}

type ContextType = ReturnType<typeof useTooltip> | null;

const TooltipContext = createContext<ContextType>(null);

function useTooltipContext() {
  const context = useContext(TooltipContext);

  if (!context) {
    throw new Error(
      "Tooltip components must be used within a <TooltipWrapper />"
    );
  }

  return context;
}

export const TooltipWrapper = ({
  children,
  ...options
}: UseTooltipProps & { children: ReactNode }) => {
  const tooltip = useTooltip(options);

  return (
    <TooltipContext.Provider value={tooltip}>
      {children}
    </TooltipContext.Provider>
  );
};

interface TooltipTriggerProps extends Omit<HTMLProps<HTMLElement>, "children"> {
  children: ReactElement<any>;
  ref?: Ref<HTMLElement>;
  asChild?: boolean;
}

export const TooltipTrigger = ({
  children,
  asChild = true,
  ref: propRef,
  ...props
}: TooltipTriggerProps) => {
  const context = useTooltipContext();

  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);
  if (asChild && isValidElement<any>(children)) {
    return cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        "data-state": context.open ? "open" : "closed",
      })
    );
  }

  return (
    <Box
      ref={ref}
      data-state={context.open ? "open" : "closed"}
      {...context.getReferenceProps(props)}
    >
      {children}
    </Box>
  );
};

export const TooltipContent = ({
  children,
  ref: propRef,
  ...rest
}: BoxProps) => {
  const context = useTooltipContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);
  const size = context.size;

  if (!context.open) {
    return null;
  }

  return (
    <FloatingPortal>
      <Box
        ref={ref}
        css={{
          position: context.strategy,
          top: context.y ?? 0,
          left: context.x ?? 0,
          textDecoration: "none",
          textShadow: "none",
          textTransform: "none",
          letterSpacing: "normal",
          borderRadius: "0.5rem",
          animation: `0.1s ${fadeInAnimation} ease-in`,
          width: "max-content",
          maxWidth: "200px",
          wordWrap: "break-word",
          whiteSpace: "pre",
          textAlign: "start",
          ...sizeToStyles[size],
        }}
        {...context.getReferenceProps(rest)}
      >
        {children}
      </Box>
    </FloatingPortal>
  );
};

const sizeToStyles: Record<TooltipSize, Theme> = {
  small: {
    padding: "0.25rem 0.5rem",
    borderRadius: "0.25rem",
    fontSize: "12px",
  },
  medium: {
    padding: "0.5rem 0.75rem",
  },
};

const fadeInAnimation = keyframes({
  from: { opacity: 0, transform: "scale(0.8)" },
  to: { opacity: 1, transform: "scale(1)" },
});
