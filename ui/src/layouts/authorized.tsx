import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../api/auth";
import { SessionProvider } from "../providers/user";
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
    <SessionProvider>
      <Outlet />
    </SessionProvider>
  );
};
