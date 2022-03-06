import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import useFetch from "use-http";
import type { UserProfile } from "@auth0/nextjs-auth0";

type GlobalContextProps = {
  session: UserProfile | null;
  userLoading: boolean;
};

const GlobalContext = React.createContext<GlobalContextProps>({
  session: null,
  userLoading: true,
});

export function GlobalContextProvider({ children }) {
  const { user: session, isLoading: userLoading } = useUser();
  const { post: complete } = useFetch("/auth/complete");

  React.useEffect(() => {
    if (!session) return;
    complete();
  }, [session]);

  return (
    <GlobalContext.Provider value={{ session, userLoading }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;
