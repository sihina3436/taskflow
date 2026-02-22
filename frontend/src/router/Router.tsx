import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddTodo from "../pages/AddTodo";
import AllTasks from "../pages/AllTasks";
import ManageCategories from "../pages/ManageCategories";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import UpdatePassword from "../componets/dashboard/UpdatePassword";
import AuthWrapper from "./AuthWrapper"; 

export const router = createBrowserRouter([
  //  AUTH ROUTES 
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },

  // PROTECTED ROUTES 
  {
    path: "/",
    element: <AuthWrapper />, 
    children: [
      {
        element: <App />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "add-task",
            element: <AddTodo />,
          },
          {
            path: "my-task",
            element: <AllTasks />,
          },
          {
            path: "task-categories",
            element: <ManageCategories />,
          },
          {
            path: "settings",
            element: <UpdatePassword />,
          },
        ],
      },
    ],
  },
]);