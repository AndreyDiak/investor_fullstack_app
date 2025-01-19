// import { BaseButton, CustomFormContext } from "@gravity-ui/uikit";
import { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { ScaleLoader } from "react-spinners";
import { BaseButton } from "../../../shared/ui/components/base_button";

interface Props
  extends HTMLAttributes<HTMLButtonElement>,
    ButtonHTMLAttributes<HTMLButtonElement> {}

export const AuthButton = ({ children, ...rest }: Props) => {
  const {
    formState: { isValid, isLoading },
  } = useFormContext();
  // const { loading } = useContext(CustomFormContext);
  const loading = false;

  const disabled = !isValid || isLoading || loading;
  return (
    <BaseButton
      disabled={disabled}
      type="submit"
      css={{
        color: "#fff",
        padding: "0.75rem 0",
        fontWeight: "700",
        borderRadius: "3rem",
        fontFamily: "Roboto",
        transitionDuration: "300ms",
        display: "flex",
        gap: "1rem",
        backgroundColor: disabled ? "rgb(134 239 172)" : "rgb(34 197 94)",
        justifyContent: "center",
        width: "100%",
        ":hover": {
          backgroundColor: disabled ? "rgb(134 239 172)" : "rgb(20 83 45)",
        },
      }}
      {...rest}
    >
      {loading ? (
        <ScaleLoader height={24} width={4} color="rgb(22 101 52)" />
      ) : (
        children
      )}
    </BaseButton>
  );
};
