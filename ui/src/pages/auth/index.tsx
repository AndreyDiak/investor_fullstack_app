import { Box } from "@gravity-ui/uikit";
import { motion, useCycle } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SignInForm } from "./_components/signin_form";
import { SignUpForm } from "./_components/signup_form";

type Mode = "signin" | "signup";

export const AuthPage = () => {
  const navigate = useNavigate();
  const [mode, toggleMode] = useCycle<Mode>("signin", "signup");
  const [touched, setTouched] = useState(false);

  return (
    <Box
      css={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to top right, var(--color-indigo) 10%, var(--color-emerald) 70%)",
      }}
    >
      <Box
        css={{
          background: "#fff",
          borderRadius: "1.5rem",
          padding: "0 8rem 2rem 8rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          minWidth: "840px",
          height: "540px",
          fontFamily: "Roboto",
          paddingTop: mode === "signin" ? "10rem" : "4rem",
        }}
      >
        <Box
          css={{
            marginRight: "6rem",
            marginBottom: "3.5rem",
          }}
        >
          <Heading
            level={1}
            css={{
              color: "rgb(55, 65, 81)",
              fontWeight: "600",
              marginLeft: "2rem",
            }}
          >
            <span css={{ color: "var(--text-emerald)" }}>#</span>
            Инвестор
          </Heading>
          <img src="public/preview.png" alt={""} css={{ width: "16rem" }} />
        </Box>
        <Box
          css={{
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
          }}
        >
          <motion.h2
            css={{
              fontWeight: "700",
              fontSize: "1.5rem",
              lineHeight: "2rem",
              color: "rgb(55,65,81)",
            }}
          >
            {mode === "signin" ? "Войдите в аккаунт" : "Создайте аккаунт"}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0.4, scale: 0.6, x: 250 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            css={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3rem",
            }}
          >
            {
              {
                signin: (
                  <SignInForm
                    onSuccess={() => {
                      navigate("/");
                    }}
                  />
                ),
                signup: (
                  <SignUpForm
                    onSuccess={() => {
                      toggleMode();
                      toast(
                        "Вы успешно зарегистрировались, теперь можете войти в свою учетную запись",
                        { type: "success" }
                      );
                    }}
                  />
                ),
              }[mode]
            }
          </motion.div>
          <BaseButton
            onClick={() => {
              toggleMode();
              if (!touched) {
                setTouched(true);
              }
            }}
            css={{
              fontWeight: "300",
              color: "rgb(107 114 128)",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              textDecoration: "underline",
              alignSelf: "center",
              ":hover": {
                color: "rgb(17 24 39)",
              },
            }}
          >
            {mode === "signin"
              ? "Создать учетную запись"
              : "Уже есть учетная запись?"}
          </BaseButton>
        </Box>
      </Box>
    </Box>
  );
};
