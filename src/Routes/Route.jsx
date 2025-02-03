import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Component/HomePage/Home";
import Signup from "../Component/Shered/SignUp/Signup";

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
    }
 ])