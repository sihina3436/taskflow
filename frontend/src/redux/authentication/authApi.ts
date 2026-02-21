import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../util/util";

/* =========================
   TYPES
========================= */

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  message: string;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  gender: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

/* =========================
   API
========================= */

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Auth"],

  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    forgotPassword: builder.mutation<
      { message: string },
      ForgotPasswordRequest
    >({
      query: (data) => ({
        url: "/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation<
      { message: string },
      ResetPasswordRequest
    >({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),

updatePassword: builder.mutation<
  { message: string },
  { currentPassword: string; newPassword: string }
>({
  query: (data) => ({
    url: "/update-password",
    method: "POST",
    body: data,
  }),
}),
  }),
});

/* =========================
   HOOKS
========================= */

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  useUpdatePasswordMutation
} = authApi;
