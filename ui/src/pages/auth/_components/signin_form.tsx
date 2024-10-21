import { Envelope, Lock } from "@gravity-ui/icons";
import { Fragment } from "react/jsx-runtime";
import { AuthButton } from "./_button";
import { AuthInput } from "./_input";

export const SignInForm = () => {
  return (
    <Fragment>
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
        <AuthButton>LOG IN</AuthButton>
      </form>
    </Fragment>
  );
};
