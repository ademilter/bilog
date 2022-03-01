import React from "react";
import { SessionContextValue, useSession } from "next-auth/react";

const GlobalStoreContext = React.createContext({
  session: null,
});

export function GlobalStoreProvider({ children }) {
  const { data: session }: SessionContextValue = useSession();

  return (
    <GlobalStoreContext.Provider value={{ session }}>
      {children}
    </GlobalStoreContext.Provider>
  );
}

export default GlobalStoreContext;
