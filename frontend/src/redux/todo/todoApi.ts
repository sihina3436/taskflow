import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../util/util";



export interface Todo {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  isCompleted: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface StatusPercentage {
  completed: number;
  pending: number;
  inProgress: number;
}



export const todoApi = createApi({
  reducerPath: "todoApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/todos`,
    credentials: "include",
  }),

  tagTypes: ["Todos"],

  endpoints: (builder) => ({
    getTodoById: builder.query<Todo[], void>({
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
    setTodoIsCompleted: builder.mutation<Todo, { todoId: string; isCompleted: boolean }>({
      query: ({ todoId, isCompleted }) => ({
        url: `/complete/${todoId}`,
        method: "PUT",
        body: { isCompleted },
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
