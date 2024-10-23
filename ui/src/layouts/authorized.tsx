import { Fragment, useCallback, useEffect, useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuthStore } from "../api/auth";
import { catchError } from "../shared/lib/catchError";

export const AuthorizedLayout = () => {
  const navigate = useNavigate();

  const fetchUser = api.auth.getState().me;
  const user = useAuthStore((state) => state.data);

  const check = useCallback(async () => {
    const [error, user] = await catchError(fetchUser());
    if (error || !user) {
      navigate("/auth");
    }
  }, []);

  useLayoutEffect(() => {
    check();
  }, []);

  useEffect(() => {}, [user]);

  return (
    <Fragment>
      hello world
      <Outlet />
    </Fragment>
  );
};
