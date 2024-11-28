import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/Input";
import { FormEvent, useContext, useState } from "react";
import logo from "../assets/Logo.png";
import { AuthContext } from "@/contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useContext(AuthContext);

    function validateInputs() {
        let isValid = true;

        if (!email) {
            toast.error("O campo de e-mail é obrigatório.");
            isValid = false;
        }

        if (!password) {
            toast.error("O campo de senha é obrigatório.");
            isValid = false;
        }

        return isValid;
    }

    async function handleLogin(event: FormEvent) {
        event.preventDefault();

        if (validateInputs()) {
            try {
                const isLogged = await auth.signin(email, password);
                if (isLogged) {
                    if (auth.user?.isADM) {
                        navigate("/Dashboard");
                    } else {
                        navigate("/HomePage");
                    }
                } else {
                    // Mensagem para caso as credenciais estejam incorretas
                    toast.error("Erro ao fazer login. Verifique suas credenciais.");
                }
            } catch (error) {
                console.error("Erro no login:", error);
                toast.error("Erro ao fazer login. Verifique suas credenciais.");
            }
        }
    }

    return (
        <div className="flex h-screen bg-whiteLight flex-col text-darkBlueText">
            <div className="p-10 flex items-center justify-between">
                <img className="h-20 cursor-pointer" onClick={() => navigate("/")} src={logo} alt="Logo" />
                <p className="text-darkBlueText">
                    Ainda não possuí uma conta?{" "}
                    <span className="text-mainBeige cursor-pointer hover:underline" onClick={() => navigate("/")}>
                        Cadastre-se
                    </span>
                </p>
            </div>
            <div className="flex items-center mt-10 flex-col text-left">
                <div className="flex flex-col gap-3">
                    <h1 className="text-xl"><strong>Avance e busque suas oportunidades</strong></h1>
                    <p>Faça login no LUNE</p>
                    <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                        <Input 
                            title="EMAIL" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <Input 
                            title="SENHA" 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <button 
                            type="submit" 
                            className="h-9 bg-darkBlueText text-white px-10 rounded-md hover:brightness-75 transition-all duration-200 mt-5"
                        >
                            Avançar
                        </button>
                    </form>
                    <p className="text-center text-xs">OU</p>
                    <button className="flex gap-2 items-center justify-center bg-whiteLight border-[1px] border-blueText rounded-md w-full h-9">
                        <FcGoogle /> Continuar com o Google
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
