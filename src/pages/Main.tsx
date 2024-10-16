import { AuthContext } from "@/contexts/AuthContext"
import { useContext } from "react"

export function Main(){
    const auth = useContext(AuthContext)
    return(
        <div>
            <button onClick={auth.signout}>Sair</button>
        </div>
    )
}