import {
  createContext,
  DOMAttributes,
  HTMLAttributes,
  useCallback,
  useState,
} from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

interface Props<T extends FieldValues>
  extends Omit<DOMAttributes<HTMLFormElement>, "onSubmit">,
    Omit<HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => Promise<void>;
}

export const Form = <T extends FieldValues>({
  onSubmit,
  children,
  form,
  ...rest
}: Props<T>) => {
  const { handleSubmit: formHandleSubmit } = form;

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    formHandleSubmit(async (data) => {
      setLoading(true);
      try {
        await onSubmit(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }),
    [formHandleSubmit]
  );

  return (
    <CustomFormContext.Provider
      value={{
        loading,
      }}
    >
      <FormProvider {...form}>
        <form onSubmit={handleSubmit} {...rest}>
          {children}
        </form>
      </FormProvider>
    </CustomFormContext.Provider>
  );
};

export const CustomFormContext = createContext<{ loading: boolean }>({
  loading: false,
});