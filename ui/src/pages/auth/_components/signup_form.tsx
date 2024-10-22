import { Envelope, Lock, Person } from "@gravity-ui/icons";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";
import { api } from "../../../api";
import { Form } from "../../../shared/ui/common/form";
import { AuthButton } from "./_button";
import { AuthInput } from "./_input";

interface FormProps {
  email: string;
  fullname: string;
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

export const SignUpForm = () => {
  const form = useForm<FormProps>();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = form;
  const mutation = useMutation({
    mutationFn: api.auth.getState().signUp,
  });
  const onSubmit = async (data: FormProps) => {
    if (data.password !== data?.repeatPassword) {
      setError("repeatPassword", {
        message: "Password mismatch",
      });
      return;
    }
    const mutable = structuredClone(data);
    delete mutable.repeatPassword;
    await mutation.mutateAsync(mutable);
  };
  return (
    <Form form={form} onSubmit={onSubmit} className="flex flex-col gap-2">
      <FormProvider {...form}>
        <motion.span className="flex flex-col gap-2" {...styles}>
          <AuthInput
            Icon={Envelope}
            type="text"
            placeholder="Email"
            {...register("email", {
              required: true,
            })}
          />
          <AuthInput
            Icon={Person}
            type="text"
            placeholder="Username"
            {...register("fullname", {
              required: true,
            })}
          />
        </motion.span>
        <AuthInput
          Icon={Lock}
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
          })}
        />
        <AuthInput
          Icon={Lock}
          type="password"
          placeholder="Repeat password"
          {...register("repeatPassword", {
            required: true,
          })}
        />
        <div className="flex flex-col gap-2">
          {Object.entries(errors).map(([field, error]) => (
            <div>{error.message}</div>
          ))}
        </div>
        <AuthButton className="mt-8">SIGN UP</AuthButton>
      </FormProvider>
    </Form>
  );
};
