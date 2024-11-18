import { Box, DialogBody, DialogHeader, DialogHeading } from "@kit/ui";
import { Fragment, useCallback, useEffect } from "react";
import { useGameStore } from "../../../api/game";
import { useTemplateStore } from "../../../api/template";
import { CreditsDisplay } from "../../../entities/credit/display";
import { useStoreFetch } from "../../../shared/hooks/use_store_fetch";
import { DifficultyDisplay } from "../../../shared/ui/difficulty_display";
import { MoneyDisplay } from "../../../shared/ui/money_display";
import { Text } from "../../../shared/ui/text";

export const CreateGameDialog = () => {
  const {
    data: templates,
    loading,
    error,
    fetch,
  } = useStoreFetch(useTemplateStore((state) => state.fetch));

  const create = useGameStore((state) => state.create);
  const handleCreate = useCallback(() => {}, []);

  useEffect(() => {
    fetch();
  }, []);

  if (loading) {
    return "...";
  }

  return (
    <Fragment>
      <DialogHeader className="bg-[var(--aqua-light)]">
        <DialogHeading className="text-white font-semibold font-main">
          <Text>Создать новую игру</Text>
        </DialogHeading>
      </DialogHeader>
      <DialogBody className="flex gap-4 py-4 bg-[var(--aqua)]">
        {templates?.map((template) => (
          <Box className="p-6 rounded-lg">
            <Box className="flex flex-col gap-2">
              <img
                src={`/jobs/${template.job.type}.jpeg`}
                className="overflow-hidden rounded-md object-cover"
              />
              <Box className="flex justify-between gap-8 items-center">
                <Text>Зарплата</Text>
                <MoneyDisplay
                  className="text-white font-semibold"
                  count={template.job.startSalary}
                  variant={2}
                />
              </Box>
              <DifficultyDisplay
                difficulty={template.difficulty}
                className="w-fit ml-auto"
              />
              <Text className="font-semibold text-[#b4b2b2]">
                {template.job.name}
              </Text>
            </Box>
            <CreditsDisplay credits={template.credits} hideRepaidAmount />
          </Box>
        ))}
      </DialogBody>
    </Fragment>
  );
};
