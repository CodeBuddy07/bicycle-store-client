import React from "react";
import { Navigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store"; 

interface ProtectedRouteProps {
  allowedRoles: string[];
  element: React.ReactElement; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, element }) => {
  const { token, user } = useSelector((state: RootState) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    
    return <Navigate to="/unauthorized" replace />;
  }
  return element;
};

export default ProtectedRoute;
