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
  CSSProperties,
  forwardRef,
  HTMLProps,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { cn } from "./../utils";
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
>((props, propRef) => {
  const {
    context: floatingContext,
    size,
    placement,
    ...context
  } = useDialogContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  const sizeCn = getDialogSizeCn(size);
  const placementCn = getDialogPlacementCn(placement);

  if (!floatingContext.open) {
    return null;
  }
  return (
    <FloatingPortal>
      <FloatingOverlay className="overflow-hidden flex" lockScroll>
        <FloatingFocusManager context={floatingContext}>
          <dialog
            ref={ref}
            className={cn(
              props.className,
              "bg-white rounded-xl flex flex-col items-center justify-stretch overflow-auto border-none outline-none max-h-[80vh]"
            )}
            {...context.getFloatingProps(props)}
            style={{
              ...sizeCn,
              ...placementCn,
            }}
          >
            {props.children}
          </dialog>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
});

export const DialogHeader = forwardRef<HTMLDivElement, BoxProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={cn(className, "p-6 flex gap-10 w-full items-start ")}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

export const DialogHeading = (props: Partial<HeadingProps>) => {
  return <Heading level={2} {...props} />;
};

export const DialogBody = forwardRef<HTMLDivElement, BoxProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={cn(className, "px-6 pb-6 overflow-auto w-full")}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

function getDialogSizeCn(size: DialogSize): CSSProperties {
  switch (size) {
    case "small":
      return {
        width: "400px",
      };
    case "medium":
      return {
        width: "50%",
      };
    case "large":
      return {
        width: "75%",
      };
    case "screen":
      return {
        width: "92.5%",
      };
    default:
      return {
        width: "400px",
      };
  }
}

function getDialogPlacementCn(placement: DialogPlacement): CSSProperties {
  switch (placement) {
    case "top":
      return {
        marginTop: "10vh",
      };
    case "bottom":
      return {
        bottom: 24,
      };
  }
}
