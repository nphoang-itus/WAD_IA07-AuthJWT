import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Chờ check auth xong
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
