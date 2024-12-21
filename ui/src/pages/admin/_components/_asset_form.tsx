import { Company, companyTags, GameTemplate } from "@kit/entities";
import {
  Button,
  Form,
  FormField,
  FormGrid,
  Option,
  Select,
  TextInput,
} from "@kit/ui";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { AssetType, useAssetsStore } from "../../../api/assets";

export const CompanyForm = () => {
  const form = useForm<Company>();
  const { register } = form;
  const addAsset = useAssetsStore((state) => state.add);

  const handleSubmit = useCallback(async (values: Company) => {
    console.log("1");
    await addAsset(AssetType.company, values);
  }, []);

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <FormGrid>
        <FormField name="name" required title="Имя">
          <TextInput />
        </FormField>
        <FormField name="description" required title="Описание">
          <TextInput />
        </FormField>
        <FormField name="type" required title="Тип">
          <TextInput />
        </FormField>
        <FormField name="tags" required title="Теги">
          <Select multiple>
            {companyTags.map((tag) => (
              <Option value={tag}>{tag}</Option>
            ))}
          </Select>
        </FormField>
        <Button type="submit">Сохранить</Button>
        {/* <button type="submit">Сохранить</button> */}
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
