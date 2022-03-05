import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import useFetch from "use-http";

const GlobalStoreContext = React.createContext({
  user: null,
  userLoading: true,
});

export function GlobalStoreProvider({ children }) {
  const { user, isLoading: userLoading } = useUser();
  const { post: complete } = useFetch("/auth/complete");

  React.useEffect(() => {
    if (!user) return;
    complete();
  }, [user]);

  return (
    <GlobalStoreContext.Provider value={{ user, userLoading }}>
      {children}
    </GlobalStoreContext.Provider>
  );
}

export default GlobalStoreContext;
