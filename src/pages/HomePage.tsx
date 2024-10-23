import Page from "@/components/Page";
import { Dropdown } from '../components/ui/dropdown';
import { JobCard } from '../components/ui/jobCard';
import { FreelancerCard } from '../components/ui/freelancerCard';
import Button from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";

import { ScrollUp } from '../components/ui/scrollUp';
import { useContext, useEffect, useState } from "react";
import { RiBrush4Line, RiUserSearchLine } from "react-icons/ri";
import { VscPreview } from "react-icons/vsc";
import { SlEnvolopeLetter } from "react-icons/sl";
import { HiOutlineBookmark } from "react-icons/hi2";
import { useBackendApi } from '../hooks/useBackendApi'; 
import { FaPlus } from "react-icons/fa6";
import { BiCollection } from "react-icons/bi";
import img from "../assets/unnamed.png"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/Input";
import { format, add} from "date-fns";
import { Positions } from "./Positions";

const exemploVaga = {
    title: "Desenvolvedor",
    company: "Oscorp Inc.",
    summary: "Precisamos de alguém que crie o design de um site, o fluxo do usuário e registre toda a documentação necessária.",
    skills: ["Photoshop", "Canva", "Figma"],
    differentials: ["UX/UI"],
    location: "São Paulo - SP - Brasil"
};

const exemploUser = {
    name: "Ana Clara Souza",
    mainJob: "Desenvolvedora Front-end",
    skills: ["React", "CSS", "JavaScript"],
    experience: ["2 anos como Web Designer em CAST"],
    location: "Rio de Janeiro - RJ",
    education: ["Graduação em Ciência da Computação"] 
};

interface jobPosition {
    title: string;
    enterprise: string;
    summary: string;
    skill: string[];
    location: string;
  }


export function HomePage() {
    const [currentPage, setCurrentPage] = useState(1); // Mova para dentro do componente
    const itemsPerPage = 6;

    const jobCards = Array(30).fill(exemploVaga);
    const freelancerCards = Array(30).fill(exemploUser);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentFreelancers = freelancerCards.slice(indexOfFirstItem, indexOfLastItem);
    const currentJobs = jobCards.slice(indexOfFirstItem, indexOfLastItem);

    const [order, setOrder] = useState('Mais relevante');
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const { persistenceLogin } = useBackendApi();
    const [userType, setUserType] = useState<'freelancer' | 'contractor' | null>(null);


    const [openDialogPosition, setOpenDialogPosition] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (token) {
            persistenceLogin(token).then((response) => {
                const user = response.user;

                if (user.isContractor) {
                    setUserType('contractor');
                } else {
                    setUserType('freelancer');
                }
            }).catch((error) => {
                console.error("Erro ao persistir login:", error);
            });
        }
    }, []);

    function goTo(navigateTo: string) {
        window.scrollTo({
          top: 0,
        });
        navigate(navigateTo);
    }

    return (
        <div className="min-h-screen">
            <Page className="bg-grey">
                <div className="flex justify-between items-start mx-48 my-24 space-x-8">
                    <div className="w-1/4">
                        {userType === 'contractor' && (
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-xl text-darkBlueText">
                                    Boas vindas, <span className="text-mainBeige"> contratante</span>!
                                </p>
                                <img className="h-52 w-52 rounded-full object-cover border-2 border-grey mt-6 mb-8" src={img} />
                                
                                <Button 
                                    variant="simple" 
                                    leftIcon={null} 
                                    rightIcon={null}
                                    onClick={() => goTo(`/Profile/${auth.user?._id}`)} 
                                >
                                    Ver perfil
                                </Button>
                                <Button  
                                    variant="simple"
                                    onClick={() => goTo(`/Profile/${auth.user?._id}`)} 
                                    leftIcon={null}
                                    rightIcon={null}
                                >
                                    Métricas
                                </Button>
                            </div>
                        )}
                        {userType === 'freelancer' && (
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-xl text-darkBlueText">
                                    Boas vindas, <span className="text-mainBeige"> freelancer</span>!
                                </p>
                                <img className="h-52 w-52 rounded-full object-cover border-2 border-grey mt-6" src={img} />
                                
                                <Button 
                                    variant="simple" 
                                    leftIcon={null} 
                                    rightIcon={null}
                                    onClick={() => goTo(`/Profile/${auth.user?._id}`)} 
                                >
                                    Ver perfil
                                </Button>
                                <Button  
                                    variant="simple"
                                    onClick={() => goTo(`/Profile/${auth.user?._id}`)} 
                                    leftIcon={null}
                                    rightIcon={null}
                                >
                                    Métricas
                                </Button>
                            </div>
                        )}
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
                                    totalPages={Math.ceil(jobCards.length / itemsPerPage)} 
                                    currentPage={currentPage} 
                                    onPageChange={setCurrentPage} 
                                />
                            </>
                        )}
                        {userType === 'contractor' && (
                            <>
                               <p className="text-darkBlueText text-3xl pb-4 text-center">Freelancers disponíveis</p>
                               <Dropdown onChange={setOrder} />
                               {currentFreelancers.map((freelancer, index) => (
                                   <FreelancerCard key={index} freelancer={freelancer} />
                               ))}
                               <Pagination 
                                   totalPages={Math.ceil(freelancerCards.length / itemsPerPage)} 
                                   currentPage={currentPage} 
                                   onPageChange={setCurrentPage} 
                               />
                            </>
                        )}
                    </div>

                    <div className="w-1/6 flex flex-col items-right space-y-5 pt-16">
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
                                    <DialogContent className="bg-whiteLight">
                                        <DialogHeader>
                                        <DialogTitle className="text-darkBlueText">Título da vaga</DialogTitle>
                                        </DialogHeader>
                                        <form className="flex flex-col gap-3 text-darkBlueText text-sm" >
                                            <Input title="Nome da vaga" />
                                            <div>
                                                <p className="text-darkBlueText max-w-32 relative top-2 left-3 px-2 bg-whiteLight text-sm  ">Descrição da vaga</p>
                                                <textarea name="bio" className="w-full py-2 min-h-24 rounded-md border-[1px] border-blueText bg-whiteLight focus:outline-none px-3 focus:border-lightBlueText transition-all duration-200"/>
                                            </div>
                                            <Input title="Remuneração" />
                                            <Input title="Tempo de contrato" />
                                            <div>
                                            <p className="text-darkBlueText max-w-32 relative top-2 left-3 px-2 bg-whiteLight text-sm">Descrição da vaga</p>
                                                <select name="" id=""><option value="distancia">À distância</option>
                                                <option value="presencial">Presencial</option>
                                                </select>
                                            </div>
                                            <button className="h-9 bg-darkBlueText text-white px-10 rounded-md hover:brightness-75 transition-all duration-200">Enviar</button>
                                        </form>
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
