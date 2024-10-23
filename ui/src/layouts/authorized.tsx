import { Fragment, useCallback, useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { api } from "../api";
import { catchError } from "../shared/lib/catchError";

export const AuthorizedLayout = () => {
  const navigate = useNavigate();

  const check = useCallback(async () => {
    const [error, user] = await catchError(api.auth.getState().me());
    if (error) {
      navigate("/auth");
    }
    console.log({ error, user });
  }, []);

  useLayoutEffect(() => {
    check();
  }, []);

  return (
    <Fragment>
      hello world
      <Outlet />
    </Fragment>
  );
};
