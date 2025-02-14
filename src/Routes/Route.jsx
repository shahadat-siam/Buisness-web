import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Component/HomePage/Home";
import Signup from "../Component/Shered/SignUp/Signup";
import Login from "../Component/Shered/Login/Login";
import LandingRoot from "../Root/LandingRoot";
import Statistics from "../Component/HomePage/Statistic";
import Purchase from "../MenuOption/Purchase/Purchase";
import Sale from "../MenuOption/Sale/Sale";
import Bank from "../MenuOption/Bank/Bank";
import Dashboard from "../Component/Dashboard/Dashboard";

 export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        children:[
            {
                path: '/',
                element: <Home/>
            },
        ]
    },
    {
        path: '/signup',
        element: <Signup/>  
    },
    {
        path: '/login',
        element: <Login/>
    }, 
    {
        path: '/lroot',
        element: <LandingRoot/>,
        children: [
            {
                index: true,
                element: <Statistics/>
            },
            {
                path:'/lroot/purchase',
                element: <Purchase/>
            },
            {
                path:'/lroot/sale',
                element: <Sale/>
            },
            {
                path: '/lroot/bank',
                element: <Bank/>
            },
            {
                path: '/lroot/dashboard',
                element: <Dashboard/>
            }
        ]
    }
 ])