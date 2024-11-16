import { Fragment, useCallback, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { api } from "../api"
import { catchError } from "../shared/lib/catchError"

export const AuthorizedLayout = () => {
  const navigate = useNavigate();

  const fetchUser = api.auth.getState().me;
  const check = useCallback(async () => {
    const [error, user] = await catchError(fetchUser());
    if (error || !user) {
      navigate("/auth");
    }
  }, []);

  useEffect(() => {
    check();
  }, []);

  
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};
