// src/hooks/usePageContext.jsx
import React, { useContext } from "react";

const PageContext = React.createContext(undefined);

export function PageContextProvider({ pageContext, children }) {
  return (
    <PageContext.Provider value={pageContext}>{children}</PageContext.Provider>
  );
}

export function usePageContext() {
  const pageContext = useContext(PageContext);
  if (!pageContext)
    throw new Error("usePageContext must be used within PageContextProvider");
  return pageContext;
}
