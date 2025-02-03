import {  Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { ReactNode } from "react";


interface PrivateRouteType{
    children: ReactNode
}
export const PrivateRoute = ({ children }: PrivateRouteType) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div className="text-center">Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

