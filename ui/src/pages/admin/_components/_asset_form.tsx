import { Company, companyTags, GameTemplate } from "@kit/entities";
import { Form, FormGrid } from "@kit/ui";
import { useForm } from "react-hook-form";

export const CompanyForm = () => {
  const form = useForm<Company>();
  const { register } = form;
  return (
    <Form form={form} onSubmit={async (values) => {}}>
      <FormGrid>
        <input {...register("name", { required: true })} />
        <input {...register("description", { required: true })} />
        <input {...register("type", { required: true })} />
        <select {...register("tags")}>
          {companyTags.map((tag) => (
            <option value={tag}>{tag}</option>
          ))}
        </select>
      </FormGrid>
    </Form>
  );
};

export const TemplateForm = () => {
  const form = useForm<GameTemplate>();
  const { register } = form;
  return (
    <Form form={form} onSubmit={async (values) => {}}>
      <FormGrid>
        <input {...register("difficulty", { required: true })} />
        <input {...register("job", { required: true })} />
        <input {...register("credits", { required: true })} />
      </FormGrid>
    </Form>
  );
};
