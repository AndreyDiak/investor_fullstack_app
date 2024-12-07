import {
  createContext,
  DOMAttributes,
  HTMLAttributes,
  memo,
  useCallback,
  useState,
} from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";
import { Box, BoxProps } from "./box";

interface Props<T extends FieldValues>
  extends Omit<DOMAttributes<HTMLFormElement>, "onSubmit">,
    Omit<HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => Promise<void>;
}

export const Form = memo(
  ({ onSubmit, children, form, ...rest }: Props<unknown>) => {
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
  }
);

export const CustomFormContext = createContext<{ loading: boolean }>({
  loading: false,
});

export const FormGrid = (props: BoxProps) => {
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
