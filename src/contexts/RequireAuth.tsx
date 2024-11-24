import { useContext } from "react"

import { AuthContext } from "./AuthContext";
import { useLocation  } from "react-router-dom";
import { Login } from "@/pages/Login";
import { RegisterAdm } from "@/pages/RegisterAdm";

export function RequireAuth({children}: {children: JSX.Element}) {
    const auth = useContext(AuthContext);
    const location = useLocation()
    if(!auth.user && location.pathname == "/Login"){
        return <Login/>
    }else if(!auth.user && location.pathname == "/RegisterAdm"){
        return <RegisterAdm/>
    }
    return children
}