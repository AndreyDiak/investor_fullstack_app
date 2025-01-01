import {
  autoUpdate,
  flip,
  offset,
  size,
  useFloating,
} from "@floating-ui/react";
import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  OptionHTMLAttributes,
  ReactElement,
  Ref,
  SelectHTMLAttributes,
  useMemo,
  useState,
} from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";
import { BaseButton, BaseButtonProps } from "../button";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  ref?: Ref<HTMLSelectElement>;
  children: ReactElement<OptionProps>[];
  initialOpen?: boolean;
}

export const Select = ({
  ref,
  children,
  initialOpen,
  ...rest
}: SelectProps) => {
  const [open, setOpen] = useState(initialOpen);

  const {} = useFloating({
    open,
    placement: "bottom-start",
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip({ padding: 10 }),
      size({
        apply(props) {
          console.log({ props });
        },
        padding: 10,
      }),
    ],
  });

  const options = useMemo(
    () =>
      Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            label: child.props.children,
            value: child.props.value || child.props.children,
          });
        }
        throw new Error("Invalid Child");
      }).filter((v) => !v.props.hidden),
    [children]
  );

  console.log({ options });

  return (
    <Fragment>
      <SelectButton open={false} {...rest}></SelectButton>
    </Fragment>
    // <select
    //   ref={ref}
    //   css={{ padding: "0.25rem 0.375rem", fontFamily: "Roboto" }}
    //   {...rest}
    // />
  );
};

const SelectButton = ({
  ref,
  children,
  open,
  ...rest
}: BaseButtonProps & { ref?: Ref<HTMLButtonElement>; open: boolean }) => {
  return (
    <BaseButton ref={ref} {...rest}>
      {children}
      {open ? <FaChevronRight /> : <FaChevronDown />}
    </BaseButton>
  );
};

export interface OptionProps extends OptionHTMLAttributes<HTMLOptionElement> {
  ref?: Ref<HTMLOptionElement>;
}

export const Option = ({ ref, ...rest }: OptionProps) => {
  return <option ref={ref} {...rest} />;
};
