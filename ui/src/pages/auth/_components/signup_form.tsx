// import { Form, FormGrid } from "@gravity-ui/uikit";
import { Envelope, Lock, Person } from "@gravity-ui/icons";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useAuthStore } from "../../../api/auth";
import { useStoreFetch } from "../../../shared/hooks/use_store_fetch";
import {
  Form,
  FormField,
  FormGrid,
  HttpError,
} from "../../../shared/ui/components";
import { AuthButton } from "./_button";
import { AuthInput } from "./_input";

interface FormProps extends FieldValues {
  email: string;
  username: string;
  password: string;
  repeatPassword?: string;
}

const styles = {
  initial: {
    opacity: 0.4,
    y: 300,
  },
  animate: {
    opacity: 1,
    display: "flex",
    y: 0,
  },
  transition: {
    duration: 0.4,
    ease: "backOut",
  },
};

export const SignUpForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const form = useForm<FormProps>();
  const [httpError, setHttpError] = useState();
  const {
    register,
    setError,
    formState: { errors },
  } = form;
  const { fetch } = useStoreFetch(
    useAuthStore((state) => state.signUp),
    {
      onSuccess,
      onError: setHttpError,
    }
  );

  const handleSubmit = async (data: FormProps) => {
    if (data.password !== data?.repeatPassword) {
      setError("repeatPassword", {
        message: "Пароли не совпадают",
      });
      return;
    }
    const mutable = structuredClone(data);
    delete mutable.repeatPassword;
    await fetch(mutable);
  };

  return (
    <Form
      form={form}
      onSubmit={async (data) => {
        await handleSubmit(data);
        onSuccess?.();
      }}
      css={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <FormGrid css={{ marginBottom: "3rem" }}>
        <FormField fieldId="email" required>
          <AuthInput Icon={Envelope} placeholder="Эл. Почта" />
        </FormField>
        <FormField fieldId="username" required>
          <AuthInput Icon={Person} type="text" placeholder="Имя пользователя" />
        </FormField>
        <FormField fieldId="password" required>
          <AuthInput Icon={Lock} type="password" placeholder="Пароль" />
        </FormField>
        <FormField fieldId="repeatPassword" required>
          <AuthInput
            Icon={Lock}
            type="password"
            placeholder="Подтвердить пароль"
          />
        </FormField>
        <HttpError error={httpError} />
        <AuthButton>Создать аккаунт</AuthButton>
      </FormGrid>
    </Form>
  );
};
