import { CiBookmark, CiShare2, CiWarning } from "react-icons/ci";
import Button from './button';

interface Freelancer {
    name: string;
    mainJob: string;
    skills: string[];
    experience: string[];
    location: string;
    education: string[];
}

interface FreelancerCardProps {
    freelancer: Freelancer;  
}

export function FreelancerCard({ freelancer }: FreelancerCardProps) {
    return (
        <div className="my-4 ">
            <div className="border border-lightBlueText rounded-md shadow-sm px-4 py-3 flex flex-col gap-3 w-full max-w-lg mx-auto"> 
                <div className="flex flex-col md:flex-row justify-between items-start">
                    <p className="text-lg font-semibold text-darkBlueText">{freelancer.name}</p>
                    <div className="flex gap-5 text-2xl text-gray-600 mt-2 md:mt-0">
                        <p className="cursor-pointer hover:text-lightBlueText"><CiShare2 /></p>
                        <p className="cursor-pointer hover:text-mainBeige"><CiWarning /></p>
                        <p className="cursor-pointer hover:text-green-700"><CiBookmark /></p>
                    </div>
                </div>
                <p className="text-md text-blueText italic"><span className="font-semibold">{freelancer.mainJob}</span></p>
                <p className="text-sm text-gray-500 font-medium">Habilidades: <span className="text-darkBlueText">{freelancer.skills.join(', ')}</span></p>
                <p className="text-sm text-gray-500 font-medium">Experiências: <span className="text-darkBlueText">{freelancer.experience.join(', ')}</span></p>
                <p className="text-sm text-gray-500 font-medium">Escolaridade: <span className="text-darkBlueText">{freelancer.education.join(', ')}</span></p>
                <p className="text-xs text-gray-500">Localização: {freelancer.location}</p>

                <div className="flex flex-col md:flex-row justify-between items-center mt-3">
                    <p className="text-sm cursor-pointer text-darkBlueText hover:text-mainBeige">Ver mais</p>
                    <Button variant="strongBlue" leftIcon={null} rightIcon={null} onClick={() => console.log('Contratar Freelancer')}>
                        Contratar
                    </Button>
                </div>
            </div>
        </div>
    );
}
