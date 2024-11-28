import { Input } from '@/components/ui/Input'
import logo from '../assets/Logo.png'
import { useContext, useState } from 'react'
import { useCepApi } from '@/hooks/useCepApi'

import emailjs from '@emailjs/browser'
import { useBackendApi } from '@/hooks/useBackendApi'
import { format } from 'date-fns';
import { AuthContext } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
export function RegisterAdm(){
    const cepApi = useCepApi()

    const [email, setEmail] = useState("")
    const randomCodePersonal = Math.floor(Math.random() * 100000);
    const randomCodeLune = Math.floor(Math.random() * 100000);

    const [emailCode, setEmailCode] = useState(randomCodePersonal)
    const [emailCodeLune, setEmailCodeLune] = useState(randomCodeLune)

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [cpf, setCpf] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [cep, setCep] = useState("")
    const [state, setState] = useState("")

    const [phase, setPhase] = useState(1)

    const [codeEmail, setCodeEmail] = useState(Number)
    const [codeLune, setCodeLune] = useState(Number)

    const auth = useContext(AuthContext)
    const backendApi = useBackendApi()
    const navigate = useNavigate()

    const templateParams = {
        to_email: email,
        code: emailCode,
    }


    const templateParamsLune = {
        code: emailCodeLune,
    }

    async function sendEmail() {
        try {
          await emailjs.send("service_3csmmgq", "template_z24l6cw", templateParams, "utGvGRrBcVsGkVOMu");
          setEmailCode(templateParams.code);
        } catch (error) {
          console.log(error)
        }
    }

    async function sendEmailLune() {
        try {
          await emailjs.send("service_39dd8n9", "template_ehwg2ud", templateParamsLune, "cPWvnuN8UX9m-xX_E");
          setEmailCodeLune(templateParamsLune.code);
        } catch (error) {
          console.log(error)
        }
    };

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


    async function createUser() {
        const dateFormated = format(birthDate, 'MM/dd/yyyy')
        const data = await backendApi.createUser(name, email, password, cpf, cep, dateFormated, state, false, true)
        if(data){
            console.log(data.user)
            auth.signin(email, password) 
        }
    }

    function codeVerify(){
        const inputCode = document.getElementById("inputCode")
        if(codeEmail == emailCode && codeLune == emailCodeLune){
            createUser()
        }else{
            if(inputCode){
                inputCode.style.borderColor = "#991b1b"
            }
        }
    }

    return(
        <div className="bg-whiteLight min-h-screen text-darkBlueText flex flex-col items-center w-screen ">
            <div className="p-7 flex items-center justify-between w-full ">
                <div className='flex items-end' onClick={()=>navigate("/")}>
                    <img className="h-20 cursor-pointer"  src={logo} alt="" />
                    <h1 className='text-3xl'><i>Admin</i></h1>
                </div>
                <p className="text-darkBlueText">Já possuí uma conta? <span className="text-mainBeige cursor-pointer hover:underline" onClick={()=>navigate("/Login")}>Faça login</span></p>
            </div>

            <div className={phase==1?`w-[800px]  my-10`:`w-[400px]  my-10`}>
                {phase==1?
                    <div className={"flex flex-wrap gap-5 justify-center"}>
                        <Input title="NOME" value={name} onChange={(e)=>setName(e.target.value)}/>
                        <Input title="EMAIL" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <Input title="SENHA" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <Input title="CONFIRME A SENHA" type="password" />
                        <Input title="CEP" onChange={(e)=>getAddress(e.target.value)}/>
                        <Input readOnly title="ESTADO" value={state} onChange={(e)=>setState(e.target.value)}/>

                        <Input title="CPF" value={cpf} onChange={(e)=>setCpf(e.target.value)} />
                        <Input type="date" title="Data de nascimento" value={birthDate} onChange={(e)=>setBirthDate(e.target.value)} />
                            


                        <div className="w-2/5 flex justify-end ">
                        </div>
                        <div className="w-2/5 flex justify-end ">
                            <button className="h-9 bg-darkBlueText text-white px-10 rounded-md hover:brightness-75 transition-all duration-200" onClick={()=>{
                                setPhase(2)
                                sendEmail()
                                sendEmailLune()
                                console.log(email)
                                }}>Avançar</button>
                        </div>
                    </div>
            
                :
                    <div className={"flex flex-col justify-center gap-5 " } >
                        <Input title="CÓDIGO DE EMAIL" value={codeEmail} onChange={(e)=>setCodeEmail(Number(e.target.value))}/>
                        <Input title="CÓDIGO INSTITUCIONAL" value={codeLune} onChange={(e)=>setCodeLune(Number(e.target.value))}/>
                    
                        <div className="flex justify-end ">
                            <button className="h-9 bg-darkBlueText text-white px-10 rounded-md hover:brightness-75 transition-all duration-200" onClick={()=>codeVerify()}>Avançar</button>
                        </div>
                    </div>
                }
                
                
                
            </div>
        </div>
    )
}