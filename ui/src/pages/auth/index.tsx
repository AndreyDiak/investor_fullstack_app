import { Envelope, Lock } from "@gravity-ui/icons";
// import Image from "next/image";
import { AuthButton } from "./_components/button";
import { AuthInput } from "./_components/input";

export const AuthPage = () => {
  return (
    <div className="bg-gradient-to-tr from-indigo-500 from-10% to-emerald-500 to-70% w-full h-screen flex items-center justify-center">
      <div className="bg-white rounded-3xl pt-40 px-32 pb-8 flex justify-between min-w-[840px]">
        <div>
          <h2 className="text-3xl text-gray-700 font-[GeistSans] ml-8">
            <span className="text-emerald-600">#</span>Investor
          </h2>
          <span>
            <img src="public/preview.png" alt={""} className="w-60" />
          </span>
        </div>
        <div className="flex flex-col gap-14 items-center font-[Roboto]">
          <h2 className="font-bold text-gray-700 text-2xl">Member Login</h2>
          <form
            onSubmit={(data) => {
              console.log({ data });
            }}
            className="flex flex-col "
          >
            <div className="flex flex-col gap-2 mb-10">
              <AuthInput
                Icon={Envelope}
                type="text"
                placeholder="Username"
                name="username"
              />
              <AuthInput
                Icon={Lock}
                type="password"
                placeholder="Password"
                name="password"
              />
            </div>
            <AuthButton>LOGIN</AuthButton>
          </form>
          <div className="font-light text-gray-600 text-sm cursor-pointer hover:text-gray-900 underline">
            Create an account
          </div>
        </div>
      </div>
    </div>
  );
};
