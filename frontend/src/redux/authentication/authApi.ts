import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../util/util";



export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}



export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`,
    credentials: "include", // send cookies (JWT/session)
  }),

  tagTypes: ["Auth"],

  endpoints: (builder) => ({
 
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (loginData) => ({
        url: "/login",
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["Auth"],
    }),


    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (registerData) => ({
        url: "/register",
        method: "POST",
        body: registerData,
      }),
      invalidatesTags: ["Auth"],
    }),

    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),



  }),
});



export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = authApi;

export default authApi;
