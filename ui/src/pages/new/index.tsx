import { GameTemplate } from "@kit/entities";
import {
  Box,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogHeading,
  DialogWrapper,
} from "@kit/ui";
import { Fragment, useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useTemplateStore } from "../../api/template";
import { useStoreFetch } from "../../shared/hooks";
import { TemplateCard } from "./_components/template_card";

export const NewGamePage = () => {
  const {
    data: templates,
    loading,
    error,
    fetch,
  } = useStoreFetch(useTemplateStore((state) => state.fetch));

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedTemplateId = searchParams.get("templateId");

  const selectedTemplate = useMemo(() => {
    if (!selectedTemplateId) {
      return undefined;
    }
    return templates?.find((template) => template._id === selectedTemplateId);
  }, [templates, selectedTemplateId]);

  const handleTemplateSelect = useCallback((template: GameTemplate) => {
    setSearchParams((curr) => {
      curr.set("templateId", template._id);
      return curr;
    });
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  if (loading) {
    return "Loading...";
  }

  return (
    <Fragment>
      <DialogWrapper
        open={!!selectedTemplate}
        onOpenChange={(v) => {
          setSearchParams((curr) => {
            curr.delete("templateId");
            return curr;
          });
        }}
      >
        <DialogContent css={{ width: "1200px" }}>
          <DialogHeader>
            <DialogHeading>{selectedTemplate?.job.name}</DialogHeading>
          </DialogHeader>
          <DialogBody>afsdfa;sdjaksjdf</DialogBody>
        </DialogContent>
      </DialogWrapper>
      <Box
        css={{
          width: "100%",
          height: "100vh",
          background: `
					  linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)),
					  url(/public/menu.jpeg)
				`,
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "32px",
        }}
      >
        {templates?.map((template) => {
          return (
            <TemplateCard
              key={template.job.name}
              template={template}
              onSelect={() => handleTemplateSelect(template)}
            />
          );
        })}
      </Box>
    </Fragment>
  );
};
