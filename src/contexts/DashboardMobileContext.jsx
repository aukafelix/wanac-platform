"use client";

import { createContext, useContext, useState } from "react";

const DashboardMobileContext = createContext(null);

export function DashboardMobileProvider({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <DashboardMobileContext.Provider value={{ mobileOpen, setMobileOpen }}>
      {children}
    </DashboardMobileContext.Provider>
  );
}

export function useDashboardMobile() {
  const ctx = useContext(DashboardMobileContext);
  return ctx;
}
