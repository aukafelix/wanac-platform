"use client";
import FireteamManagement from "../../../../components/dashboardcomponents/FireteamManagement";
import AdminSidebar from "../../../../components/dashboardcomponents/adminsidebar";

export default function FireteamAdminManagementPage() {
  return <FireteamManagement sidebar={AdminSidebar} basePath="/admin/fireteammanagement" />;
}

