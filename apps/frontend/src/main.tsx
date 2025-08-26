import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import Protected from "./pages/Protected.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello World</div>
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
