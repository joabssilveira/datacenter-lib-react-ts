import { ApiRoutesNames, IAuthentication, IAuthenticationRequestBodyDefault, IAuthenticationRequestBodyFromGoogleToken, IAuthenticationRequestBodyFromUuid, IAuthenticationTokenData, IUser } from "datacenter-lib-common-ts"
import { BrowserUtils } from "fwork-jsts-browser"
import { jwtDecode } from "jwt-decode"
import React, { ReactNode, useEffect, useState } from "react"
import { authCookieName } from "../common"
import { AuthContext } from "./authContext"

interface Props {
  baseApiUrl: string,
  children: ReactNode
}

export interface IAuthenticationExt extends IAuthentication {
  user: IUser
}

export function AuthProvider({ baseApiUrl, children }: Props) {
  const [authData, setAuthData] = useState<IAuthenticationExt | undefined>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedAuthenticationData: IAuthenticationExt | undefined = BrowserUtils.getCookieObj(authCookieName)
    if (storedAuthenticationData) {
      try {
        const decoded = jwtDecode<IAuthenticationTokenData>(storedAuthenticationData.token)

        if ((decoded.exp ?? 0) * 1000 < Date.now()) {
          BrowserUtils.deleteCookie(authCookieName)
          return
        }
        setAuthData(storedAuthenticationData)
      } catch (error) {
        console.log(error)
      }
    }
    setLoading(false)
  }, [])

  const login = async (arg: {
    requestPayload: IAuthenticationRequestBodyDefault | IAuthenticationRequestBodyFromUuid | IAuthenticationRequestBodyFromGoogleToken,

    onError?: (msg?: string) => void,
    onSuccess?: (authentication?: IAuthenticationExt) => void,
  }) => {
    try {
      setLoading(true)
      const res = await fetch(`${baseApiUrl}${ApiRoutesNames.authentications}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg.requestPayload),
      })

      if (res.ok) {
        const data: IAuthentication = await res.json()
        var decToken: IAuthenticationTokenData = jwtDecode(data.token)

        const authData = {
          ...data,
          user: decToken.user,
        } satisfies IAuthenticationExt
        setAuthData(authData)

        BrowserUtils.setCookie(authCookieName, JSON.stringify(authData), 1)
        arg.onSuccess?.(authData)
      } else {
        arg.onError?.()
      }
    } catch (error) {
      arg.onError?.()
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setAuthData(undefined)
    BrowserUtils.deleteCookie(authCookieName)
  }

  return (
    <AuthContext.Provider
      value={{
        authData,
        loading,
        isAuthenticated: !!authData?.token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}