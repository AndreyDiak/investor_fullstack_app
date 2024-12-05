import { Theme } from "@emotion/react";
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useMergeRefs,
  useRole,
} from "@floating-ui/react";
import {
  cloneElement,
  createContext,
  forwardRef,
  HTMLProps,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { Box, BoxProps } from "./box";
import { Heading, HeadingProps } from "./heading";

type DialogSize = "small" | "medium" | "large" | "screen";
type DialogPlacement = "top" | "bottom";

interface UseDialogProps {
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  initialOpen?: boolean;
  closeOutside?: boolean;
  size?: DialogSize;
  placement?: DialogPlacement;
}
function useDialog({
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  initialOpen = false,
  closeOutside = true,
  placement = "bottom",
  size,
}: UseDialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    open: uncontrolledOpen,
    onOpenChange: setControlledOpen ?? setOpen,
  });

  const context = data.context;

  const click = useClick(context, {
    enabled: controlledOpen == null,
  });

  const dismiss = useDismiss(context, {
    enabled: !!closeOutside,
  });

  const role = useRole(context);

  const interactions = useInteractions([click, dismiss, role]);

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      placement,
      size,
    }),
    [open, setOpen, interactions, data, size, placement]
  );
}

type ContextType = ReturnType<typeof useDialog> | null;

const DialogContext = createContext<ContextType>(null);

function useDialogContext() {
  const context = useContext(DialogContext);

  if (context == null) {
    throw new Error("Dialog components must be wrapped in <Dialog />");
  }
  return context;
}

export const DialogWrapper = ({
  children,
  ...options
}: UseDialogProps & { children: ReactNode }) => {
  const dialog = useDialog(options);
  return (
    <DialogContext.Provider value={dialog}>{children}</DialogContext.Provider>
  );
};

interface DialogTriggerProps extends Omit<HTMLProps<HTMLElement>, "children"> {
  children: ReactElement<any>;
}

export const DialogTrigger = forwardRef<HTMLElement, DialogTriggerProps>(
  ({ children, ...props }, propRef) => {
    const context = useDialogContext();
    const childrenRef = (children as any).ref;
    const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

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
);

export const DialogContent = forwardRef<
  HTMLDialogElement,
  HTMLProps<HTMLDialogElement>
>(({ children, ...rest }, propRef) => {
  const {
    context: floatingContext,
    size,
    placement,
    ...context
  } = useDialogContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  const sizeStyles = sizeToStyles[size];
  const placementStyles = placementToStyles[placement];

  if (!floatingContext.open) {
    return null;
  }
  return (
    <FloatingPortal>
      <FloatingOverlay
        className="overflow-hidden"
        lockScroll
        style={{
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <FloatingFocusManager context={floatingContext}>
          <dialog
            ref={ref}
            css={{
              ...sizeStyles,
              ...placementStyles,
              backgroundColor: "#fff",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "stretch",
              border: "none",
              outline: "none",
              maxHeight: "80vh",
              ":active": {
                border: "none",
                outline: "none",
              },
            }}
            {...context.getFloatingProps(rest)}
          >
            {children}
          </dialog>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
});

export const DialogHeader = forwardRef<HTMLDivElement, BoxProps>(
  (props, ref) => {
    return (
      <Box
        ref={ref}
        css={{
          padding: "8px 24px",
          display: "flex",
          gap: "40px",
          width: "100%",
          alignItems: "start",
          borderTopLeftRadius: "8px",
        }}
        {...props}
      />
    );
  }
);

export const DialogHeading = (props: Partial<HeadingProps>) => {
  return <Heading level={2} {...props} />;
};

export const DialogBody = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  return (
    <Box
      ref={ref}
      css={{
        padding: "24px",
        width: "100%",
      }}
      {...props}
    />
  );
});

const sizeToStyles: Record<DialogSize, Theme> = {
  small: {
    width: "420px",
  },
  medium: {
    width: "50%",
  },
  large: {
    width: "75%",
  },
  screen: {
    width: "91.5%",
  },
};

const placementToStyles: Record<DialogPlacement, Theme> = {
  top: {
    marginTop: "10vh",
  },
  bottom: {
    bottom: 24,
  },
};
