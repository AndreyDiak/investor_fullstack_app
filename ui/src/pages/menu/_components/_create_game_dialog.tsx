import { GameTemplate } from "@kit/entities";
import {
  Box,
  BoxProps,
  DialogBody,
  DialogHeader,
  DialogHeading,
} from "@kit/ui";
import {
  Fragment,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useGameStore } from "../../../api/game";
import { useTemplateStore } from "../../../api/template";
import { CreditsDisplay } from "../../../entities/credit/display";
import { useStoreFetch } from "../../../shared/hooks/use_store_fetch";
import {
  DifficultyDisplay,
  difficultyToColorMap,
} from "../../../shared/ui/difficulty_display";
import { MoneyDisplay } from "../../../shared/ui/money_display";
import { Text } from "../../../shared/ui/text";

export const CreateGameDialog = () => {
  const {
    data: templates,
    loading,
    error,
    fetch,
  } = useStoreFetch(useTemplateStore((state) => state.fetch));
  const [visibleTemplates, setVisibleTemplates] = useState(templates);
  const [mode, setMode] = useState<"person" | "template">("template");
  const [selectedTemplate, setSelectedTemplate] = useState<GameTemplate>();
  const [delta, setDelta] = useState<number>(0);
  const [additionalInfoVisible, setAdditionalInfoVisible] = useState(false);
  const create = useGameStore((state) => state.create);
  const handleCreate = useCallback(() => {}, []);

  const containerRef = useRef<HTMLDivElement>(null);

  const handlePersonSelect = useCallback(
    (template: GameTemplate, templateRef: RefObject<HTMLDivElement>) => {
      if (mode === "person") {
        setMode("template");
        setAdditionalInfoVisible(false);
        setVisibleTemplates(templates);
        setSelectedTemplate(undefined);
        return;
      }
      setMode("person");
      setSelectedTemplate(template);

      const containerLeft = containerRef.current?.getBoundingClientRect().left!;
      const refLeft = templateRef.current?.getBoundingClientRect().left!;
      const delta = containerLeft - refLeft;
      setDelta(delta);
      setTimeout(() => {
        setAdditionalInfoVisible(true);
        setVisibleTemplates([template]);
      }, 1000);
    },
    [mode, templates]
  );

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    setVisibleTemplates(templates);
  }, [templates]);

  if (loading) {
    return "...";
  }

  return (
    <Fragment>
      <DialogHeader css={{ background: "var(--color-aqua)" }}>
        <DialogHeading>
          <Text css={{ color: "#fff" }}>Создать новую игру</Text>
        </DialogHeading>
      </DialogHeader>
      <DialogBody
        css={{
          padding: "2rem",
          background: "var(--color-aqua-light)",
          position: "relative",
          right: 0,
          top: 0,
          width: "auto",
          display: "flex",
          justifyContent: mode === "person" ? "space-between" : "center",
          height: "fit-content",
        }}
      >
        <Box
          ref={containerRef}
          css={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {templates?.map((template) => (
            <Template
              key={template.job.name}
              template={template}
              onClick={(templateRef) => {
                handlePersonSelect(template, templateRef);
              }}
              css={{
                transitionDuration: "1000ms",
                transitionTimingFunction: "ease-in-out",
                ...(mode === "person" && {
                  ...(selectedTemplate?.job.name === template.job.name
                    ? {
                        transform: `translateX(${delta}px)`,
                      }
                    : {
                        opacity: 0,
                        transform: "translateY(-100%)",
                      }),
                }),
              }}
            />
          ))}
        </Box>
        {selectedTemplate && additionalInfoVisible && (
          <CreditsDisplay
            credits={selectedTemplate?.credits ?? []}
            css={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              minWidth: "320px",
              backgroundColor: "var(--color-",
            }}
          />
        )}
      </DialogBody>
    </Fragment>
  );
};

const Template = ({
  template,
  onClick: handleClick,
  ...rest
}: {
  template: GameTemplate;
  onClick: (ref: RefObject<HTMLDivElement>) => void;
} & Omit<BoxProps, "onClick">) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Box
      css={{ display: "flex", flexDirection: "column" }}
      ref={ref}
      onClick={() => {
        handleClick(ref);
      }}
      {...rest}
    >
      <Box
        css={{
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
          cursor: "pointer",
        }}
      >
        <img
          src={`/jobs/${template.job.type}.jpeg`}
          css={{
            maxWidth: "300px",
            maxHeight: "400px",
            borderRadius: "0.5rem",
            borderBottomRightRadius: 0,
            border: `4px solid ${difficultyToColorMap[template.difficulty]}`,
            transitionDuration: "400ms",
            transitionTimingFunction: "ease-in-out",
            zIndex: 3,
            ":hover": {
              // scale: "",
              borderBottomRightRadius: "0.5rem",
            },
          }}
        />
        <Box css={{ display: "flex", justifyContent: "space-between" }}>
          <Text css={{ color: "var(--text-secondary)", fontWeight: "500" }}>
            {template.job.name}
          </Text>
          <DifficultyDisplay
            difficulty={template.difficulty}
            css={{
              width: "fit-content",
              marginLeft: "auto",
              marginTop: "-0.25rem",
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
              position: "relative",
              "::before": {
                content: "' '",
                position: "absolute",
                left: "-0.5rem",
                top: 0,
                width: "0.5rem",
                height: "0.5rem",
                borderTopRightRadius: "0.5rem",
                background: "var(--color-aqua-light)",
                zIndex: 2,
              },
              "::after": {
                content: "' '",
                position: "absolute",
                left: "-0.5rem",
                top: 0,
                width: "0.5rem",
                height: "0.5rem",
                background: difficultyToColorMap[template.difficulty],
                zIndex: 1,
              },
            }}
          />
        </Box>
        <Box
          css={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Text css={{ color: "var(--text-secondary)" }}>Зарплата</Text>
          <MoneyDisplay
            className="text-white font-semibold"
            count={template.job.startSalary}
            variant={2}
          />
        </Box>
      </Box>
      {/* <CreditsDisplay credits={template.credits} hideRepaidAmount /> */}
    </Box>
  );
};
