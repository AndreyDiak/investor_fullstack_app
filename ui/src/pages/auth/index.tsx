import { useState } from "react";
import { SignInForm } from "./_components/signin_form";

type Mode = "signin" | "signup";

export const AuthPage = () => {
  const [mode, setMode] = useState<Mode>("signin");

  return (
    <div className="bg-gradient-to-tr from-indigo-500 from-10% to-emerald-500 to-70% w-full h-screen flex items-center justify-center">
      <div className="bg-white rounded-3xl pt-40 px-32 pb-8 flex justify-between min-w-[840px]">
        <div className="mr-24">
          <h2 className="text-3xl text-gray-700 font-[GeistSans] ml-8">
            <span className="text-emerald-600">#</span>Investor
          </h2>
          <span>
            <img src="public/preview.png" alt={""} className="w-60" />
          </span>
        </div>
        <div className="flex flex-col gap-14 items-center font-[Roboto]">
          {{ signin: <SignInForm />, signup: "" }[mode]}
          <div className="font-light text-gray-600 text-sm cursor-pointer hover:text-gray-900 underline">
            <button
              onClick={() =>
                setMode((prev) => (prev === "signin" ? "signup" : "signin"))
              }
            >
              {mode === "signin"
                ? "Create an account"
                : "Already have an account?"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
