import { ApiRoutesNames, IAuthentication, IAuthenticationRequestBodyDefault, IAuthenticationRequestBodyFromGoogleToken, IAuthenticationRequestBodyFromUuid, IAuthenticationTokenData, IUser } from "datacenter-lib-common-ts"
import { jwtDecode } from "jwt-decode"
import React, { ReactNode, useEffect, useState } from "react"
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
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const storedAuthenticationDataStr = localStorage.getItem("@authentication")
    if (storedAuthenticationDataStr) {
      const storedAuthenticationData: IAuthenticationExt = JSON.parse(storedAuthenticationDataStr)
      const decoded = jwtDecode<IAuthenticationTokenData>(storedAuthenticationData.token)

      if ((decoded.exp ?? 0) * 1000 < Date.now()) {
        localStorage.removeItem("@authentication")
        return
      }
      setAuthData(storedAuthenticationData)
    }
  }, [])

  const login = async (arg: {
    requestPayload: IAuthenticationRequestBodyDefault | IAuthenticationRequestBodyFromUuid | IAuthenticationRequestBodyFromGoogleToken,

    onError?: (msg?: string) => void,
    onSuccess?: (authentication?: IAuthenticationExt) => void,
  }) => {
    try {
      setLoading(true)
      const url = `${baseApiUrl}${ApiRoutesNames.authentications}`
      const res = await fetch(url, {
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
          user: decToken.user
        } as IAuthenticationExt
        setAuthData(authData)

        localStorage.setItem("@authentication", JSON.stringify(authData))

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

    localStorage.removeItem("@authentication")
  }

  return (
    <AuthContext.Provider
      value={{
        authData,
        loading,
        authenticated: !!authData?.token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}