import { IAuthentication, IAuthenticationRequestBodyDefault, IAuthenticationRequestBodyFromGoogleToken, IAuthenticationRequestBodyFromUuid } from "datacenter-lib-common-ts"
import { createContext } from "react"
import { IAuthenticationExt } from "./authProvider"

export interface AuthContextType {
  authData?: IAuthenticationExt
  loading?: boolean
  isAuthenticated: boolean
  login: (arg: {
    baseApiUrl: string,
    requestPayload: IAuthenticationRequestBodyDefault | IAuthenticationRequestBodyFromUuid | IAuthenticationRequestBodyFromGoogleToken,

    onError?: (msg?: string) => void,
    onSuccess?: (authentication?: IAuthentication) => void,
  }) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)