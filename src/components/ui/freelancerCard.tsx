import { CiBookmark, CiShare2, CiWarning } from "react-icons/ci";
import Button from './button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
  } from "@/components/ui/dialog"

interface Freelancer {
    _id: string; 
    name: string;
    mainJob: string;
    skills: string[];
    experience: experienceProps[];
    state: string;
    academic: academicProps[];
}

interface experienceProps {
    name: string;
    start: string;
    termination: string;
    company: string;
    activities: string;
}

interface FreelancerCardProps {
    freelancer: Freelancer;  
}

interface academicProps {
    course: string;
    start: string;
    termination: string;
    college: string;
    education: string;
}

export function FreelancerCard({ freelancer }: FreelancerCardProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();

    

    const handleConfirm = () => {
        setIsDialogOpen(false);
        navigate(`/Chat/`);
    };

    const handleCancel = () => {
        setIsDialogOpen(false);
    };

    return (
        <div className="my-4">
            <div className="border border-lightBlueText rounded-md shadow-sm px-4 py-3 flex flex-col gap-3 w-full max-w-lg mx-auto"> 
                <div className="flex flex-col md:flex-row justify-between items-start">
                    <p className="text-lg font-semibold text-darkBlueText">{freelancer.name}</p>
                    <div className="flex gap-5 text-2xl text-gray-600 mt-2 md:mt-0">
                        <p className="cursor-pointer hover:text-lightBlueText hidden"><CiShare2 /></p>
                        <p className="cursor-pointer hover:text-mainBeige"><CiWarning /></p>
                        <p className="cursor-pointer hover:text-green-700 hidden"><CiBookmark /></p>
                    </div>
                </div>
                <p className="text-md text-blueText italic"><span className="font-semibold">{freelancer.mainJob}</span></p>
                <p className="text-sm text-gray-500 font-medium">Habilidades: <span className="text-darkBlueText">{freelancer.skills.join(', ')}</span></p>
                <p className="text-sm text-gray-500 font-medium">Experiências: <span className="text-darkBlueText">{
                    freelancer?.experience.length > 0 ? 
                    freelancer.experience.map((experience: experienceProps) => experience.name).join(', ') : 
                    <span>Não tem experiência</span>
                }</span></p>
                <p className="text-sm text-gray-500 font-medium">Escolaridade: <span className="text-darkBlueText">{
                    freelancer?.academic.length > 0 ? 
                    freelancer.academic.map((academic: academicProps) => academic.course).join(', ') : 
                    <span>não tem acadêmico</span>
                }</span></p>
                <p className="text-xs text-gray-500">Localização: {freelancer.state}</p>

                <div className="flex flex-col md:flex-row justify-between items-center mt-3">
                    <p 
                        className="text-sm cursor-pointer text-darkBlueText hover:text-mainBeige"
                        onClick={() => navigate(`/Profile/${freelancer._id}`)} 
                    >
                        Ver mais
                    </p>
                    <Dialog>
                    <DialogTrigger>
                    <Button 
                        variant="strongBlue" 
                        leftIcon={null} 
                        rightIcon={null} 
                        onClick={('')} 
                    >
                        Contratar
                    </Button>
                    </DialogTrigger>
                    
                    <DialogContent>
                        <div className="mx-6">
                    <DialogHeader>
                           <DialogTitle className="text-darkBlueText text-2xl mb-2">Contratar freelancer

                           </DialogTitle>
                           <p className="mt-2 text-md">Você será redirecionado para o chat para comunicação e negociação com o freelancer.</p>
                           <p className="mt-2 text-sm text-gray-700 italic">O Lune não se responsabiliza por negociações entre usuários. Fique atento a propostas falsas.</p>

                            </DialogHeader>
                            <div className="flex gap-3 ">
                                <Button variant="mediumSizeDark" onClick={handleConfirm} rightIcon={null} leftIcon={null}>Confirmar</Button>
                                <DialogClose>
                            <Button variant="mediumSizeLight" onClick={handleCancel} rightIcon={null} leftIcon={null}>Cancelar</Button>
                            </DialogClose>
                            
                            </div></div>
                    </DialogContent>
                    
                    </Dialog>
                </div>
            </div>

            
        </div>
    );
}
