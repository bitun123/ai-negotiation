import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/page/Login";
import Registration from "../features/auth/page/Registration";



export const AppRouter = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Registration />
    }
])


