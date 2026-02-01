"use client";

import { DashboardMobileProvider } from "@/contexts/DashboardMobileContext";

export default function ClientLayout({ children }) {
  return <DashboardMobileProvider>{children}</DashboardMobileProvider>;
}
