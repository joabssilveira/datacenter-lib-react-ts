// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import {
//   AuthenticationsApiClient, IAuthentication, IAuthenticationRequestBodyDefault, IAuthenticationRequestBodyFromGoogleToken,
//   IAuthenticationRequestBodyFromUuid, IAuthenticationTokenData, IUser
// } from 'datacenter-lib-common-ts';
// import { jwtDecode } from 'jwt-decode'; // dont use jsonwebtokens package here, its only for node projects
// import moment from 'moment';
// import { BrowserUtils } from 'fwork-jsts-browser';
// import { authCookieName } from '../common';

// export interface IAuthenticationExt extends IAuthentication {
//   user: IUser
// }

// export interface IAuthenticationState {
//   options?: {
//     loading?: boolean,
//   },
//   payload?: IAuthenticationExt,
// }

// const initState: IAuthenticationState = BrowserUtils.getCookieObj(authCookieName) ?? {}

// export const authenticationStateLoadFromApi = createAsyncThunk(
//   'authenticationStateLoadFromApi',
//   async (arg: {
//     baseApiUrl: string,
//     requestPayload: IAuthenticationRequestBodyDefault | IAuthenticationRequestBodyFromUuid | IAuthenticationRequestBodyFromGoogleToken,

//     onError?: (msg?: string) => void,
//     onSuccess?: (authentication?: IAuthentication) => void,
//     // }, { getState }) => {
//   }) => {
//     try {
//       let result: IAuthenticationState = {}

//       const response = await new AuthenticationsApiClient({ baseApiUrl: arg.baseApiUrl, }).post({
//         data: arg.requestPayload,
//       })

//       if (response?.success && response.data?.token) {
//         if (arg.onSuccess)
//           arg.onSuccess(response.data)
//         var decToken: IAuthenticationTokenData = jwtDecode(response.data.token)
//         result.payload = {
//           ...response.data,
//           user: decToken.user
//         }
//       }
//       else if (arg.onError)
//         arg.onError(response?.msg)

//       return result
//     } catch (error) {
//       if (arg.onError)
//         arg.onError('Erro ao tentar autenticar')

//       return
//     }
//   }
// )

// export const authenticationSlice = createSlice({
//   name: 'authenticationSlice',
//   initialState: initState,
//   reducers: {
//     set: (state, action: PayloadAction<IAuthenticationState>) => {
//       state.payload = action.payload.payload
//       BrowserUtils.setCookie(authCookieName, JSON.stringify(state), 1)
//     },
//     logout: (state) => {
//       state.options = undefined
//       state.payload = undefined
//       console.log('delete auth cookie from v1')
//       BrowserUtils.deleteCookie(authCookieName)
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(authenticationStateLoadFromApi.pending, (state) => {
//       if (!state.options)
//         state.options = {}
//       state.options.loading = true
//     })
//     builder.addCase(authenticationStateLoadFromApi.fulfilled, (state, response) => {
//       if (state.options)
//         state.options.loading = false
//       state.payload = response.payload?.payload
//       if (state.payload)
//         BrowserUtils.setCookie(authCookieName, JSON.stringify(state), 1)
//     })
//     builder.addCase(authenticationStateLoadFromApi.rejected, (state) => {
//       if (state.options)
//         state.options.loading = false
//     })
//   }
// })

// export const { logout: authenticationStateLogout, set: authenticationStateSet } = authenticationSlice.actions

// export default authenticationSlice.reducer

// export class AuthenticationStateHelper {
//   state: IAuthenticationState

//   constructor(args: {
//     state: IAuthenticationState
//   }) {
//     this.state = args.state
//   }

//   get authenticated(): boolean {
//     let result = false

//     if (this.state.payload?.token)
//       try {
//         var decToken: IAuthenticationTokenData = jwtDecode(this.state.payload?.token)
//         result = (decToken.exp || 0) >= moment().unix()
//       } catch (error) {
//         result = false
//       }

//     return result
//   }
// }