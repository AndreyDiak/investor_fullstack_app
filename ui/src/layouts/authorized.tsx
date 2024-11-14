import { Box } from "@kit/ui";
import { Fragment, useCallback, useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { api } from "../api";
import { useInit } from "../shared/hooks";
import { catchError } from "../shared/lib/catchError";

export const AuthorizedLayout = () => {
  const navigate = useNavigate();

  const fetchUser = api.auth.getState().me;
  const check = useCallback(async () => {
    const [error, user] = await catchError(fetchUser());
    if (error || !user) {
      navigate("/auth");
    }
  }, []);

  const loading = useInit();

  useLayoutEffect(() => {
    check();
  }, []);

  if (loading) {
    return (
      <Box>
        Init APP...
      </Box>
    );
  }

  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};
