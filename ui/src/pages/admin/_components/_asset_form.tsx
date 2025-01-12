// import { Company, GameTemplate } from "@kit/entities";
// import { Form, FormField, FormGrid, FormSubmitButton } from "@gravity-ui/uikit";
import { Box, TextInput } from "@gravity-ui/uikit";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { AssetType, useAssetsStore } from "../../../api/assets";
import { FormField } from "../../../shared/ui/components";

export const CompanyForm = () => {
  const form = useForm<Company>();
  const addAsset = useAssetsStore((state) => state.add);

  const handleSubmit = useCallback(async (values: Company) => {
    // console.log("1");
    await addAsset(AssetType.company, values);
  }, []);

  return (
    <form>
      <FormField fieldId="name" required>
        <TextInput />
      </FormField>
    </form>
    // <Form></Form>
    // <Form form={form} onSubmit={handleSubmit}>
    //   <FormGrid>
    //     <FormField name="name" required title="Имя">
    //       <TextInput />
    //     </FormField>
    //     <FormField name="description" required title="Описание">
    //       <TextInput />
    //     </FormField>
    //     <FormField name="type" required title="Тип">
    //       {/* <TextInput /> */}
    //       <TextInput />
    //     </FormField>
    //     <FormField name="tags" required title="Теги">
    //       <Select
    //         options={companyTags.map((tag) => ({ value: tag, label: tag }))}
    //         label="Выбрать"
    //         multiple
    //       />
    //     </FormField>
    //     <FormSubmitButton>Сохранить</FormSubmitButton>
    //   </FormGrid>
    // </Form>
  );
};

export const TemplateForm = () => {
  const form = useForm<GameTemplate>();
  const { register } = form;
  return (
    <Box></Box>
    // <Form form={form} onSubmit={async (values) => {}}>
    //   <FormGrid>
    //     <input {...register("difficulty", { required: true })} />
    //     <input {...register("job", { required: true })} />
    //     <input {...register("credits", { required: true })} />
    //   </FormGrid>
    // </Form>
  );
};
