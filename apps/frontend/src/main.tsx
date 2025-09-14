import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import Protected from "./pages/Protected.tsx";
import getUser from "./singleton/user.ts";
import Workouts from "./pages/workouts/index.tsx";
import Exercises from "./pages/exercises/index.tsx";
import Root from "./pages/Root/index.tsx";

import "./styles/variables.css";
import "./styles/global.css";
import "./styles/text.css";
import ErrorPage from "./pages/error/index.js";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Protected,
        children: [
            {index: true, Component: Root}
        ]
    },
    {
        path: "auth",
        children: [
            {path: "login", Component: Login},
            {path: "register", Component: Register}
        ]
    },
    {
        path: "workouts",
        Component: Protected,
        children: [
            {index: true, Component: Workouts}
        ]
    },
    {
        path: "exercises",
        Component: Protected,
        children: [
            {index: true, Component: Exercises}
        ]
    },
    {
        path: "error",
        Component: ErrorPage,
        index: true
    }
])

window.setInterval(async () => {
    const user = getUser();
    const token = user.getAuthToken();
    if (token) await user.refreshToken();
}, 1000 * 60 * 5)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
