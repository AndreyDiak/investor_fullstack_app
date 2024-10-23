import { motion, useCycle } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SignInForm } from "./_components/signin_form";
import { SignUpForm } from "./_components/signup_form";

type Mode = "signin" | "signup";

export const AuthPage = () => {
  const navigate = useNavigate();
  const [mode, toggleMode] = useCycle<Mode>("signin", "signup");
  const [touched, setTouched] = useState(false);

  return (
    <div className="bg-gradient-to-tr from-indigo-500 from-10% to-emerald-500 to-70% w-full h-screen flex items-center justify-center">
      <div
        className={`bg-white rounded-3xl px-32 pb-8 flex justify-between items-end min-w-[840px] h-[550px] font-main ${
          mode === "signin" ? "pt-40" : "pt-16"
        }`}
      >
        <div className="mr-24 mb-14">
          <h2 className="text-3xl text-gray-700 font-semibold ml-8">
            <span className="text-emerald-600">#</span>Investor
          </h2>
          <img src="public/preview.png" alt={""} className="w-60" />
        </div>
        <div>
          <motion.h2 className="font-bold text-gray-700 text-2xl mb-8">
            {mode === "signin" ? "Member Login" : "Member Sign up"}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0.4, scale: 0.6, x: 250 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className={`flex flex-col items-center mb-14 gap-14`}
          >
            {
              {
                signin: (
                  <SignInForm
                    onSuccess={() => {
                      navigate("/");
                    }}
                  />
                ),
                signup: (
                  <SignUpForm
                    onSuccess={() => {
                      toggleMode();
                      toast(
                        "You successfully create an acccout, please log in",
                        { type: "success" }
                      );
                    }}
                  />
                ),
              }[mode]
            }
          </motion.div>
          <div className="font-light text-gray-500 text-sm cursor-pointer hover:text-gray-900 text-center">
            <button
              className="underline"
              onClick={() => {
                toggleMode();
                if (!touched) {
                  setTouched(true);
                }
              }}
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
