import { Lock, Person } from "@gravity-ui/icons";
import { Form, FormGrid } from "@kit/ui";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignInDto, useAuthStore } from "../../../api/auth";
import { useStoreFetch } from "../../../shared/hooks/use_store_fetch";
import { HttpError } from "../../../shared/ui/httpError";
import { AuthButton } from "./_button";
import { AuthInput } from "./_input";

export const SignInForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const form = useForm<SignInDto>();
  const [httpError, setHttpError] = useState();
  const { register } = form;

  const { fetch: handleSignIn } = useStoreFetch(
    useAuthStore((state) => state.signIn),
    {
      onSuccess,
      onError: setHttpError,
    }
  );

  return (
    <Form form={form} onSubmit={handleSignIn}>
      <FormGrid className="mb-12">
        <AuthInput
          Icon={Person}
          type="text"
          placeholder="Username"
          {...register("username", {
            required: true,
          })}
        />
        <AuthInput
          Icon={Lock}
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
          })}
        />
        <HttpError error={httpError} />
      </FormGrid>
      <AuthButton>LOG IN</AuthButton>
    </Form>
  );
};
