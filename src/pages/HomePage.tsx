import Page from "@/components/Page";
import { Dropdown } from '../components/ui/dropdown';
import { JobCard } from '../components/ui/jobCard';
//import { FreelancerCard } from '../components/ui/freelancerCard';
import Button from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";

import { useCepApi } from "@/hooks/useCepApi";


import { ScrollUp } from '../components/ui/scrollUp';
import { useContext, useEffect, useState } from "react";
import { RiBrush4Line, RiUserSearchLine } from "react-icons/ri";
import { VscPreview } from "react-icons/vsc";
import { SlEnvolopeLetter } from "react-icons/sl";
import { HiOutlineBookmark } from "react-icons/hi2";
import { useBackendApi } from '../hooks/useBackendApi'; 
import { FaPlus } from "react-icons/fa6";
import { BiCollection } from "react-icons/bi";
import img from "../assets/unnamed.png";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';



import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/Input";

//const exemploUser = {
  //  name: "Ana Clara Souza",
   // mainJob: "Desenvolvedora Front-end",
    //skills: ["React", "CSS", "JavaScript"],
    //experience: ["2 anos como Web Designer em CAST"],
    //location: "Rio de Janeiro - RJ",
    //education: ["Graduação em Ciência da Computação"],
//};


interface Job {
    title: string;
    enterprise: string;
    summary: string;
    skill: string[];
    location: string;
}



export function HomePage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [jobs, setJobs] = useState<Job[]>([]); 
    const [order, setOrder] = useState('Mais relevante');
    const itemsPerPage = 6;
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const api = useBackendApi();
    const [userType, setUserType] = useState<'freelancer' | 'contractor' | null>(null);
    const [openDialogPosition, setOpenDialogPosition] = useState(false);
    const [step, setStep] = useState(1);
    const [workModel, setWorkModel] = useState('distancia');
    const cepApi = useCepApi()
    const [cep, setCep] = useState("")
    const [state, setState] = useState("")
    const [remuneracao, setRemuneracao] = useState("");




    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            api.persistenceLogin(token).then((response) => {
                const user = response.user;
                setUserType(user.isContractor ? 'contractor' : 'freelancer');
            }).catch((error) => {
                console.error("Erro ao persistir login:", error);
            });
        }
    }, [api]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await api.listPosition();
                setJobs(response.position);
            } catch (error) {
                console.error("Erro ao buscar vagas:", error);
            }
        };
        fetchJobs();
    }, [api]);

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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);

    const goTo = (navigateTo: string) => {
        window.scrollTo({ top: 0 });
        navigate(navigateTo);
    };

    const formatCurrency = (value: any) => {
        const numericValue = value.replace(/[^\d]/g, "");
        const formattedValue = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(numericValue / 100); 
        return formattedValue;
    };


    return (
        <div className="min-h-screen">
            <Page className="bg-grey">
                <div className="flex justify-between items-start mx-48 my-24 space-x-8">
                    <div className="w-1/4">
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-xl text-darkBlueText">
                                Boas vindas, <span className="text-mainBeige"> {userType === 'contractor' ? 'contratante' : 'freelancer'}!</span>
                            </p>
                            <img className="h-52 w-52 rounded-full object-cover border-2 border-grey mt-6 mb-8" src={img} alt="User" />
                            
                            <Button 
                                variant="simple" 
                                onClick={() => goTo(`/Profile/${auth.user?._id}`)} 
                            >
                                Ver perfil
                            </Button>
                            <Button  
                                variant="simple"
                                onClick={() => goTo(`/Profile/${auth.user?._id}`)} 
                            >
                                Métricas
                            </Button>
                        </div>
                    </div>
                    
                    <div className="flex-1">
                        {userType === 'freelancer' && (
                            <>
                                <p className="text-darkBlueText text-3xl pb-4 text-center">Vagas que talvez te interessem</p>
                                <Dropdown onChange={setOrder} />
                                {currentJobs.map((job, index) => (
                                <JobCard key={index} job={job} />  
                                ))}
                                <Pagination 
                                    totalPages={Math.ceil(jobs.length / itemsPerPage)} 
                                    currentPage={currentPage} 
                                    onPageChange={setCurrentPage} 
                                />
                            </>
                        )}
                        {userType === 'contractor' && (
                            <>
                               <p className="text-darkBlueText text-3xl pb-4 text-center">Freelancers disponíveis</p>
                               <Dropdown onChange={setOrder} />
                               <Pagination 
                                   totalPages={Math.ceil(currentJobs.length / itemsPerPage)} 
                                   currentPage={currentPage} 
                                   onPageChange={setCurrentPage} 
                               />
                            </>
                        )}
                    </div>

                    <div className="w-1/6 flex flex-col items-right space-y-6 pt-16">
                        {userType === 'freelancer' && (
                            <>
                                <Button 
                                    variant="mainClear" 
                                    leftIcon={<HiOutlineBookmark />} 
                                    onClick={() => console.log('Vagas salvas clicado')}
                                >
                                    Vagas salvas
                                </Button>
                                <Button 
                                    variant="mainClear" 
                                    leftIcon={<RiBrush4Line />} 
                                    onClick={() => console.log('Atualizar dados pessoais clicado')}
                                >
                                    Atualizar dados pessoais  
                                </Button>
                                <Button 
                                    variant="mainClear" 
                                    leftIcon={<VscPreview />} 
                                    onClick={() => goTo(`/Positions`)}
                                >
                                    Buscar vagas                            
                                </Button>
                                <Button 
                                    variant="mainClear" 
                                    leftIcon={<SlEnvolopeLetter />} 
                                    onClick={() => console.log('Carta de apresentação clicado')}
                                >
                                    Carta de apresentação                             
                                </Button>
                            </>
                        )}
                        {userType === 'contractor' && (
                            <>
                               <Dialog onOpenChange={setOpenDialogPosition} open={openDialogPosition}>
                                    <DialogTrigger>
                                        <Button 
                                            variant="mainClear" 
                                            leftIcon={<FaPlus />} 
                                            onClick={() => console.log('Publicar uma vaga clicado')}
                                        >
                                            Publicar uma vaga                           
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-grey  py-10 px-8">
                                        <DialogHeader>
                                            <DialogTitle className="text-darkBlueText text-2xl">Publicar uma vaga</DialogTitle>
                                            <p className="text-gray-500">Encontre o freelancer ideal para o seu serviço.</p>
                                        </DialogHeader>


                                        {step === 1 && (
                                            <form className="flex flex-col gap-3 text-darkBlueText">
                                                <div className="">
                                                <Input title="Título da vaga" className="" />
                                                
                                                    <p className="text-darkBlueText max-w-36 relative top-2 left-3 px-2 bg-grey text-md">Descrição da vaga</p>
                                                    <textarea className="w-full py-2 min-h-24 rounded-md border-[1px] border-blueText bg-grey focus:outline-none px-3 focus:border-lightBlueText transition-all duration-200"/>
                                                    <Input title="Habilidades desejadas" className="" type=""/>
                                                    <div className="mb-5">
                                                    <p className="text-darkBlueText max-w-28 relative top-2 left-3 px-2 bg-grey text-md"> Escolaridade </p>
                                                    <select className="w-full rounded-md border-[1px] border-blueText bg-grey focus:outline-none focus:border-lightBlueText px-3 py-4 m">
                                                        <option value="ensinomedio">Ensino médio</option>
                                                        <option value="superiorcursando">Ensino superior (cursando)</option>
                                                        <option value="superiorcompleto">Ensino superior (completo)</option>
                                                        <option value="bachareladocursando">Bacharelado (cursando)</option>
                                                        <option value="bachareladocompleto">Bacharelado (completo)</option>
                                                        <option value="nulo">Sem preferência de escolaridade</option>
                                                        
                                                    </select>
                                                    <Input title="Área de experiência" className="" type=""/>

                                                </div>
                                                </div>
                                                <div className="flex">
                                                <Button 
                                                    variant="strongBlue" 
                                                    leftIcon={null} 
                                                    rightIcon={null}                                             
                                                    onClick={(e: { preventDefault: () => void; }) => {
                                                        e.preventDefault(); 
                                                        setStep(2);
                                                    }}
                                                >
                                                    Continuar
                                                </Button>
                                                </div>
                                            </form>
                                        )}

                                        {step === 2 && (
                                            <form className="flex flex-col gap-3 text-darkBlueText">
                                                <div className="m-">
                                                <p className="text-lightBlueText text-sm hover:text-mainBeige"
                                                onClick={() => {
                                                setStep(1); 
                                                    }}>
                                                        Voltar</p>
                                                <Input
                                                    title="Remuneração"
                                                    type="text"
                                                    value={remuneracao}
                                                    onChange={(e) => {
                                                        const formattedValue = formatCurrency(e.target.value);
                                                        setRemuneracao(formattedValue);
                                                    }}
                                                />
                                                <Input title="Início de contrato" className="" type="date" />
                                                <Input title="Fim de contrato" className="" type="date"/>

                                                <div className="mb-5">
                                                    <p className="text-darkBlueText max-w-40 relative top-2 left-3 px-2 bg-grey text-md">Modelo de trabalho</p>
                                                    <select className="w-full rounded-md border-[1px] border-blueText bg-grey focus:outline-none focus:border-lightBlueText px-3 py-4 m"
                                                    value={workModel}
                                                    onChange={(e) => setWorkModel(e.target.value)}
                                                    >
                                                        <option value="distancia">À distância</option>
                                                        <option value="presencial">Presencial</option>
                                                    </select>
                                                    {workModel === 'presencial' && (
                                                        <div>
                                                        <Input title="CEP" onChange={(e)=>getAddress(e.target.value)}/>
                                                  <Input readOnly title="Estado" value={state} onChange={(e)=>setState(e.target.value)}/>
                                                        </div>
                                                    )}

                                                  <div className="flex align-middle justify-end mt-5">
                                                    <input type="checkbox" name="Vaga privada"/><p className="ml-4"> Vaga privada</p>
                                                    
                                                    </div> 
                                                </div>

                                                </div>


                                                <div className="flex">
                                                <Button variant="strongBlue" leftIcon={null} rightIcon={null} onClick={() => console.log('Vaga publicada')} >
                                                    Publicar Vaga
                                                </Button>
                                                </div>
                                               
                                                
                                            </form>
                                        )}
                                    </DialogContent>
                                </Dialog>

                                <Button 
                                    variant="mainClear" 
                                    leftIcon={<HiOutlineBookmark />} 
                                    onClick={() => console.log('Freelancers selecionados clicado')}
                                >
                                    Freelancers selecionados                          
                                </Button>
                                <Button 
                                    variant="mainClear" 
                                    leftIcon={<RiUserSearchLine />} 
                                    onClick={() => goTo(`/Positions`)}
                                >
                                    Buscar freelancers                           
                                </Button>
                                <Button 
                                    variant="mainClear" 
                                    leftIcon={<BiCollection />} 
                                    onClick={() => console.log('Suas vagas clicado')}
                                >
                                    Suas vagas                           
                                </Button>
                            </>
                        )}
                    </div>
                </div>
                <ScrollUp />
            </Page>
        </div>
    );
}
