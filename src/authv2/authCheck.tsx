
import { AuthenticationType, IAuthenticationRequestBodyFromUuid } from "datacenter-lib-common-ts";
import React, { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthUtils } from "./authUtils";
import { useAuth } from "./authHook";

export interface IAuthCheckComponentProps {
  baseApiUrl: string,
  children: ReactNode;
}

export const AuthCheckComponent: React.FC<IAuthCheckComponentProps> = ({
  baseApiUrl, children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const authUuid = queryParams.get(AuthUtils.authUuidQueryStringName)
  const auth = useAuth()

  const onGetAuthFinish = () => {
    queryParams.delete(AuthUtils.authUuidQueryStringName);
    const newSearch = queryParams.toString();
    const newPath = `${location.pathname}${newSearch ? `?${newSearch}` : ''}`;
    navigate(newPath, { replace: true });
  }

  useEffect(() => {
    if (!auth.isAuthenticated && !auth.loading) {
      if (authUuid) {
        auth.login({
          baseApiUrl,
          requestPayload: {
            type: AuthenticationType.uuid,
            uuid: authUuid
          } as IAuthenticationRequestBodyFromUuid,
          onSuccess: onGetAuthFinish,
          onError: onGetAuthFinish
        })
      }
    }
    // else if (new AuthenticationStateHelper({ state: authenticationState }).authenticated && authUuid) {
    else if (auth.isAuthenticated && authUuid) {
      // caso o usuario ja tenha logado e tenta acessar a pagina de autenticacao, o redirect manda o authUuid
      // nesse cenario, deve-se eliminar o authUuid da url
      // isso vale para autenticacao em um dominio diferente do dominio do autenticador
      // para recursos no mesmo dominio do autenticador, o redirect quando o usuario já tem autenticado esta correto, ou seja, 
      // ele nao manda o authUuid caso o usuario já esteja logado, em dominios diferentes nao tem como o autenticador saber se o app esta logado
      onGetAuthFinish()
    }
  }, [auth.isAuthenticated, auth.loading, authUuid]);

  return <>{children}</>
};
