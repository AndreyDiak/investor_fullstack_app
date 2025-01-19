import { Box } from "@gravity-ui/uikit";
import {
  cloneElement,
  CSSProperties,
  FC,
  isValidElement,
  LabelHTMLAttributes,
  ReactElement,
  Ref,
  useMemo,
  useRef,
} from "react";
import { useFormContext } from "react-hook-form";

interface FormFieldProps {
  fieldId: string;
  required?: boolean;
  label?: string;
  direction?: CSSProperties["flexDirection"];
  children: ReactElement;
}

export const FormField: FC<FormFieldProps> = ({
  fieldId,
  label,
  direction = "column",
  required = false,
  children,
}) => {
  const { register } = useFormContext();

  const ref = useRef();

  const component = useMemo(() => {
    if (isValidElement(children)) {
      return cloneElement(children, {
        ref,
        ...register(fieldId, { required }),
      });
    }
    throw new Error("FormField children must be a valid React element");
  }, [children, ref, fieldId, required]);

  return (
    <Box
      css={{
        display: "flex",
        flexDirection: direction,
        gap: "0.25rem",
      }}
    >
      {label && <FormFieldTitle required={required}>{label}</FormFieldTitle>}
      {component}
    </Box>
  );
};

interface FormFieldTitleProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  ref?: Ref<HTMLLabelElement>;
}

export const FormFieldTitle: FC<FormFieldTitleProps> = ({
  children,
  required,
  ...rest
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
