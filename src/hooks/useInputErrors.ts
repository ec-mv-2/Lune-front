import { useEffect, useState } from "react";

export function useInputErrors(title: string){
    const [pattern, setPattern] = useState("")
    const [errorMessage, setErrorMessage] = useState("")


    useEffect(()=>{
        if(title == "NOME") {
            setPattern("^[a-zA-Z\s]{3,}")
            setErrorMessage("O nome deve ter pelo menos 3 letras")
        }
        if(title == "EMAIL") {
            setPattern("^[a-zA-Z0-9\s]+@[^@\s]+.[.\s]+[^@\s]+")
            setErrorMessage("Digite um email válido")
        }
        if(title == "SENHA") {
            setPattern("[^@\s]{8,}")
            setErrorMessage("A senha deve ter pelo menos 8 caracteres")
        }
        
        if(title == "CEP") {
            setPattern("[^@\s]{8,}")
            setErrorMessage("Digite um CEP válido")
        }
        if(title == "ESTADO") setPattern("[^@\s]")
    }, [])


    return {pattern, errorMessage}
    
}