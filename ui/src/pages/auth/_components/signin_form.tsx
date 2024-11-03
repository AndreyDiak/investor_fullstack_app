import { Lock, Person } from "@gravity-ui/icons";
import { Form, FormGrid } from "@kit/ui";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../../api";
import { SignInDto } from "../../../api/auth";
import { HttpError } from "../../../shared/ui/httpError";
import { AuthButton } from "./_button";
import { AuthInput } from "./_input";

export const SignInForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const form = useForm<SignInDto>();
  const [httpError, setHttpError] = useState();
  const {
    register,
    formState: { errors },
  } = form;

  const { mutateAsync: handleSubmit } = useMutation({
    mutationFn: api.auth.getState().signIn,
    onError: setHttpError,
    onSuccess: () => {},
  });

  return (
    <Form
      form={form}
      onSubmit={async (data) => {
        await handleSubmit(data);
        onSuccess?.();
      }}
    >
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
