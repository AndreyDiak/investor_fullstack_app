import { Envelope, Lock, Person } from "@gravity-ui/icons";
import { Form, FormGrid } from "@kit/ui";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../../api/auth";
import { useStoreFetch } from "../../../shared/hooks/use_store_fetch";
import { HttpError } from "../../../shared/ui/httpError";
import { AuthButton } from "./_button";
import { AuthInput } from "./_input";

interface FormProps {
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
        <motion.span
          css={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          {...styles}
        >
          <AuthInput
            Icon={Envelope}
            type="text"
            placeholder="Эл. Почта"
            {...register("email", {
              required: true,
            })}
          />
          <AuthInput
            Icon={Person}
            type="text"
            placeholder="Имя пользователя"
            {...register("username", {
              required: true,
            })}
          />
        </motion.span>
        <AuthInput
          Icon={Lock}
          type="password"
          placeholder="Пароль"
          {...register("password", {
            required: true,
          })}
        />
        <AuthInput
          Icon={Lock}
          type="password"
          placeholder="Подтвердить пароль"
          {...register("repeatPassword", {
            required: true,
          })}
        />
        <HttpError error={httpError} />
      </FormGrid>
      <AuthButton>Создать аккаунт</AuthButton>
    </Form>
  );
};
