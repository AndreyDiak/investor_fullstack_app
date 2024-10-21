import { HTMLAttributes, InputHTMLAttributes, SVGProps } from "react";

interface Props
  extends HTMLAttributes<HTMLInputElement>,
    Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  Icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
}

export const AuthInput = ({ Icon, ...rest }: Props) => {
  return (
    <div className="bg-gray-200 flex items-center rounded-full relative">
      <input
        className="bg-transparent rounded-full peer focus:border-none focus:outline-none font-[Roboto] font-semibold 
				text-[#666666] pr-8 pl-16 h-12"
        {...rest}
      />
      <Icon
        width={18}
        height={18}
        className="absolute left-6 text-gray-700 peer-focus:text-emerald-600 transition duration-500 peer-focus:-translate-x-2 ease-in-out"
      />
    </div>
  );
};

const I: HTMLAttributes<HTMLInputElement> = {};
