
import React, { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IAuthenticationState } from "./authentication.slice";
import { AuthUtils } from "./authUtils";

export interface IAuthRequiredComponentProps {
  authenticationState: IAuthenticationState,
  // baseApiUrl: string,
  authUrlBase: string,
  redirectUrl: string,
  children: ReactNode;
}

export const AuthRequiredComponent: React.FC<IAuthRequiredComponentProps> = ({ authenticationState, authUrlBase, redirectUrl, /*baseApiUrl,*/ children }) => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const authUuid = queryParams.get(AuthUtils.authUuidQueryStringName)

  useEffect(() => {
    if (!authenticationState.payload && !authenticationState.options?.loading) {
      if (!authUuid) {
        if (!authUrlBase.includes('/login'))
          authUrlBase = `${authUrlBase}/login`
        window.location.href = `${authUrlBase}?${AuthUtils.authToRedirectQueryStringName}=${encodeURIComponent(redirectUrl)}`
      }
    }
  }, [authenticationState]);

  if (!authenticationState.payload) {
    return null;
  }

  return <>{children}</>
};
