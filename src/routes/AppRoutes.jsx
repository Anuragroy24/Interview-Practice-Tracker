import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardPage from "../pages/DashboardPage";
import QuestionsPage from "../pages/QuestionsPage";

const AppRoutes = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <DashboardPage />,
        },
        {
          path: "tracker",
          element: <QuestionsPage />,
        },
        {
          // any unknown url goes back to the dashboard
          path: "*",
          element: <Navigate to={"/"} replace />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
