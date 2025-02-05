import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Component/HomePage/Home";
import Signup from "../Component/Shered/SignUp/Signup";
import Login from "../Component/Shered/Login/Login";
import LandingRoot from "../Root/LandingRoot";
import Statistics from "../Component/HomePage/Statistic";

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
            }
        ]
    }
 ])