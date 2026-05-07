
import React, { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "./authHook";
import { AuthUtils } from "./authUtils";

export interface IAuthRequiredComponentProps {
  authUrlBase: string,
  redirectUrl: string,
  children: ReactNode;
}

export const AuthRequiredComponent: React.FC<IAuthRequiredComponentProps> = ({
  authUrlBase, redirectUrl, children }) => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const authUuid = queryParams.get(AuthUtils.authUuidQueryStringName)
  const auth = useAuth()

  useEffect(() => {
    if (!auth.isAuthenticated && !auth.loading) {
      if (!authUuid) {
        if (!authUrlBase.includes('/login'))
          authUrlBase = `${authUrlBase}/login`

        localStorage.clear()
        sessionStorage.clear()
        document.cookie.split(";").forEach(cookie => {
          const name = cookie.split("=")[0].trim();
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });

        window.location.href = `${authUrlBase}?${AuthUtils.authToRedirectQueryStringName}=${encodeURIComponent(redirectUrl)}`
      }
    }
  }, [auth.isAuthenticated, auth.loading]);

  if (!auth.isAuthenticated) 
    return null;

  return <>{children}</>
};
