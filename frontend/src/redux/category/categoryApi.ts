import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../util/util";

export interface Category {
  _id: string;
  name: string;
  description?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const categoryApi = createApi({
  reducerPath: "categoryApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/categories`,
    credentials: "include",
  }),

  tagTypes: ["Categories"],

  endpoints: (builder) => ({
    getCategories: builder.query<Category[], string>({
      query: () => `/`,
      providesTags: ["Categories"],
    }),

    createCategory: builder.mutation<Category, Partial<Category>>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
} = categoryApi;
