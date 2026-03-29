import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/page/Login";
import Registration from "../features/auth/page/Registration";
import MainDashboard from "../features/dashboard/page/MainDashboard";
import ProtectedRoutes from "../features/dashboard/component/ProtectedRoutes";
import Leaderboard from "../features/dashboard/page/Leaderboard";



export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoutes><MainDashboard /></ProtectedRoutes>
        // element: <MainDashboard />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Registration />
    },{
        path: "/leaderboard",
        element: <Leaderboard/>
    }
])


