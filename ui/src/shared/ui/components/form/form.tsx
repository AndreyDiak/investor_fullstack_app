import { Box, BoxProps } from "@gravity-ui/uikit";
import {
  createContext,
  DOMAttributes,
  FC,
  HTMLAttributes,
  Ref,
  useCallback,
  useState,
} from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

interface FormProps<T extends FieldValues>
  extends Omit<DOMAttributes<HTMLFormElement>, "onSubmit">,
    Omit<HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  form: UseFormReturn<T>;
  ref?: Ref<HTMLFormElement>;
  onSubmit: (data: T) => Promise<void> | void;
}

export const Form = <T extends FieldValues>({
  onSubmit,
  children,
  form,
  ...rest
}: FormProps<T>) => {
  const { handleSubmit: formHandleSubmit } = form;

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    formHandleSubmit(async (data) => {
      setLoading(true);
      try {
        await onSubmit(data);
      } finally {
        setLoading(false);
      }
    }),
    [formHandleSubmit]
  );

  return (
    <CustomFormContext.Provider value={{ loading }}>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit} {...rest}>
          {children}
        </form>
      </FormProvider>
    </CustomFormContext.Provider>
  );
};

export const CustomFormContext = createContext({
  loading: false,
});

export const FormGrid: FC<BoxProps> = (props) => {
  return (
    <Box
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
      {...props}
    />
  );
};
