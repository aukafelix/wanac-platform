"use client";

import { DashboardMobileProvider } from "@/contexts/DashboardMobileContext";

export default function CoachLayout({ children }) {
  return <DashboardMobileProvider>{children}</DashboardMobileProvider>;
}
