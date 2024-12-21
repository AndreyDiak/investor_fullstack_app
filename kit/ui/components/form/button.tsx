import { useFormContext } from "react-hook-form";
import { Button, ButtonProps } from "../button";

export const FormSubmitButton = (props: ButtonProps) => {
  const {
    formState: { isValid, errors, isSubmitting },
  } = useFormContext();

  const disabled = isValid || Object.keys(errors).length > 0 || isSubmitting;

  return (
    <Button disabled={disabled} {...props}>
      Отправить
    </Button>
  );
};
