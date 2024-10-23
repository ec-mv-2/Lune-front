import Page from "@/components/Page";
import { Dropdown } from '../components/ui/dropdown';
import { JobCard } from '../components/ui/jobCard';
import { ScrollUp } from '../components/ui/scrollUp';
import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiBrush4Line, RiUserSearchLine } from "react-icons/ri";
import { VscPreview } from "react-icons/vsc";
import { SlEnvolopeLetter } from "react-icons/sl";
import { HiOutlineBookmark } from "react-icons/hi2";
import { useBackendApi } from '../hooks/useBackendApi'; 
import { FaPlus } from "react-icons/fa6";
import { BiCollection } from "react-icons/bi";

const exemplo = {
    title: "Desenvolvedor",
    company: "Oscorp Inc.",
    summary: "Precisamos de alguém que crie o design de um site, o fluxo do usuário e registre toda a documentação necessária.",
    skills: ["Photoshop", "Canva", "Figma"],
    differentials: ["UX/UI"],
    location: "São Paulo - SP - Brasil"
};

export function HomePage() {
    const [order, setOrder] = useState('Mais relevante');

    const { persistenceLogin } = useBackendApi();
    const [userType, setUserType] = useState<'freelancer' | 'contractor' | null>(null);

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

    return (
        <div className="min-h-screen">
            <Page className="bg-grey">
                <div className="flex justify-between items-start mx-48 my-24 space-x-8">
                    
                    <div className="w-1/4">
                        {userType === 'contractor' && <p className="text-xl text-darkBlueText">Bem-vindo, contratante!</p>}
                        {userType === 'freelancer' && <p>Bem-vindo, freelancer!</p>}
                    </div>
                    
                    
                    <div className="flex-">
                        {userType === 'freelancer' && (
                            <>
                                <p className="text-darkBlueText text-3xl mb-4 text-center">Vagas que talvez te interessem</p>
                                <Dropdown onChange={setOrder} />
                                <JobCard job={exemplo} />
                                <JobCard job={exemplo} />
                                <JobCard job={exemplo} />
                                <JobCard job={exemplo} />
                            </>
                        )}
                        {userType === 'contractor' && (
                            <>
                                <p className="text-darkBlueText text-3xl mb-4 text-center">Freelancers disponíveis</p>
                                
                            </>
                        )}
                    </div>

                    <div className="w-1/4 flex flex-col items-center space-y-4">
                        {userType === 'freelancer' && (
                            <>
                                <button className="border border-lightBlueText text-darkBlueText py-6 w-72 px-10 rounded flex items-center justify-between">
                                    <HiOutlineBookmark className="mr-2 text-2xl text-lightBlueText" />
                                    <span className="flex-1 text-left ml-4">Vagas salvas</span>
                                    <MdKeyboardArrowRight className="ml-2 text-lightBlueText" />
                                </button>
                                <button className="border border-lightBlueText text-darkBlueText py-6 w-72 px-10 rounded flex items-center justify-between">
                                    <RiBrush4Line className="mr-2 text-2xl text-lightBlueText" />
                                    <span className="flex-1 text-left ml-4">Personalize seu perfil</span>
                                    <MdKeyboardArrowRight className="ml-2 text-lightBlueText" />
                                </button>
                                <button className="border border-lightBlueText text-darkBlueText py-6 w-72 px-10 rounded flex items-center justify-between">
                                    <VscPreview className="mr-2 text-2xl text-lightBlueText" />
                                    <span className="flex-1 text-left ml-4">Buscar vagas</span>
                                    <MdKeyboardArrowRight className="ml-2 text-lightBlueText" />
                                </button>
                                <button className="border border-lightBlueText text-darkBlueText py-6 w-72 px-10 rounded flex items-center justify-between">
                                    <SlEnvolopeLetter className="mr-2 text-2xl text-lightBlueText" />
                                    <span className="flex-1 text-left ml-4">Carta de apresentação</span>
                                    <MdKeyboardArrowRight className="ml-2 text-lightBlueText" />
                                </button>
                            </>
                        )}
                        {userType === 'contractor' && (
                            <>
                                <button className="border border-lightBlueText text-darkBlueText py-6 w-72 px-10 rounded flex items-center justify-between">
                                    <FaPlus className="mr-2 text-2xl text-lightBlueText" />
                                    <span className="flex-1 text-left ml-4">Publicar uma vaga</span>
                                    <MdKeyboardArrowRight className="ml-2 text-lightBlueText" />
                                </button>
                                <button className="border border-lightBlueText text-darkBlueText py-6 w-72 px-10 rounded flex items-center justify-between">
                                    <HiOutlineBookmark className="mr-2 text-2xl text-lightBlueText" />
                                    <span className="flex-1 text-left ml-4">Freelancers selecionados</span>
                                    <MdKeyboardArrowRight className="ml-2 text-lightBlueText" />
                                </button>
                                <button className="border border-lightBlueText text-darkBlueText py-6 w-72 px-10 rounded flex items-center justify-between">
                                    <RiUserSearchLine  className="mr-2 text-2xl text-lightBlueText" />
                                    <span className="flex-1 text-left ml-4">Buscar freelancers</span>
                                    <MdKeyboardArrowRight className="ml-2 text-lightBlueText" />
                                </button>
                                <button className="border border-lightBlueText text-darkBlueText py-6 w-72 px-10 rounded flex items-center justify-between">
                                    <BiCollection   className="mr-2 text-2xl text-lightBlueText" />
                                    <span className="flex-1 text-left ml-4">Suas vagas</span>
                                    <MdKeyboardArrowRight className="ml-2 text-lightBlueText" />
                                </button>
                                
                            </>
                        )}
                    </div>
                </div>
                <ScrollUp />
            </Page>
        </div>
    );
}
