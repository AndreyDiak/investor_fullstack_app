import { Fragment, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../api/auth";
import { useStoreFetch } from "../shared/hooks";

export const AuthorizedLayout = () => {
  const navigate = useNavigate();

  const {
    data: user,
    fetch: fetchUser,
    loaded,
  } = useStoreFetch(useAuthStore.getState().me);

  useEffect(() => {
    fetchUser();
  }, []);

  if (loaded && !user) {
    navigate("/auth");
  }

  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};
