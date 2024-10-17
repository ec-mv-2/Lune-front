import { useContext } from "react"

import { AuthContext } from "./AuthContext";
import { Home } from "../pages/Home";
import { useLocation  } from "react-router-dom";
import { Login } from "@/pages/Login";

export function RequireAuth({children}: {children: JSX.Element}) {
    const auth = useContext(AuthContext);
    const location = useLocation()
    if(!auth.user && location.pathname != "/Login"){
        return <Home/>
    }else if(!auth.user && location.pathname == "/Login"){
        return <Login/>
    }
    return children
}