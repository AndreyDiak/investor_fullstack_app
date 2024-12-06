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
      <FormGrid css={{ marginBottom: "3rem" }}>
        <AuthInput
          Icon={Person}
          type="text"
          placeholder="Имя пользователя"
          {...register("username", {
            required: true,
          })}
        />
        <AuthInput
          Icon={Lock}
          type="password"
          placeholder="Пароль"
          {...register("password", {
            required: true,
          })}
        />
        <HttpError error={httpError} />
      </FormGrid>
      <AuthButton>Войти</AuthButton>
    </Form>
  );
};
