import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../util/util";

/* =========================
   TYPES
========================= */

export interface Todo {
  _id: string;
  title: string;
  description?: string;
  due_date?: string;

  status: "Completed" | "In Progress" | "Overdue" | "Not Started";

  completed: boolean;
  user_id: string;

  createdAt: string;
  updatedAt: string;
}

export interface StatusPercentage {
  percentage: number;
  inProgressPercentage: number;
  overduePercentage: number;
  notStartedPercentage: number;
}

/* =========================
   API
========================= */

export const todoApi = createApi({
  reducerPath: "todoApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/todos`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Todos"],

  endpoints: (builder) => ({
    getTodoById: builder.query<Todo, string>({
      query: (id) => `/${id}`,
      providesTags: ["Todos"],
    }),

    createTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Todos"],
    }),

    getTodoByUser: builder.query<Todo[], string>({
      query: (id) => `/user/${id}`,
      providesTags: ["Todos"],
    }),

    updateTodoStatus: builder.mutation<
      Todo,
      { todoId: string; status: Todo["status"] }
    >({
      query: ({ todoId, status }) => ({
        url: `/status/${todoId}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Todos"],
    }),

    deleteTodo: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),

    getTodoStatusPercentage: builder.query<StatusPercentage, string>({
      query: (userId) => `/status-percentage/${userId}`,
      providesTags: ["Todos"],
    }),

    setTodoIsCompleted: builder.mutation<
      Todo,
      { todoId: string; completed: boolean }
    >({
      query: ({ todoId, completed }) => ({
        url: `/complete/${todoId}`,
        method: "PUT",
        body: { completed },
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodoByIdQuery,
  useCreateTodoMutation,
  useGetTodoByUserQuery,
  useUpdateTodoStatusMutation,
  useDeleteTodoMutation,
  useGetTodoStatusPercentageQuery,
  useSetTodoIsCompletedMutation,
} = todoApi;
