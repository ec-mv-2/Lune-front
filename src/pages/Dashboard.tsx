import Page from "@/components/Page";
import img from "../assets/unnamed.png"

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useEffect, useState } from "react";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"
import { useBackendApi } from "@/hooks/useBackendApi";
import { useNavigate } from "react-router-dom";

const chartConfig = {
Contratantes: {
    label: "Contratantes",
    color: "#033859",
},
ContasCriadas: {
    label: "ContasCriadas",
    color: "#939ebf",
},
} satisfies ChartConfig

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
    isContractor: boolean,
    isADM: boolean,
    createdAt: Date
}

interface jobPosition {
    _id: string;
    title: string;
    enterprise: string;
    summary: string;
    skill: string;
    location: string;
    createdAt: Date
}

interface helpProps {
    _id: string;
    name: string;
    question: string;
}

export function Dashboard(){
    const [tab, setTab] = useState(false)
    const [contractors, setContractors] = useState<UserProps[]>([])
    const [freelancers, setFreelancers] = useState<UserProps[]>([])

    const [jobs, setJobs] = useState<jobPosition[]>([])
    const [helps, setHelps] = useState<helpProps[]>([])
    
    const backendApi = useBackendApi()

    const navigate = useNavigate()

    useEffect(()=>{
        async function listContractors(){
            const data = await backendApi.listContractors()
            if(data){
                setContractors(data.constractors)
            }
        }
        listContractors()

        async function listFreelancers(){
            const data = await backendApi.listFreelancer()
            if(data){
                setFreelancers(data.freelancer)
            }
        }
        listFreelancers()

        async function listJobs(){
            const data = await backendApi.listPosition()
            if(data){
                setJobs(data.position)
            }
        }
        listJobs()

        async function listHelp(){
            const data = await backendApi.listHelp()
            if(data){
                setHelps(data.help)
            }
        }
        listHelp()
    }, [])

    const chartData = [
        { month: "Janeiro", Contratantes: contractors.filter((contractor)=> new Date(contractor.createdAt).getMonth()==0).length, ContasCriadas: 0 },
        { month: "Fevereiro", Contratantes: contractors.filter((contractor)=> new Date(contractor.createdAt).getMonth()==1).length, ContasCriadas: 0 },
        { month: "Março", Contratantes: contractors.filter((contractor)=> new Date(contractor.createdAt).getMonth()==2).length, ContasCriadas: 0 },
        { month: "Abril", Contratantes: contractors.filter((contractor)=> new Date(contractor.createdAt).getMonth()==3).length, ContasCriadas: 5 },
        { month: "Maio", Contratantes: contractors.filter((contractor)=> new Date(contractor.createdAt).getMonth()==4).length, ContasCriadas: 11 },
        { month: "Junho", Contratantes: contractors.filter((contractor)=> new Date(contractor.createdAt).getMonth()==5).length, ContasCriadas: 12 },
        { month: "Julho", Contratantes: contractors.filter((contractor)=> new Date(contractor.createdAt).getMonth()==6).length, ContasCriadas: 12 },
        { month: "Agosto", Contratantes: contractors.filter((contractor)=> new Date(contractor.createdAt).getMonth()==7).length, ContasCriadas: 12 },
        { month: "Setembro", Contratantes: contractors.filter((contractor)=> new Date(contractor.createdAt).getMonth()==8).length, ContasCriadas: 12 },
        { month: "Outubro", Contratantes: contractors.filter((contractor)=> new Date(contractor.createdAt).getMonth()==9).length, ContasCriadas: 12 },
        { month: "Novembro", Contratantes: contractors.filter((contractor)=> new Date(contractor.createdAt).getMonth()==10).length, ContasCriadas: 12 },
        { month: "Dezembro", Contratantes: contractors.filter((contractor)=> new Date(contractor.createdAt).getMonth()==11).length, ContasCriadas: 12 },
    ]

    const chartDataFree = [
        { month: "Janeiro", Freelancers: freelancers.filter((contractor)=> new Date(contractor.createdAt).getMonth()==0).length, ContasCriadas: 0 },
        { month: "Fevereiro", Freelancers: freelancers.filter((contractor)=> new Date(contractor.createdAt).getMonth()==1).length, ContasCriadas: 0 },
        { month: "Março", Freelancers: freelancers.filter((contractor)=> new Date(contractor.createdAt).getMonth()==2).length, ContasCriadas: 0 },
        { month: "Abril", Freelancers: freelancers.filter((contractor)=> new Date(contractor.createdAt).getMonth()==3).length, ContasCriadas: 5 },
        { month: "Maio", Freelancers: freelancers.filter((contractor)=> new Date(contractor.createdAt).getMonth()==4).length, ContasCriadas: 11 },
        { month: "Junho", Freelancers: freelancers.filter((contractor)=> new Date(contractor.createdAt).getMonth()==5).length, ContasCriadas: 12 },
        { month: "Julho", Freelancers: freelancers.filter((contractor)=> new Date(contractor.createdAt).getMonth()==6).length, ContasCriadas: 12 },
        { month: "Agosto", Freelancers: freelancers.filter((contractor)=> new Date(contractor.createdAt).getMonth()==7).length, ContasCriadas: 12 },
        { month: "Setembro", Freelancers: freelancers.filter((contractor)=> new Date(contractor.createdAt).getMonth()==8).length, ContasCriadas: 12 },
        { month: "Outubro", Freelancers: freelancers.filter((contractor)=> new Date(contractor.createdAt).getMonth()==9).length, ContasCriadas: 12 },
        { month: "Novembro", Freelancers: freelancers.filter((contractor)=> new Date(contractor.createdAt).getMonth()==10).length, ContasCriadas: 12 },
        { month: "Dezembro", Freelancers: freelancers.filter((contractor)=> new Date(contractor.createdAt).getMonth()==11).length, ContasCriadas: 12 },
    ]

    const chartDataJobs = [
        { month: "Janeiro", Vagas: jobs.filter((job)=> new Date(job.createdAt).getMonth()==0).length, ContasCriadas: 0 },
        { month: "Fevereiro", Vagas: jobs.filter((job)=> new Date(job.createdAt).getMonth()==1).length, ContasCriadas: 0 },
        { month: "Março", Vagas: jobs.filter((job)=> new Date(job.createdAt).getMonth()==2).length, ContasCriadas: 0 },
        { month: "Abril", Vagas: jobs.filter((job)=> new Date(job.createdAt).getMonth()==3).length, ContasCriadas: 5 },
        { month: "Maio", Vagas: jobs.filter((job)=> new Date(job.createdAt).getMonth()==4).length, ContasCriadas: 11 },
        { month: "Junho", Vagas: jobs.filter((job)=> new Date(job.createdAt).getMonth()==5).length, ContasCriadas: 12 },
        { month: "Julho", Vagas: jobs.filter((job)=> new Date(job.createdAt).getMonth()==6).length, ContasCriadas: 12 },
        { month: "Agosto", Vagas: jobs.filter((job)=> new Date(job.createdAt).getMonth()==7).length, ContasCriadas: 12 },
        { month: "Setembro", Vagas: jobs.filter((job)=> new Date(job.createdAt).getMonth()==8).length, ContasCriadas: 12 },
        { month: "Outubro", Vagas: jobs.filter((job)=> new Date(job.createdAt).getMonth()==9).length, ContasCriadas: 12 },
        { month: "Novembro", Vagas: jobs.filter((job)=> new Date(job.createdAt).getMonth()==10).length, ContasCriadas: 12 },
        { month: "Dezembro", Vagas: jobs.filter((job)=> new Date(job.createdAt).getMonth()==11).length, ContasCriadas: 12 },
    ]
    return(
        <Page className="flex items-center">
            <div className="min-w-[800px] mx-auto flex flex-col gap-10 text-blueText">
                <div className="flex gap-10">
                    <Drawer>
                        <DrawerTrigger>
                            <div className="border text-left rounded border-lightBlueText flex-initial w-64 p-2">
                                <p>Contratantes</p>
                                <h1 className="text-darkBlueText text-6xl text-center p-10">{contractors.length}</h1>
                            </div>
                        </DrawerTrigger>
                        <DrawerContent className="bg-grey min-h-[500px]">
                            <div className="min-w-[600px] mx-auto">
                                <DrawerHeader>
                                    <div className="flex justify-between gap-4">
                                        <div className={!tab?`bg-darkBlueText px-5 py-3 rounded text-white`: `border rounded px-5 py-3 border-lightBlueText text-darkBlueText`} onClick={()=>setTab(false)}>
                                            <h1 className="font-semibold text-xl">Contratantes</h1>
                                            <p className="text-gray-500">Veja e modere todos os usuários.</p>
                                        </div>
                                        <div className={tab?`text-right bg-darkBlueText px-5 py-3 rounded text-white`: `text-right border rounded px-5 py-3 border-lightBlueText text-darkBlueText`} onClick={()=>setTab(true)}>
                                            <h1 className=" font-semibold text-xl">Métricas</h1>
                                            <p className="text-gray-500">Visualize as métricas de contratantes.</p>
                                        </div>
                                    </div>
                                </DrawerHeader>
                                <div className="p-5">
                                    {!tab?
                                        <div className="text-darkBlueText flex flex-col gap-3">
                                            {contractors.map(user=>{
                                                return(
                                                    <div className="flex gap-3 items-center bg-white px-3 py-2 rounded hover:brightness-75 transition-all duration-200 cursor-pointer" onClick={()=>navigate(`/Profile/${user._id}`)}>
                                                        <img className="h-10 rounded-full" src={img} alt="" />
                                                        <div>
                                                            <p>{user.name}</p>
                                                            <p className="text-gray-500">Denúncias: 0</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    :
                                        <ChartContainer config={chartConfig}>
                                            <LineChart
                                            accessibilityLayer
                                            data={chartData}
                                            margin={{
                                                top: 22,
                                                left: 12,
                                                right: 12,
                                                bottom: 22
                                            }}
                                            >
                                            <CartesianGrid vertical={false} />
                                            <XAxis
                                                dataKey="month"
                                                tickLine={true}
                                                axisLine={false}
                                                tickMargin={8}
                                                tickFormatter={(value) => value.slice(0, 3)}
                                            />
                                            <ChartTooltip
                                                cursor={false}
                                                content={<ChartTooltipContent indicator="line" />}
                                            />
                                            <Line
                                                dataKey="Contratantes"
                                                type="natural"
                                                stroke="var(--color-Contratantes)"
                                                strokeWidth={2}
                                                dot={{
                                                fill: "var(--color-Contratantes)",
                                                }}
                                                activeDot={{
                                                r: 6,
                                                }}
                                            >
                                                <LabelList
                                                position="top"
                                                offset={12}
                                                className="fill-foreground"
                                                fontSize={12}
                                                />
                                            </Line>
                                            </LineChart>
                                        </ChartContainer>
                                    }
                                    
                                </div>
                            </div>
                        </DrawerContent>
                    </Drawer>
                    
                    <Drawer>
                        <DrawerTrigger>
                            <div className="border text-left rounded border-lightBlueText flex-initial w-64 p-2">
                                <p>Freelancers</p>
                                <h1 className="text-darkBlueText text-6xl text-center p-10">{freelancers.filter((freelancer)=> freelancer.isADM == false).length}</h1>
                            </div>
                        </DrawerTrigger>
                        <DrawerContent className="bg-grey min-h-[500px]">
                            <div className="min-w-[600px] mx-auto">
                                <DrawerHeader>
                                    <div className="flex justify-between gap-4">
                                        <div className={!tab?`bg-darkBlueText px-5 py-3 rounded text-white`: `border rounded px-5 py-3 border-lightBlueText text-darkBlueText`} onClick={()=>setTab(false)}>
                                            <h1 className="font-semibold text-xl">Freelancers</h1>
                                            <p className="text-gray-500">Veja e modere todos os Freelancers.</p>
                                        </div>
                                        <div className={tab?`text-right bg-darkBlueText px-5 py-3 rounded text-white`: `text-right border rounded px-5 py-3 border-lightBlueText text-darkBlueText`} onClick={()=>setTab(true)}>
                                            <h1 className=" font-semibold text-xl">Métricas</h1>
                                            <p className="text-gray-500">Visualize as métricas de freelancers.</p>
                                        </div>
                                    </div>
                                </DrawerHeader>
                                <div className="p-5">
                                    {!tab?
                                        <div className="text-darkBlueText flex flex-col gap-3">
                                            {freelancers.filter((freelancer)=> freelancer.isADM == false).map(user=>{
                                                return(
                                                    <div className="flex gap-3 items-center bg-white px-3 py-2 rounded">
                                                        <img className="h-10 rounded-full" src={img} alt="" />
                                                        <div>
                                                            <p>{user.name}</p>
                                                            <p className="text-gray-500">Denúncias: 0</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    :
                                        <ChartContainer config={chartConfig}>
                                            <LineChart
                                            accessibilityLayer
                                            data={chartDataFree}
                                            margin={{
                                                top: 22,
                                                left: 12,
                                                right: 12,
                                                bottom: 22
                                            }}
                                            >
                                            <CartesianGrid vertical={false} />
                                            <XAxis
                                                dataKey="month"
                                                tickLine={true}
                                                axisLine={false}
                                                tickMargin={8}
                                                tickFormatter={(value) => value.slice(0, 3)}
                                            />
                                            <ChartTooltip
                                                cursor={false}
                                                content={<ChartTooltipContent indicator="line" />}
                                            />
                                            <Line
                                                dataKey="Freelancers"
                                                type="natural"
                                                stroke="var(--color-Contratantes)"
                                                strokeWidth={2}
                                                dot={{
                                                fill: "var(--color-Contratantes)",
                                                }}
                                                activeDot={{
                                                r: 6,
                                                }}
                                            >
                                                <LabelList
                                                position="top"
                                                offset={12}
                                                className="fill-foreground"
                                                fontSize={12}
                                                />
                                            </Line>
                                            </LineChart>
                                        </ChartContainer>
                                    }
                                </div>
                            </div>
                        </DrawerContent>
                    </Drawer>
                    <Drawer>
                        <DrawerTrigger>
                            <div className="border text-left rounded border-lightBlueText flex-initial w-64 p-2">
                                <p>Vagas</p>
                                <h1 className="text-darkBlueText text-6xl text-center p-10">{jobs.length}</h1>
                            </div>
                        </DrawerTrigger>
                        <DrawerContent className="bg-grey min-h-[500px]">
                            <div className="min-w-[600px] mx-auto">
                                <DrawerHeader>
                                    <div className="flex justify-between gap-4">
                                        <div className={!tab?`bg-darkBlueText px-5 py-3 rounded text-white`: `border rounded px-5 py-3 border-lightBlueText text-darkBlueText`} onClick={()=>setTab(false)}>
                                            <h1 className="font-semibold text-xl">Vagas</h1>
                                            <p className="text-gray-500">Veja e modere todos as Vagas.</p>
                                        </div>
                                        <div className={tab?`text-right bg-darkBlueText px-5 py-3 rounded text-white`: `text-right border rounded px-5 py-3 border-lightBlueText text-darkBlueText`} onClick={()=>setTab(true)}>
                                            <h1 className=" font-semibold text-xl">Métricas</h1>
                                            <p className="text-gray-500">Visualize as métricas de vagas.</p>
                                        </div>
                                    </div>
                                </DrawerHeader>
                                <div className="p-5">
                                    {!tab?
                                        <div className="text-darkBlueText flex flex-col gap-3">
                                            {jobs.map(job=>{
                                                return(
                                                    <div className="flex gap-3 items-center bg-white px-3 py-2 rounded">
                                                        <div>
                                                            <p>{job.title}</p>
                                                            <p>Empresa: {job.enterprise}</p>

                                                            <p className="text-gray-500">Denúncias: 0</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    :
                                        <ChartContainer config={chartConfig}>
                                            <LineChart
                                            accessibilityLayer
                                            data={chartDataJobs}
                                            margin={{
                                                top: 22,
                                                left: 12,
                                                right: 12,
                                                bottom: 22
                                            }}
                                            >
                                            <CartesianGrid vertical={false} />
                                            <XAxis
                                                dataKey="month"
                                                tickLine={true}
                                                axisLine={false}
                                                tickMargin={8}
                                                tickFormatter={(value) => value.slice(0, 3)}
                                            />
                                            <ChartTooltip
                                                cursor={false}
                                                content={<ChartTooltipContent indicator="line" />}
                                            />
                                            <Line
                                                dataKey="Vagas"
                                                type="natural"
                                                stroke="var(--color-Contratantes)"
                                                strokeWidth={2}
                                                dot={{
                                                fill: "var(--color-Contratantes)",
                                                }}
                                                activeDot={{
                                                r: 6,
                                                }}
                                            >
                                                <LabelList
                                                position="top"
                                                offset={12}
                                                className="fill-foreground"
                                                fontSize={12}
                                                />
                                            </Line>
                                            </LineChart>
                                        </ChartContainer>
                                    }
                                </div>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
                <div className="flex gap-10">
                    <Drawer>
                        <DrawerTrigger className="border text-left rounded border-lightBlueText flex-1 w-64 p-2">
                            <div >
                                <p>Mensagens</p>
                                <h1 className="text-darkBlueText text-6xl text-center p-10">{helps.length}</h1>
                            </div>
                        </DrawerTrigger>
                        <DrawerContent className="bg-grey min-h-[500px]">
                            <div className="min-w-[600px] mx-auto">
                                <DrawerHeader>
                                    <div className="flex justify-between gap-4">
                                        <div className={`bg-darkBlueText px-5 py-3 rounded text-white w-full`} onClick={()=>setTab(false)}>
                                            <h1 className="font-semibold text-xl">Mensagens</h1>
                                            <p className="text-gray-500">Veja e modere todos os Freelancers.</p>
                                        </div>
                                        
                                    </div>
                                </DrawerHeader>
                                <div className="p-5">
                                    <div className="text-darkBlueText flex flex-col gap-3">
                                        {helps.map(help=>{
                                            return(
                                                <div className="flex gap-3 items-center bg-white px-3 py-2 rounded">
                                                    <img className="h-10 rounded-full" src={img} alt="" />
                                                    <div>
                                                        <p>{help.name}</p>
                                                        <p className="max-w-96 break-words ">Mensagem: {help.question}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </DrawerContent>
                    </Drawer>
                    <div className="border rounded border-lightBlueText flex-1 p-2">
                        <p>Denúncias</p>
                        <h1 className="text-darkBlueText text-6xl text-center p-10">0</h1>
                    </div>
                </div>
            </div>
        </Page>
    )
}