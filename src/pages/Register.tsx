import { useCepApi } from "@/hooks/useCepApi";
import { FormEvent, useContext, useState } from "react";
import { BsPerson, BsEnvelope, BsCheckCircle  } from "react-icons/bs";
import { LiaCertificateSolid } from "react-icons/lia";
import { useNavigate, useParams } from "react-router-dom";

import emailjs from '@emailjs/browser'
import { useBackendApi } from "@/hooks/useBackendApi";
import { Input } from "@/components/ui/Input";

import logo from '../assets/Logo.png'
import { AuthContext } from "@/contexts/AuthContext";

import { format } from 'date-fns';
export function Register(){
    const cepApi = useCepApi()
    const navigate = useNavigate()
    const backendApi = useBackendApi()
    const auth = useContext(AuthContext)
    const randomCode = Math.floor(Math.random() * 100000);
    const [email, setEmail] = useState("")
    const [emailCode, setEmailCode] = useState(randomCode)
    const [phase, setPhase] = useState(1)
    const [state, setState] = useState("")

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [cpf, setCpf] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [cep, setCep] = useState("")

    function getAddress(cep: string){
        if(cep.length == 8){
            const data = cepApi.getAddress(cep)
            if(data){
                data.then(
                    function(value) {setState(value.address)
                        setCep(cep)
                    },
                    function(error) {console.log(error)}
                );
            }
        }
    }

    function slideRegister(e?: FormEvent){
        e?.preventDefault()
        if(phase == 1){
            const personalData = document.getElementById("personalData")
            const formRegister = document.getElementById("formRegister")
            const emailVerify = document.getElementById("emailVerify")
            const formCode= document.getElementById("formCode")

            if(personalData){
                //personalData.style.flex = "none"
                //personalData.style.width = "0"
            }
            if(formRegister){
                formRegister.style.display = "none"
            }
            if(formCode){
                formCode.style.display = "flex"
            }
            
            if(emailVerify){
                emailVerify.style.flex = "auto"
                emailVerify.style.display = "flex"
                emailVerify.style.width = "384px"
            }
            sendEmail()
            setPhase(phase+1)
        }else if(phase == 2){
            const emailVerify = document.getElementById("emailVerify")
            const verifyIdentity = document.getElementById("verifyIdentity")
            const formCode= document.getElementById("formCode")
            const formEnd = document.getElementById("formEnd")

            if(emailVerify){
                emailVerify.style.flex = "none"
                emailVerify.style.width = "0"
                emailVerify.style.display = "none"
            }

            if(formCode){
                formCode.style.display = "none"
            }

            if(formEnd){
                formEnd.style.display = "flex"
            }

            if(verifyIdentity){
                verifyIdentity.style.flex = "auto"
                verifyIdentity.style.display = "flex"
                verifyIdentity.style.width = "384px"
            }
            setPhase(phase+1)
        }
    }

    function slideBackRegister(e?: FormEvent){
        e?.preventDefault()
        if(phase == 2){
            const personalData = document.getElementById("personalData")
            const formRegister = document.getElementById("formRegister")
            const emailVerify = document.getElementById("emailVerify")
            const formCode= document.getElementById("formCode")

            if(personalData){
                personalData.style.flex = "auto"
                personalData.style.width = "384px"
            }
            if(formRegister){
                formRegister.style.display = "flex"
            }
            if(formCode){
                formCode.style.display = "none"
            }
            if(emailVerify){
                emailVerify.style.flex = "none"
                emailVerify.style.display = "hidden"
                emailVerify.style.width = "0"
            }
            setPhase(phase-1)
        }else if(phase == 3){
            const emailVerify = document.getElementById("emailVerify")
            const verifyIdentity = document.getElementById("verifyIdentity")
            const formCode= document.getElementById("formCode")
            const formEnd = document.getElementById("formEnd")

            if(emailVerify){
                emailVerify.style.flex = "auto"
                emailVerify.style.width = "384px"
                emailVerify.style.display = "flex"

            }
            if(formCode){
                formCode.style.display = "flex"
            }
            if(formEnd){
                formEnd.style.display = "none"
            }
            if(verifyIdentity){
                verifyIdentity.style.flex = "none"
                verifyIdentity.style.display = "hidden"
                verifyIdentity.style.width = "0"
            }
            setPhase(phase-1)
        }
    }
    
    const templateParams = {
        to_email: email,
        code: emailCode,
    }

    async function sendEmail() {
        try {
          await emailjs.send("service_3csmmgq", "template_z24l6cw", templateParams, "utGvGRrBcVsGkVOMu");
          setEmailCode(templateParams.code);
        } catch (error) {
          console.log(error)
        }
    };

    const [code, setCode] = useState(Number)
    function codeVerify(){
        const inputCode = document.getElementById("inputCode")
        if(code == emailCode){
            slideRegister()
        }else{
            if(inputCode){
                inputCode.style.borderColor = "#991b1b"
            }
        }
    }
    const {isContractor} = useParams()
    let contractorBool = (isContractor === "true")


    async function createUser() {
        const dateFormated = format(birthDate, 'MM/dd/yyyy')
        const data = await backendApi.createUser(name, email, password, cpf, cep, dateFormated, state, contractorBool)
        if(data){
            console.log(data.user)
            auth.signin(email, password)
        }
    }

    if (auth.user) {
        navigate("/");
    }


    return(
        <div className="bg-whiteLight min-h-screen text-darkBlueText flex flex-col items-center w-screen ">
            <div className="p-7 flex items-center justify-between w-full ">
                <img className="h-20 cursor-pointer" onClick={()=>navigate('/')} src={logo} alt="" />
                <p className="text-darkBlueText">Já possuí uma conta? <span className="text-mainBeige cursor-pointer hover:underline" onClick={()=>navigate("/Login")}>Faça login</span></p>
            </div>
            <div className="flex flex-wrap gap-10 lg:gap-0  max-w-[1350px] w-full h-4/6 my-auto">
                <div className="flex justify-center items-center flex-auto w-32 ">
                    <div className="bg-[#dfdfdf] h-28 lg:h-96 p-10 flex items-center rounded-xl min-w-96">~
                        {isContractor == "false"?
                        <ul className="text-2xl flex flex-row lg:flex-col gap-5">
                            <li className="flex gap-3 flex-col lg:flex-row text-sm lg:text-2xl items-center "><p className={phase==1?"bg-[#939ebf] p-1 rounded-md w-8 h-8" : "bg-[#bfbfbf] p-1 rounded-md w-8 h-8"}><BsPerson className="text-2xl"/></p> {phase >1?<p className="text-[#bfbfbf] text-center"><s>Dados pessoais</s></p>: <p className="text-center">Dados pessoais</p> }</li>
                            <li className="flex gap-3 flex-col lg:flex-row text-sm lg:text-2xl items-center "><p className={phase==2?"bg-[#939ebf] p-1 rounded-md w-8 h-8" : "bg-[#bfbfbf] p-1 rounded-md w-8 h-8"}><BsEnvelope className="text-2xl"/></p> {phase >2?<p className="text-[#bfbfbf] text-center"><s>Verifique seu email</s></p>: <p className="text-center">Verifique seu email</p> }</li>
                            <li className="flex gap-3 flex-col lg:flex-row text-sm lg:text-2xl items-center "><p className={phase==3?"bg-[#939ebf] p-1 rounded-md w-8 h-8" : "bg-[#bfbfbf] p-1 rounded-md w-8 h-8"}><LiaCertificateSolid className="text-2xl"/></p> <p className="text-center">Verifique sua identidade</p></li>
                            <li className="flex gap-3 flex-col items-center lg:flex-row text-sm lg:text-2xl"><p className={phase==4?"bg-[#939ebf] p-1 rounded-md w-8 h-8" : "bg-[#bfbfbf] p-1 rounded-md w-8 h-8"}><BsCheckCircle className="text-2xl"/></p> <p>Concluído</p></li>
                        </ul>
                        :
                        <ul className="text-2xl flex flex-row lg:flex-col gap-5">
                            <li className="flex gap-3 flex-col lg:flex-row text-sm lg:text-2xl items-center "><p className={phase==1?"bg-[#939ebf] p-1 rounded-md w-8 h-8" : "bg-[#bfbfbf] p-1 rounded-md w-8 h-8"}><BsPerson className="text-2xl"/></p> {phase >1?<p className="text-[#bfbfbf] text-center"><s>Dados empresariais</s></p>: <p className="text-center">Dados empresariais</p> }</li>
                            <li className="flex gap-3 flex-col lg:flex-row text-sm lg:text-2xl items-center "><p className={phase==2?"bg-[#939ebf] p-1 rounded-md w-8 h-8" : "bg-[#bfbfbf] p-1 rounded-md w-8 h-8"}><BsEnvelope className="text-2xl"/></p> {phase >2?<p className="text-[#bfbfbf] text-center"><s>Verifique seu email</s></p>: <p className="text-center">Verifique seu email</p> }</li>
                            <li className="flex gap-3 flex-col lg:flex-row text-sm lg:text-2xl items-center "><p className={phase==3?"bg-[#939ebf] p-1 rounded-md w-8 h-8" : "bg-[#bfbfbf] p-1 rounded-md w-8 h-8"}><LiaCertificateSolid className="text-2xl"/></p> <p className="text-center">Verifique sua identidade</p></li>
                            <li className="flex gap-3 flex-col items-center lg:flex-row text-sm lg:text-2xl"><p className={phase==4?"bg-[#939ebf] p-1 rounded-md w-8 h-8" : "bg-[#bfbfbf] p-1 rounded-md w-8 h-8"}><BsCheckCircle className="text-2xl"/></p> <p>Concluído</p></li>
                        </ul>
                        }
                        
                    </div>
                </div>
                
                <div className={phase !=1? "flex-none flex flex-col items-center justify-center w-0 overflow-hidden transition-all duration-200 " : "flex-auto flex flex-col items-center justify-center lg:w-96 w-full overflow-hidden transition-all duration-200 "}>
                    {isContractor == "false"?
                        <div className=" text-center">
                            <h1 className="text-4xl"><strong>Cadastre-se como freelancer</strong></h1>
                            <p>Deseja se cadastrar como contratante? <span className="text-mainBeige cursor-pointer hover:underline" onClick={()=>navigate("/")}>Clique aqui</span></p>
                        </div>
                    :
                        <div className=" text-center">
                            <h1 className="text-4xl"><strong>Cadastre-se como um contratante</strong></h1>
                            <p>Deseja se cadastrar como freelancer? <span className="text-mainBeige cursor-pointer hover:underline" onClick={()=>navigate("/")}>Clique aqui</span></p>
                        </div>
                    }
                      
                    <form className={phase !=1? "flex flex-nowrap gap-10 justify-center" : "flex flex-wrap gap-10 justify-center"}>
                        <Input title="NOME" value={name} onChange={(e)=>setName(e.target.value)}/>
                        <Input title="EMAIL" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <Input title="SENHA" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <Input title="CONFIRME A SENHA" type="password" />
                        <Input title="CEP" onChange={(e)=>getAddress(e.target.value)}/>
                        <Input readOnly title="ESTADO" value={state} onChange={(e)=>setState(e.target.value)}/>

                        <div className="w-2/5 flex justify-end ">
                        </div>
                        <div className="w-2/5 flex justify-end ">
                            <button className="h-9 bg-darkBlueText text-white px-10 rounded-md hover:brightness-75 transition-all duration-200" onClick={slideRegister}>Avançar</button>
                        </div>
                    </form>
                </div>
                <div className={phase !=2? "w-0 hidden flex-none items-center flex-col justify-center transition-all duration-200 " : "w-full lg:w-96 flex flex-auto items-center flex-col justify-center transition-all duration-200 " }>
                    <div className={phase !=2? "w-full hidden flex-col items-center justify-center gap-10" :"w-full flex flex-col items-center justify-center gap-10" }>
                        <div className=" text-center">
                            <h1 className="text-4xl"><strong>Confirme seu email</strong></h1>
                            <p>Uma mensagem foi enviada para endereço de email {email}</p>
                        </div>
                        <div className="w-2/5 flex flex-col justify-center">
                            <div className="flex">
                                <p className=" relative top-2 left-3 px-2 bg-whiteLight text-sm">Código</p>
                            </div>
                            <div className="flex flex-col justify-center gap-10">
                                <input className="border-[1px] border-blueText bg-whiteLight rounded-md h-9 w-full focus:outline-none px-3 focus:border-lightBlueText transition-all duration-200"
                                type="text"
                                id="inputCode"
                                onChange={(e)=>setCode(Number(e.target.value))}
                                />
                                <button className="h-9 w-full bg-darkBlueText text-white px-10 rounded-md hover:brightness-75 transition-all duration-200" onClick={codeVerify}>Avançar</button>
                                <p className="text-mainBeige cursor-pointer hover:underline text-center" onClick={slideBackRegister}>Voltar</p>
                            </div>
                            
                        </div>
                    </div>
                </div>  
                <div className={phase !=3? "w-0 hidden flex-none items-center flex-col justify-center transition-all duration-200" :"lg:w-96 w-full flex flex-none items-center flex-col justify-center transition-all duration-200"} id="verifyIdentity">
                    <div className="w-full flex flex-col items-center justify-center gap-10" id="formEnd">
                        <div className=" text-center">
                            <h1 className="text-4xl"><strong>Quase lá</strong></h1>
                            <p>Por último informe seus dados</p>
                        </div>
                        <div className="w-2/5 flex flex-col justify-center gap-10">
                            
                            <Input title="CPF" value={cpf} onChange={(e)=>setCpf(e.target.value)} />
                            <Input type="date" title="Data de nascimento" value={birthDate} onChange={(e)=>setBirthDate(e.target.value)} />
                            
                            <div className="flex flex-col justify-center gap-10">
                                <button className="h-9 w-full bg-darkBlueText text-white px-10 rounded-md hover:brightness-75 transition-all duration-200" onClick={createUser}>Concluir</button>
                                <p className="text-mainBeige cursor-pointer hover:underline text-center" onClick={slideBackRegister}>Voltar</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}