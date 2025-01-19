import { Button, ButtonProps } from "@gravity-ui/uikit";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

export const FormSubmitButton: FC<ButtonProps> = (props) => {
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
