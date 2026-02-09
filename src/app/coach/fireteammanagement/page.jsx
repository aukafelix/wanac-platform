"use client";

import FireteamManagement from "../../../../components/dashboardcomponents/FireteamManagement";
import CoachSidebar from "../../../../components/dashboardcomponents/CoachSidebar";

export default function FireteamCoachPage() {
  return <FireteamManagement sidebar={CoachSidebar} basePath="/coach/fireteammanagement" />;
}
