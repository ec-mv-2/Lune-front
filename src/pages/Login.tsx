import { useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/Input";
import { FormEvent, useContext, useState } from "react";
import logo from "../assets/Logo.png"
import { AuthContext } from "@/contexts/AuthContext";

export function Login(){
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const auth = useContext(AuthContext)
    async function handleLogin(event: FormEvent) {
        event.preventDefault();

        if(email && password){
            const isLogged = await auth.signin(email, password)
            if(isLogged) {
                
                navigate(`/HomePage`)
            }
        }
    }

    return(
        <div className="flex h-screen bg-whiteLight flex-col text-darkBlueText">
            <div className="p-10 flex items-center justify-between">
                <img className="h-20 cursor-pointer" onClick={()=>navigate("/")} src={logo} alt="" />
                <p className="text-darkBlueText">Ainda não possuí uma conta? <span className="text-mainBeige cursor-pointer hover:underline" onClick={()=>navigate("/")}>Cadastre-se</span></p>
            </div>
            <div className="flex  items-center mt-10 flex-col text-left">
                <div className="flex flex-col gap-3 ">
                    <h1 className="text-xl"><strong>Avance e busque suas oportunidades</strong></h1>
                    <p>Faça login no LUNE</p>
                    <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                        <Input title="EMAIL" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        
                        <Input title="SENHA" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

                        <button className="h-9 bg-darkBlueText text-white px-10 rounded-md hover:brightness-75 transition-all duration-200 mt-5" >Avançar</button>
                    </form>
                    <p className="text-center text-xs">OU</p>
                    <button className="flex gap-2 items-center justify-center bg-whiteLight border-[1px] border-blueText rounded-md w-full h-9"><FcGoogle/>Continuar com o Google</button>
                </div>
            </div>
        </div>
    )
}