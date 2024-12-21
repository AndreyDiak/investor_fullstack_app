import {
  cloneElement,
  isValidElement,
  LabelHTMLAttributes,
  ReactElement,
  Ref,
  useMemo,
  useRef,
} from "react";
import { useFormContext } from "react-hook-form";
import { Box } from "../box";

interface FormFieldContext {
  name: string;
  required?: boolean;
  title?: string;
  children: ReactElement;
}

export const FormField = ({
  name,
  title,
  required = false,
  children,
}: FormFieldContext) => {
  const { register } = useFormContext();

  const ref = useRef();

  const component = useMemo(() => {
    if (isValidElement(children)) {
      return cloneElement(children, {
        ref,
        ...register(name, { required }),
      });
    }
    throw new Error("FormField children must be a valid React element");
  }, [children, ref, name, required]);

  return (
    <Box
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
      }}
    >
      {title && <FormFieldTitle required={required}>{title}</FormFieldTitle>}
      {component}
    </Box>
  );
};

export const FormFieldTitle = ({
  children,
  required,
  ...rest
}: LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
  ref?: Ref<HTMLLabelElement>;
}) => {
  return (
    <label
      id="FormField__Title"
      css={{
        wordBreak: "break-word",
        fontFamily: "Roboto",
      }}
      {...rest}
    >
      {children}
      {required && (
        <span css={{ color: "var(--color-danger)", fontWeight: "500" }}>
          &nbsp;*
        </span>
      )}
    </label>
  );
};
