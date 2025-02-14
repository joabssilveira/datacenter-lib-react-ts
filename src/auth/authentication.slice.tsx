import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthenticationsApiClient, IAuthentication, IAuthenticationRequestBodyDefault, IAuthenticationRequestBodyFromGoogleToken, IAuthenticationTokenData, IUser } from 'datacenter-lib-common-ts'
import { IAuthenticationRequestBodyFromUuid } from 'datacenter-lib-common-ts';
import { WebUtils } from 'fwork-jsts-common/src'
import { jwtDecode } from 'jwt-decode'; // dont use jsonwebtokens package here, its only for node projects

export interface IAuthenticationExt extends IAuthentication {
  user: IUser
}

export interface IAuthenticationState {
  options?: {
    loading?: boolean,
  },
  payload?: IAuthenticationExt
}

const cookie = WebUtils.getCookie('@authenticationState')
const cookieObj = cookie ? JSON.parse(cookie) : null

const initState: IAuthenticationState = cookieObj || {}

export const authenticationStateLoadFromApi = createAsyncThunk(
  'authenticationStateLoadFromApi',
  async (arg: {
    baseApiUrl: string,
    requestPayload: IAuthenticationRequestBodyDefault | IAuthenticationRequestBodyFromUuid | IAuthenticationRequestBodyFromGoogleToken,

    onError?: (msg?: string) => void,
    onSuccess?: (authentication?: IAuthentication) => void,
  }, { getState }) => {
    try {
      let result: IAuthenticationState = {}

      const response = await new AuthenticationsApiClient({ baseApiUrl: arg.baseApiUrl, }).post({
        data: arg.requestPayload,
      })

      if (response?.success && response.data?.token) {
        if (arg.onSuccess)
          arg.onSuccess(response.data)
        var decToken: IAuthenticationTokenData = jwtDecode(response.data.token)
        result.payload = {
          ...response.data,
          user: decToken.user
        }
      }
      else if (arg.onError)
        arg.onError(response?.msg)

      return result
    } catch (error) {
      if (arg.onError)
        arg.onError('Erro ao tentar autenticar')
    }
  }
)

export const authenticationSlice = createSlice({
  name: 'authenticationSlice',
  initialState: initState,
  reducers: {
    set: (state, action) => {
      state.payload = action.payload.payload
      WebUtils.setCookie('@authenticationState', JSON.stringify(state), 1)
    },
    logout: (state) => {
      state.options = undefined
      state.payload = undefined
      WebUtils.setCookie('@authenticationState', '', -1)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authenticationStateLoadFromApi.pending, (state) => {
      if (!state.options)
        state.options = {}
      state.options.loading = true
    })
    builder.addCase(authenticationStateLoadFromApi.fulfilled, (state, response) => {
      if (state.options)
        state.options.loading = false
      state.payload = response.payload?.payload
      if (state.payload)
        WebUtils.setCookie('@authenticationState', JSON.stringify(state), 1)
    })
    builder.addCase(authenticationStateLoadFromApi.rejected, (state) => {
      if (state.options)
        state.options.loading = false
    })
  }
})

export const { logout: authenticationStateLogout, set: authenticationStateSet } = authenticationSlice.actions

export default authenticationSlice.reducer