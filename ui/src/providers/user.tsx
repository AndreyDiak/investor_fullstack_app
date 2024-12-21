import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { AuthData, useAuthStore } from "../api/auth";
import { useStoreFetch } from "../shared/hooks";

interface SessionContextProps extends AuthData {}

const SessionContext = createContext<SessionContextProps>(
  {} as SessionContextProps
);

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const { data: session, fetch: fetchSession } = useStoreFetch(
    useAuthStore.getState().me
  );

  useEffect(() => {
    fetchSession();
  }, []);

  if (!session) {
    return;
  }

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export function useSession() {
  const context = useContext(SessionContext);
  return context;
}
