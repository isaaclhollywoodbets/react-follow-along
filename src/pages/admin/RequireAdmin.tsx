import { Navigate, Outlet } from "react-router";
import { useSettings } from "../../context/SettingsContext";

export default function RequireAdmin() {
  const { isAdminMode } = useSettings();
  if (!isAdminMode) return <Navigate to="/" replace />;
  return <Outlet />;
}