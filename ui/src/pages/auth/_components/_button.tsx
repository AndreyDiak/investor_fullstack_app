import { ButtonHTMLAttributes, HTMLAttributes, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { ScaleLoader } from "react-spinners";
import { cn } from "../../../shared/lib";
import { CustomFormContext } from "../../../shared/ui/common/form";

interface Props
  extends HTMLAttributes<HTMLButtonElement>,
    ButtonHTMLAttributes<HTMLButtonElement> {}

export const AuthButton = ({ className, children, ...rest }: Props) => {
  const {
    formState: { isValid, isLoading },
  } = useFormContext();
  const { loading } = useContext(CustomFormContext);

  const disabled = !isValid || isLoading || loading;
  return (
    <button
      disabled={disabled}
      type="submit"
      className={cn(
        disabled
          ? "bg-green-300"
          : "bg-green-500 cursor-pointer hover:bg-green-900",
        "text-white font-bold rounded-full text-md h-12 font-sans duration-300 flex items-center gap-4 justify-center w-full",
        className
      )}
      {...rest}
    >
      {loading ? (
        <ScaleLoader height={24} width={4} color="rgb(22 101 52)" />
      ) : (
        children
      )}
    </button>
  );
};
