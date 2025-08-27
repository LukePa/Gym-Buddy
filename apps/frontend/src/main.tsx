import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import Protected from "./pages/Protected.tsx";
import App from "./App.tsx";
import getUser from "./singleton/user.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "auth",
        children: [
            {path: "login", Component: Login},
            {path: "register", Component: Register}
        ]
    },
    {
        path: "test",
        Component: Protected,
        children: [
            {index: true, element: <p>You must be authenticated to see this!</p>}
        ]
        
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
