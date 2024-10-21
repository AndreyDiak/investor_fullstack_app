import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {}

export const AuthButton = ({ ...rest }: Props) => {
  return (
    <button
      type="submit"
      className="bg-green-500 text-white font-bold rounded-full text-md h-12 font-sans duration-300 hover:bg-green-900"
      {...rest}
    />
  );
};
