import { Lock, Person } from "@gravity-ui/icons";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { api } from "../../../api";
import { Form } from "../../../shared/ui/common/form";
import { AuthButton } from "./_button";
import { AuthInput } from "./_input";

interface FormProps {
  username: string;
  password: string;
}

export const SignInForm = () => {
  const form = useForm<FormProps>();
  const { register } = form;

  const query = useMutation({
    mutationFn: api.auth.getState().signIn,
  });
  const onSubmit = async (data: FormProps) => {
    try {
      await query.mutateAsync(data);
    } catch (e) {
      console.log({ e });
    }
  };

  return (
    <Form form={form} onSubmit={onSubmit} className="flex flex-col ">
      <div className="flex flex-col gap-2 mb-10">
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
      </div>
      <AuthButton>LOG IN</AuthButton>
    </Form>
  );
};
