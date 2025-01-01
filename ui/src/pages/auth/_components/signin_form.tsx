import { Lock, Person } from "@gravity-ui/icons";
import { Form, FormField, FormGrid } from "@kit/ui";
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

  const { fetch: handleSignIn } = useStoreFetch(
    useAuthStore((state) => state.signIn),
    {
      onSuccess,
      onError: setHttpError,
    }
  );

  return (
    <Form form={form} onSubmit={handleSignIn}>
      <FormGrid>
        <FormField fieldId="username" required>
          <AuthInput Icon={Person} placeholder="Имя пользователя" />
        </FormField>
        <FormField fieldId="password" required>
          <AuthInput Icon={Lock} type="password" placeholder="Пароль" />
        </FormField>
        <HttpError error={httpError} />
        <AuthButton>Войти</AuthButton>
      </FormGrid>
    </Form>
  );
};
