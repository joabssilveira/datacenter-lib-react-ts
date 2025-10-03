
import { AuthenticationType, IAuthenticationRequestBodyFromUuid } from "datacenter-lib-common-ts";
import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthenticationStateHelper, authenticationStateLoadFromApi, IAuthenticationState } from "./authentication.slice";
import { AuthUtils } from "./authUtils";

export interface IAuthCheckComponentProps {
  authenticationState: IAuthenticationState,
  baseApiUrl: string,
  children: ReactNode;
}

export const AuthCheckComponent: React.FC<IAuthCheckComponentProps> = ({ authenticationState, baseApiUrl, children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch<any>()
  const queryParams = new URLSearchParams(location.search)
  const authUuid = queryParams.get(AuthUtils.authUuidQueryStringName)

  const onGetAuthFinish = () => {
    queryParams.delete(AuthUtils.authUuidQueryStringName);
    const newSearch = queryParams.toString();
    const newPath = `${location.pathname}${newSearch ? `?${newSearch}` : ''}`;
    navigate(newPath, { replace: true });
  }

  useEffect(() => {
    // if (!authenticationState.payload && !authenticationState.options?.loading) {
    if (!new AuthenticationStateHelper({ state: authenticationState }).authenticated && !authenticationState.options?.loading) {
      if (authUuid) {
        dispatch(authenticationStateLoadFromApi({
          baseApiUrl,
          requestPayload: {
            type: AuthenticationType.uuid,
            uuid: authUuid
          } as IAuthenticationRequestBodyFromUuid,
          onSuccess: onGetAuthFinish,
          onError: onGetAuthFinish
        }))
      }
    }
    // else if (authenticationState.payload && authUuid) {
    else if (new AuthenticationStateHelper({ state: authenticationState }).authenticated && authUuid) {
      // caso o usuario ja tenha logado e tente acessar a pagina de autenticacao, o redirect manda o authUuid
      // nesse cenario, deve-se eliminar o authUuid da url
      // isso vale para autenticacao em um dominio diferente do dominio do autenticador
      // para recursos no mesmo dominio do autenticador, o redirect quando o usuario já tem autenticado esta correto, ou seja, 
      // ele nao manda o authUuid caso o usuario já esteja logado, em dominio diferentes nao tem como o autenticador saber se o app esta logado
      onGetAuthFinish()
    }
    // }, [authenticationState, location]);
  }, [authenticationState]);

  return <>{children}</>
};
