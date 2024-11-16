import { DialogBody, DialogHeader, DialogHeading } from "@kit/ui";
import { Fragment, useCallback, useEffect } from "react";
import { useGameStore } from "../../../api/game";
import { useTemplateStore } from "../../../api/template";
import { useStoreFetch } from "../../../shared/hooks/use_store_fetch";

export const CreateGameDialog = () => {
  // const { fetch: fetchJobs, data: jobs } = useJobsStore();
  const [templates, loading, error, fetchTemplates] = useStoreFetch(
    useTemplateStore((state) => state.fetch)
  );
  const create = useGameStore((state) => state.create);

  const handleCreate = useCallback(() => {}, []);

  useEffect(() => {
    fetchTemplates().then((promise) => {
      console.log({ promise });
    });
  }, []);

  return (
    <Fragment>
      <DialogHeader>
        <DialogHeading>Создать новую игру</DialogHeading>
      </DialogHeader>
      <DialogBody className="py-4">
        {/* <Box className="flex flex-row gap-16">
          {templates?.map((template) => (
            <Box>
              <img
                src={`/jobs/${job.type}.jpeg`}
                className="w-[300px] h-[400px] overflow-hidden rounded-md"
              />
              <Box>{job.name}</Box>
              <Box>{job.startSalary}</Box>
            </Box>
          ))}
        </Box> */}
      </DialogBody>
    </Fragment>
  );
};
