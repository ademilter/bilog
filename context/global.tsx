import React from "react";
// import type { UserProfile } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0";
import useFetch from "use-http";
import { useRouter } from "next/router";

const GlobalStoreContext = React.createContext({
  user: null,
  userLoading: true,
});

export function GlobalStoreProvider({ children }) {
  const router = useRouter();

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
