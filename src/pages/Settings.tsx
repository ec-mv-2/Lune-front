import Page from "@/components/Page";
import { Input } from "@/components/ui/Input";
import { AuthContext } from "@/contexts/AuthContext";
import { useBackendApi } from "@/hooks/useBackendApi";
import { useContext, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { format } from 'date-fns';
export function Settings() {
    const auth = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cep, setCep] = useState("")
    const [state, setState] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const backendApi = useBackendApi()

    async function updateInfoUser() {
        const dateFormated = format(birthDate, 'MM/dd/yyyy')
        await backendApi.updateUser("", "", email, password, cep, state, dateFormated)
    }
    return (
        <Page className="">
            <div className="max-w-[800px] mx-auto items-center my-10 flex">


                <div className="  flex flex-col ">
                    <div className="pl-16">

                        <div className="text-2xl text-darkBlueText " id="Help-text">
                            <p>Conta</p>
                        </div>
                        <p className="text-blueText my-[6px]">Acesse as configurações de sua conta para que seus dados estejam sempre atualizados.</p>

                        <div className="text-2xl text-darkBlueText " id="Help-text">
                            <p>Dados Pessoais</p>
                        </div>
                        <p className="text-blueText my-[6px]">Altere seus dados</p>
                    </div>


                    <div className="flex flex-col ">
                        {auth.user ?

                            <form className="" >
                                <div className="flex justify-center flex-wrap gap-5 text-darkBlueText text-sm">

                                    <Input title="Email" defaultValue={auth.user.email} onChange={(e) => { setEmail(e.target.value) }} />



                                    <Input title="Senha" type="password" onChange={(e) => { setPassword(e.target.value) }} />



                                    <Input title="Confirme sua senha" type="password" onChange={(e) => { setPassword(e.target.value) }} />



                                    <Input title="CEP" defaultValue={auth.user.cep} onChange={(e) => { setCep(e.target.value) }} />


                                    <Input title="Estado" defaultValue={auth.user.state} onChange={(e) => { setState(e.target.value) }} />



                                    <Input title="Data de nascimento" type="date" defaultValue={format(auth.user.birthDate, 'yyyy-MM-dd')} onChange={(e) => { setBirthDate(e.target.value) }} />

                                </div>
                            </form>
                            : null
                        }

                        <Dialog >
                            <DialogTrigger>
                                <div className="flex justify-center">
                                    <button type="submit" className="bg-darkBlueText rounded my-5  px-10 py-3 text-whiteLight hover:brightness-75 transition-all duration-200" >Enviar</button>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="bg-whiteLight">
                                <DialogHeader>
                                    <DialogTitle className="text-darkBlueText">Editar conta</DialogTitle>
                                </DialogHeader>
                                <div>
                                    <p>Tem certeza que deseja alterar os seus dados? Os dados alterados serão:</p>
                                    {email ? <p>Email</p> : null}
                                    {password ? <p>Senha</p> : null}
                                    {cep ? <p>CEP</p> : null}
                                    {state ? <p>Estado</p> : null}
                                    {birthDate ? <p>Data de nascimento</p> : null}

                                    <div className="flex justify-center">
                                        <DialogClose>
                                            <button type="submit" className="bg-darkBlueText rounded mt-5 px-10 py-3 text-whiteLight hover:brightness-75 transition-all duration-200" onClick={() => updateInfoUser()}>Confirmar</button>
                                        </DialogClose>
                                    </div>

                                </div>
                            </DialogContent>
                        </Dialog>

                    </div>
                    <div className="  flex flex-col ">

                    <div className="text-2xl text-darkBlueText " id="Help-text">
                            <p>Delete sua conta</p>
                        </div>
                        <p className="text-blueText my-[6px]">Deletando sua conta você perderá o acesso total sendo necessário a criação de uma nova conta!</p>
            
                        </div>
                    
                    <button type="submit" className="bg-darkBlueText rounded mt-5 px-10 py-3 text-whiteLight hover:brightness-75 transition-all duration-200" >Confirmar</button>
                                     
                            

                </div>
                <div>





                </div>

            </div>
        </Page>
    )
}