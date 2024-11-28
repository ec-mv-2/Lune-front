import { useEffect, useState } from "react";

export function useInputErrors(title: string, password: string = "") {
  const [pattern, setPattern] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    switch (title) {
      case "NOME":
        setPattern("^[a-zA-Z\\s]{3,}$");
        setErrorMessage("O nome deve ter pelo menos 3 letras");
        break;
      case "EMAIL":
        setPattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}(\\.[a-zA-Z]{2,})?$");
        setErrorMessage("Digite um email válido");
        break;
      case "SENHA":
        setPattern("^[^@\\s]{5,}$");
        setErrorMessage("A senha deve ter pelo menos 5 caracteres");
        break;
      case "CONFIRME A SENHA":
        setPattern("^[^@\\s]{5,}$");
          
          setErrorMessage("As senhas devem coincidir");
        
        break;
      case "CPF":
        setPattern("^\\d{3}\\.?\\d{3}\\.?\\d{3}-?\\d{2}$"); 
        setErrorMessage("Digite um CPF válido");
        break;
      case "CEP":
        setPattern("^\\d{5}-?\\d{3}$"); 
        setErrorMessage("Digite um CEP válido");
        break;
      default:
        setPattern("");
        setErrorMessage("");
        break;
    }
  }, [title, password]);

  return { pattern, errorMessage };
}
