
import Page from "@/components/Page";
import img from "../assets/testeimg.png"
import { BsPencil } from "react-icons/bs";
import { TfiPlus } from "react-icons/tfi";
import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useBackendApi } from "@/hooks/useBackendApi";
import { useParams } from "react-router-dom";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/Input";

interface experienceProps{
    name: string,
    start: string,
    termination: string,
    company: string,
    activities: string
}

interface academicProps{
    course: string,
    start: string,
    termination: string,
    college: string,
    education: string
}


interface UserProps {
    _id: string,
    name: String,
    email: String,
    password: String,
    state: string,
    cep: string,
    cpf: string,
    birthDate: string,
    skills: [],
    experience: [],
    academic: [],
}

const wait = () => new Promise((resolve) => setTimeout(resolve, 15));

export function Profile () {
    const auth = useContext(AuthContext)
    const [age, setAge] = useState(Number)
    const backendApi = useBackendApi()
    const [nameSkill, setNameSkill] = useState("")
    const {id} = useParams()
    const [openDialogExperience, setOpenDialogExperience] = useState(false)
    const [openDialogAcademic, setOpenDialogAcademic] = useState(false)

    const [user, setUser] = useState<UserProps>()

    useEffect(()=>{
        function calcAge(){
            if(!user){
                return 
            }
            var dob = new Date(user.birthDate);
            var month_diff = Date.now() - dob.getTime();  
            var age_dt = new Date(month_diff);   
            var year = age_dt.getUTCFullYear();  
            var age = Math.abs(year - 1970);
            setAge(age)
        }
        calcAge()

        async function getUser(){
            if(id){
                const data = await backendApi.getUser(id)
                if(data){
                    setUser(data.user)
                }
            }
        }
        getUser()

    }, [auth.user, addSkill, addExperience, addAcademic])


    async function addSkill(){
        if(!nameSkill){
            return
        }
        console.log(nameSkill)
        const data = await backendApi.addSkill(nameSkill)
        if(data){
            
            setNameSkill("")
        }
    }

    async function addExperience(e: FormEvent){
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        await backendApi.addExperience(data.cargo as string, data.empresa as string, data.inicio as string, data.termino as string, data.atividades as string)
        wait().then(() => setOpenDialogExperience(false));
    }

    async function addAcademic(e: FormEvent){
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        await backendApi.addAcademic(data.curso as string, data.instituicao as string, data.inicio as string, data.termino as string, data.formacao as string)
        wait().then(() => setOpenDialogAcademic(false));
    }
    
    return(
        <Page className="">
            <div className="min-h-screen bg-grey">
                <div>
                    <div className="bg-slate-500 h-56"></div>
                    <div className="px-10 flex gap-5">
                        <img className="h-52 w-52 rounded-full object-cover relative -top-24 border-2 border-grey" src={img} />
                        <div className="text-darkBlueText flex flex-col gap-1 mt-1">
                            <h1 className="text-4xl flex justify-between">{user?.name}<span><BsPencil/></span></h1>
                            <p className="text-blueText"><i>freelancer</i></p>

                            <p>Idade: <span className="text-blueText">{age}</span></p>
                            <p className="max-w-[800px] ">Biografia: <span className="text-blueText ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, deleniti amet quod asperiores totam fugit ex omnis illum fuga blanditiis laudantium accusamus a cum et quaerat in obcaecati nam! Nostrum.</span></p>
                            <div className="mt-12 flex gap-10">
                                <button className="border-2 border-blueText py-5 px-10 rounded-xl">Vagas salvas</button>
                                <button className="border-2 border-blueText py-5 px-10 rounded-xl">Carta de apresentação</button>
                            </div>
                        </div>      
                    </div>     
                </div>
                <div className="px-10 flex justify-between gap-y-20 mt-20 text-blueText">
                    <div className="flex-1 p-10 gap-y-20 flex flex-col">
                        <div className="bg-whiteLight p-5 min-h-52 rounded-md">
                            <div className="flex justify-between">
                                <p>Habilidades</p> 
                                <div className="flex items-center gap-4">
                                    <input type="text" value={nameSkill} onChange={(e)=>setNameSkill(e.target.value)} className="border-[1px] border-blueText bg-whiteLight rounded-md h-6 max-w-40 focus:outline-none px-2 focus:border-lightBlueText transition-all duration-200"/>
                                    {id == auth.user?._id?
                                        <div className="flex gap-4">
                                            <p onClick={addSkill}><TfiPlus/></p><p><BsPencil/></p>
                                        </div>
                                    : null
                                
                                    }
                                </div>
                            </div>
                            <div className="flex gap-3 flex-wrap mt-3">
                                {user?.skills.map(skill =>{
                                    return(
                                        <p className="bg-white px-3 py-1 rounded-md">{skill}</p>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="bg-whiteLight p-5 min-h-52 rounded-md">  
                            <div className="flex justify-between">
                                <p>Experiência</p>
                                <div className="flex gap-4">
                                    <Dialog onOpenChange={setOpenDialogExperience} open={openDialogExperience}>
                                        <DialogTrigger>
                                            <p><TfiPlus/></p>
                                        </DialogTrigger>
                                        <DialogContent className="bg-whiteLight">
                                            <DialogHeader>
                                            <DialogTitle className="text-darkBlueText">Experiência</DialogTitle>
                                            </DialogHeader>
                                            <form className="flex flex-col gap-5 text-darkBlueText text-sm" onSubmit={addExperience}>
                                                <Input name="cargo" title="Cargo"/>
                                                <Input name="empresa" title="Empresa"/>
                                                <Input name="inicio" title="Data de inicio"/>
                                                <Input name="termino" title="Data de término"/>
                                                <div>
                                                    <p className="text-darkBlueText max-w-20  relative top-2 left-3 px-2 bg-whiteLight text-sm">Atividades</p>
                                                    <textarea name="atividades" className="w-full py-2 min-h-24 rounded-md border-[1px] border-blueText bg-whiteLight focus:outline-none px-3 focus:border-lightBlueText transition-all duration-200"/>
                                                </div>
                                                <button className="h-9 bg-darkBlueText text-white px-10 rounded-md hover:brightness-75 transition-all duration-200">Enviar</button>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                    <p><BsPencil/></p>
                                    
                                </div>
                            </div>
                            <div className="flex gap-3 flex-wrap mt-3">
                                {auth.user?.experience.map((experience: experienceProps) =>{
                                    return(
                                        <div className="bg-white p-3 rounded-md w-full">
                                            <p className="flex justify-between"><span>{experience.name}</span> <span className="text-xs text-gray-600">{experience.company}</span></p>
                                            <p className="text-xs text-gray-600">{experience.start} - {experience.termination}</p>
                                            <p className="text-sm">Atividades: {experience.activities}</p>
                                        </div>
                                    )
                                })}
                                
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col p-10 gap-y-20">
                        <div className="bg-whiteLight p-5 h-52 rounded-md">
                            <p>Avaliação de recrutadores</p>
                            <div className="flex justify-center items-center h-full ">
                                <p>Você não possui nenhuma avaliação.</p>
                            </div>
                        </div>
                        <div className="bg-whiteLight p-5 min-h-52 rounded-md">
                            <div className="flex justify-between">
                                <p>Formação acadêmica</p>
                                <div className="flex gap-4">
                                    <Dialog onOpenChange={setOpenDialogAcademic} open={openDialogAcademic}>
                                        <DialogTrigger>
                                            <p><TfiPlus/></p>

                                        </DialogTrigger>
                                        <DialogContent className="bg-whiteLight">
                                            <DialogHeader>
                                            <DialogTitle className="text-darkBlueText">Formação acadêmica</DialogTitle>
                                            </DialogHeader>
                                            <form className="flex flex-col gap-5 text-darkBlueText text-sm" onSubmit={addAcademic}>
                                                <Input name="curso" title="Curso"/>
                                                <Input name="instituicao" title="Instituiçâo"/>
                                                <Input name="inicio" title="Data de inicio"/>
                                                <Input name="termino" title="Data de término"/>
                                                <Input name="formacao" title="Formação"/>
                                                <button className="h-9 bg-darkBlueText text-white px-10 rounded-md hover:brightness-75 transition-all duration-200">Enviar</button>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                    <p><BsPencil/></p>
                                </div>
                            </div>

                            <div className="flex gap-3 flex-wrap mt-3">
                                {user?.academic.map((academic: academicProps) =>{
                                    return(
                                        <div className="bg-white p-3 rounded-md w-full">
                                            <p className="flex justify-between"><span>{academic.course}</span> <span className="text-xs text-gray-600">{academic.college}</span></p>
                                            <p className="text-xs text-gray-600">{academic.start} - {academic.termination}</p>
                                            <p className="text-sm">{academic.education}</p>
                                        </div>
                                    )
                                })}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    )
}