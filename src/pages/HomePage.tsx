import Page from "@/components/Page";
import { Dropdown } from '../components/ui/dropdown';
import { JobCard } from '../components/ui/jobCard';
import { ScrollUp } from '../components/ui/scrollUp';
import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiBrush4Line } from "react-icons/ri";
import { VscPreview } from "react-icons/vsc";
import { SlEnvolopeLetter } from "react-icons/sl";
import { HiOutlineBookmark } from "react-icons/hi2";

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

    return (
        <div className="min-h-screen">
            <Page className="bg-grey">
                <div className="flex justify-between items-start my-24 mx-48">
                    <div className="flex flex-col ">
                        <p className="text-darkBlueText text-3xl text-center mb-4">Vagas que talvez te interessem</p>
                        <Dropdown onChange={setOrder} />
                        <JobCard job={exemplo} />
                        <JobCard job={exemplo} />
                        <JobCard job={exemplo} />
                        <JobCard job={exemplo} />
                    </div>

                    <div className="flex flex-col items-center my-6">
                        <button className="border border-lightBlueText text-darkBlueText py-6 w-72 px-10 rounded m-2 flex items-center justify-between">
                            <HiOutlineBookmark className="mr-2 text-2xl text-lightBlueText" />
                            <span className="flex-1 text-left ml-4">Vagas salvas</span>
                            <MdKeyboardArrowRight className="ml-2 text-lightBlueText" />
                        </button>
                        <button className="border border-lightBlueText text-darkBlueText py-6 w-72 px-10 rounded m-2 flex items-center justify-between">
                            <RiBrush4Line className="mr-2 text-2xl text-lightBlueText" />
                            <span className="flex-1 text-left ml-4">Personalize seu perfil</span>
                            <MdKeyboardArrowRight className="ml-2 text-lightBlueText" />
                        </button>
                        <button className="border border-lightBlueText text-darkBlueText py-6 w-72 px-10 rounded m-2 flex items-center justify-between">
                            <VscPreview className="mr-2 text-2xl text-lightBlueText" />
                            <span className="flex-1 text-left ml-4">Buscar vagas</span>
                            <MdKeyboardArrowRight className="ml-2 text-lightBlueText" />
                        </button>
                        <button className="border border-lightBlueText text-darkBlueText py-6 w-72 px-10 rounded m-2 flex items-center justify-between">
                            <SlEnvolopeLetter className="mr-2 text-2xl text-lightBlueText" />
                            <span className="flex-1 text-left ml-4">Carta de apresentação</span>
                            <MdKeyboardArrowRight className="ml-2 text-lightBlueText" />
                        </button>
                    </div>
                </div>
                <ScrollUp />
            </Page>
        </div>
    );
}
