
import Page from "@/components/Page";
import img from "../assets/unnamed.png"
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
    DialogClose
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/Input";
import { format, add} from "date-fns";
import { JobCard } from "@/components/ui/jobCard";
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
    name: string,
    email: String,
    password: String,
    state: string,
    cep: string,
    cpf: string,
    birthDate: string,
    skills: [],
    experience: [],
    academic: [],
    bio: string,
    isContractor: boolean
}

interface PositionsProps{
    _id: string,
    title: string,
    enterprise: string,
    summary: string,
    salary: number,
    skill: string,
    jobModel: string,
    location: string,
    startDate: string,
    endDate: string,
    degree: string,
    experience: number,
    isPrivate: boolean,
    candidates: [],
    contractorId: string
}


const wait = () => new Promise((resolve) => setTimeout(resolve, 15));

export function Profile () {
    const auth = useContext(AuthContext)
    const [age, setAge] = useState(Number)
    const backendApi = useBackendApi()
    const [nameSkill, setNameSkill] = useState("")
    const {id} = useParams()
    const [openDialogUser, setOpenDialogUser] = useState(false)
    const [openDialogExperience, setOpenDialogExperience] = useState(false)
    const [openDialogAcademic, setOpenDialogAcademic] = useState(false)
    const [user, setUser] = useState<UserProps>()

    const [myPositions, setMyPositions] = useState<PositionsProps[]>([])
    const [reload, setReload] = useState(false)

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


        async function listMyPositions(){
            const data = await backendApi.listPositionByUser()
            if(data){
                setMyPositions(data.position)
            }
        }
        listMyPositions()
    }, [reload])


    function funcreload(){
        setReload(!reload)
    }


    async function addSkill(e: FormEvent){
        e.preventDefault();
        if(!nameSkill){
            return
        }
        const data = await backendApi.addSkill(nameSkill)
        if(data){
            setNameSkill("")
            funcreload()
        }
    }

    async function editSkill(skill: string){
        const data = await backendApi.editSkill(skill, nameSkill)
        if(data){
            setNameSkill("")
            funcreload()
        }
    }

    async function deleteSkill(skill: string){
        if(!skill){
            return
        }
        await backendApi.deleteSkill(skill)
        funcreload()
    }

    async function addExperience(e: FormEvent){
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        const addOneStart = add(data.inicio as string, {days: 1})
        const addOnetermination = add(data.termino as string, {days: 1})

        const startFormated = format(addOneStart, 'dd/MM/yyyy')
        const terminationFormated = format(addOnetermination, 'dd/MM/yyyy')
        
        await backendApi.addExperience(data.cargo as string, startFormated,  terminationFormated, data.empresa as string, data.atividades as string)
        wait().then(() => setOpenDialogExperience(false));
        funcreload()
    }

    async function deleteExperience(indexExp: number){
        await backendApi.deleteExperience(indexExp-1)
        funcreload()
    }

    async function addAcademic(e: FormEvent){
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        const addOneStart = add(data.inicio as string, {days: 1})
        const addOnetermination = add(data.termino as string, {days: 1})

        const startFormated = format(addOneStart, 'dd/MM/yyyy')
        const terminationFormated = format(addOnetermination, 'dd/MM/yyyy')
        await backendApi.addAcademic(data.curso as string, startFormated, terminationFormated, data.instituicao as string, data.formacao as string)
        wait().then(() => setOpenDialogAcademic(false));
        funcreload()
    }

    async function deleteAcademic(academicIndex: number){
        await backendApi.deleteAcademic(academicIndex-1)
        funcreload()
    }

    async function updateUser(e: FormEvent){
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        await backendApi.updateUser(data.name as string, data.bio as string)
        wait().then(() => setOpenDialogUser(false));
        funcreload()
    }

    return(
        <Page className="">
            <div className="min-h-screen bg-grey">
                <div>
                    <div className="bg-slate-500 h-56"></div>
                    <div className="px-10 flex gap-5">
                        <img className="h-52 w-52 rounded-full object-cover relative -top-24 border-2 border-grey" src={img} />
                        <div className="text-darkBlueText flex flex-col gap-1 mt-1">
                            <div className="text-4xl flex justify-between">
                                <h1>{user?.name}</h1>
                                
                                <Dialog onOpenChange={setOpenDialogUser} open={openDialogUser}>
                                    <DialogTrigger>
                                        <span><BsPencil className="h-6"/></span>
                                    </DialogTrigger>
                                    <DialogContent className="bg-whiteLight">
                                        <DialogHeader>
                                        <DialogTitle className="text-darkBlueText">Editar perfil</DialogTitle>
                                        </DialogHeader>
                                        <form className="flex flex-col gap-5 text-darkBlueText text-sm" onSubmit={updateUser}>
                                            <Input name="name" title="NOME" defaultValue={user?.name}/>
                                            <div>
                                                <p className="text-darkBlueText max-w-20 relative top-2 left-3 px-2 bg-whiteLight text-sm">Biografia</p>
                                                <textarea name="bio" defaultValue={user?.bio} className="w-full py-2 min-h-24 rounded-md border-[1px] border-blueText bg-whiteLight focus:outline-none px-3 focus:border-lightBlueText transition-all duration-200"/>
                                            </div>
                                            <button className="h-9 bg-darkBlueText text-white px-10 rounded-md hover:brightness-75 transition-all duration-200">Enviar</button>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            {user?.isContractor?
                                <p className="text-blueText"><i>contratante</i></p>
                                :
                                <p className="text-blueText"><i>freelancer</i></p>
                            }

                            {user?.isContractor?
                            null
                            :
                            <p>Idade: <span className="text-blueText">{age}</span></p>
                            
                            }
                            <p className="max-w-[800px] ">Biografia: <span className="text-blueText ">{user?.bio}</span></p>
                            <div className="mt-12 flex gap-10">
                                {user?.isContractor?
                                null
                                :
                                <button className="border-2 border-blueText py-5 px-10 rounded-xl">Vagas salvas</button>
                                }
                                <button className="border-2 border-blueText py-5 px-10 rounded-xl">Carta de apresentação</button>
                            </div>
                        </div>      
                    </div>     
                </div>
                {user?.isContractor?
                <div className="px-10 flex justify-between gap-y-20 my-20 text-blueText ">
                    <div className="flex-1 w-96 ">
                        <div className="bg-whiteLight p-5 min-h-52 rounded-md">
                            <p>Minhas vagas publicadas</p>
                            <div className="flex flex-col justify-center items-center gap-5 h-full ">
                                {myPositions.map(position =>{
                                    return(
                                        <JobCard className="w-full " key={position._id} job={position} isContractor={false}/>
                                    )
                                })} 
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="bg-whiteLight p-5 h-52 rounded-md max-w-96">
                            <p>Avaliação de recrutadores</p>
                            <div className="flex justify-center items-center h-full ">
                                <p>Você não possui nenhuma avaliação.</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                :
                <div className="px-10 flex justify-between gap-y-20 mt-20 text-blueText">
                    <div className="flex-1 p-10 gap-y-20 flex flex-col">
                        <div className="bg-whiteLight p-5 min-h-52 rounded-md">
                            <div className="flex justify-between">
                                <p>Habilidades</p> 
                                <div className="flex items-center gap-4">
                                    {id == auth.user?._id?
                                        <div className="flex gap-4">
                                            <Dialog >
                                                <DialogTrigger>
                                                    <p><TfiPlus/></p>
                                                </DialogTrigger>
                                                <DialogContent className="bg-whiteLight">
                                                    <DialogHeader>
                                                    <DialogTitle className="text-darkBlueText">Habilidades</DialogTitle>
                                                    </DialogHeader>
                                                    <form className="flex flex-col gap-5 text-darkBlueText text-sm" onSubmit={addSkill}>
                                                        <Input value={nameSkill} onChange={(e)=>setNameSkill(e.target.value)} title="Nova habilidade"/>
                                                        <div className="flex gap-3 flex-wrap">
                                                            {user?.skills.map(skill =>{
                                                                return(
                                                                    <p className="bg-white px-3 py-1 rounded-md">{skill}</p>
                                                                )
                                                            })}
                                                        </div>
                                                        <button className="h-9 bg-darkBlueText text-white px-10 rounded-md hover:brightness-75 transition-all duration-200">Enviar</button>
                                                    </form>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    : null
                                    }
                                </div>
                            </div>
                            <div className="flex gap-3 flex-wrap mt-3">
                                {user? 
                                user?.skills.length>0?
                                user?.skills.map(skill =>{
                                    return(
                                        <Dialog>
                                            <DialogTrigger>
                                                <p className="bg-white px-3 py-1 rounded-md hover:brightness-75 transition-all duration-200">{skill}</p>
                                            </DialogTrigger>
                                            <DialogContent className="bg-whiteLight">
                                                <DialogHeader>
                                                <DialogTitle className="text-darkBlueText">Editar habilidade</DialogTitle>
                                                </DialogHeader>
                                                <form className="flex flex-col gap-5 text-darkBlueText text-sm" >
                                                    <div className=" items-end ">
                                                        <Input defaultValue={skill} onChange={(e)=>setNameSkill(e.target.value)} title="Habilidade"/>
                                                    </div>
                                                </form>
                                                <div className="flex  gap-3  text-darkBlueText">
                                                    <DialogClose className="flex-1 hover:bg-red-500 hover:text-white transition-all duration-200 rounded-md" onClick={()=>deleteSkill(skill)}>
                                                        Deletar habilidade
                                                    </DialogClose>
                                                    <DialogClose className="h-9 bg-darkBlueText text-white rounded-md hover:brightness-75 transition-all duration-200 flex-1" onClick={()=>editSkill(skill)}>Enviar</DialogClose>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    )
                                })
                                : <div className="flex justify-center items-center w-full ">
                                    <p>Você não possui nenhuma habilidade.</p>
                                </div>
                            :null}
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
                                                <Input type="date" name="inicio" title="Data de inicio"/>
                                                <Input type="date" name="termino" title="Data de término"/>
                                                <div>
                                                    <p className="text-darkBlueText max-w-20  relative top-2 left-3 px-2 bg-whiteLight text-sm">Atividades</p>
                                                    <textarea name="atividades" className="w-full py-2 min-h-24 rounded-md border-[1px] border-blueText bg-whiteLight focus:outline-none px-3 focus:border-lightBlueText transition-all duration-200"/>
                                                </div>
                                                <button className="h-9 bg-darkBlueText text-white px-10 rounded-md hover:brightness-75 transition-all duration-200">Enviar</button>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                    
                                </div>
                            </div>
                            <div className="flex gap-3 flex-wrap mt-3">
                                {user?
                                user?.experience.length>0?
                                user?.experience.map((experience: experienceProps, index) =>{
                                    return(
                                        <Dialog >
                                            <DialogTrigger className="w-full text-left">
                                                <div className="bg-white p-3 rounded-md w-full hover:brightness-75 transition-all duration-200">
                                                    <p className="flex justify-between"><span>{experience.name}</span> <span className="text-xs text-gray-600">{experience.company}</span></p>
                                                    <p className="text-xs text-gray-600">{experience.start} - {experience.termination}</p>
                                                    <p className="text-sm">Atividades: {experience.activities}</p>
                                                </div>
                                            </DialogTrigger>
                                            <DialogContent className="bg-whiteLight">
                                                <DialogHeader>
                                                <DialogTitle className="text-darkBlueText">Editar experiência</DialogTitle>
                                                </DialogHeader>
                                                <form className="flex flex-col gap-5 text-darkBlueText text-sm">
                                                    <Input defaultValue={experience.name} name="cargo" title="Cargo"/>
                                                    <Input defaultValue={experience.company} name="empresa" title="Empresa"/>
                                                    <Input type="date" defaultValue={experience.start} name="inicio" title="Data de inicio"/>
                                                    <Input type="date" defaultValue={experience.termination} name="termino" title="Data de término"/>
                                                    <div>
                                                        <p className="text-darkBlueText max-w-20  relative top-2 left-3 px-2 bg-whiteLight text-sm">Atividades</p>
                                                        <textarea defaultValue={experience.activities} name="atividades" className="w-full py-2 min-h-24 rounded-md border-[1px] border-blueText bg-whiteLight focus:outline-none px-3 focus:border-lightBlueText transition-all duration-200"/>
                                                    </div>
                                                </form>
                                                <div className="flex  gap-3">
                                                    <DialogClose className="flex-1 hover:bg-red-500 hover:text-white transition-all duration-200 rounded-md" onClick={()=>deleteExperience(index)}>
                                                        Deletar experiência
                                                    </DialogClose>
                                                    <button className="h-9 bg-darkBlueText text-white rounded-md hover:brightness-75 transition-all duration-200 flex-1">Enviar</button>
                                                </div>
                                                
                                            </DialogContent>
                                        </Dialog>
                                    )
                                })
                                :<div className="flex justify-center items-center w-full ">
                                    <p>Você não possui nenhuma experiência.</p>
                                </div>
                                :null}
                                
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
                                                <Input type="date" name="inicio" title="Data de inicio"/>
                                                <Input type="date" name="termino" title="Data de término"/>
                                                <Input name="formacao" title="Formação"/>
                                                <button className="h-9 bg-darkBlueText text-white px-10 rounded-md hover:brightness-75 transition-all duration-200">Enviar</button>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>

                            <div className="flex gap-3 flex-wrap mt-3">
                                {user?
                                user?.academic.length>0?
                                user?.academic.map((academic: academicProps, index) =>{
                                    return(
                                        <Dialog >
                                            <DialogTrigger className="w-full text-left">
                                                <div className="bg-white p-3 rounded-md w-full hover:brightness-75 transition-all duration-200">
                                                    <p className="flex justify-between"><span>{academic.course}</span> <span className="text-xs text-gray-600">{academic.college}</span></p>
                                                    <p className="text-xs text-gray-600">{academic.start} - {academic.termination}</p>
                                                    <p className="text-sm">{academic.education}</p>
                                                </div>
                                            </DialogTrigger>
                                            <DialogContent className="bg-whiteLight">
                                                <DialogHeader>
                                                <DialogTitle className="text-darkBlueText">Formação acadêmica</DialogTitle>
                                                </DialogHeader>
                                                <form className="flex flex-col gap-5 text-darkBlueText text-sm">
                                                    <Input defaultValue={academic.course} name="curso" title="Curso"/>
                                                    <Input defaultValue={academic.college} name="instituicao" title="Instituiçâo"/>
                                                    <Input type="date" defaultValue={academic.start} name="inicio" title="Data de inicio"/>
                                                    <Input type="date" defaultValue={academic.termination} name="termino" title="Data de término"/>
                                                    <Input defaultValue={academic.education} name="formacao" title="Formação"/>
                                                </form>
                                                    
                                                <div className="flex  gap-3">
                                                    <DialogClose className="flex-1 hover:bg-red-500 hover:text-white transition-all duration-200 rounded-md" onClick={()=>deleteAcademic(index)}>
                                                        Deletar formação
                                                    </DialogClose>
                                                    <button className="h-9 bg-darkBlueText text-white rounded-md hover:brightness-75 transition-all duration-200 flex-1">Enviar</button>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    )
                                })
                                :
                                <div className="flex justify-center items-center w-full ">
                                    <p>Você não possui nenhuma formação.</p>
                                </div>
                                :null
                            }
                            </div>
                        </div>
                    </div>
                </div>
                }
                
            </div>
        </Page>
    )
}