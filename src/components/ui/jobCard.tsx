import { CiBookmark, CiShare2, CiWarning } from "react-icons/ci";
import Button from './button'; 

interface Job {
    title: string;
    enterprise: string;
    summary: string;
    skill: string[];
    location: string;
}

interface JobCardProps {
    job: Job;
}

export function JobCard({ job }: JobCardProps) {  
    const { title, enterprise, summary, skill, location } = job; 

    return (
        <div className="my-4">
            <div className="border border-lightBlueText rounded-md shadow-sm px-4 py-3 flex flex-col gap-3 w-full max-w-lg ">
                <div className="flex flex-col md:flex-row justify-between items-start">
                    <p className="text-lg font-semibold text-darkBlueText">{title}</p>
                    <div className="flex gap-5 text-2xl text-gray-600 mt-2 md:mt-0">
                        <p className="cursor-pointer hover:text-lightBlueText"><CiShare2 /></p>
                        <p className="cursor-pointer hover:text-mainBeige"><CiWarning /></p>
                        <p className="cursor-pointer hover:text-green-700"><CiBookmark /></p>
                    </div>
                </div>
                <p className="text-md text-gray-500 italic">Empresa: <span className="font-semibold text-blueText ">{enterprise}</span></p>
                <p className="text-sm w-full text-gray-500 font-medium">Resumo: <span className="text-darkBlueText">{summary}</span></p>
                <p className="text-sm text-gray-500 font-medium">Habilidades necessárias: <span className="text-darkBlueText">{skill}</span></p>
                <p className="text-xs text-gray-500">Localização: {location}</p>
                
                <div className="flex flex-col md:flex-row justify-between items-center mt-3">
                    <p className="text-sm cursor-pointer text-darkBlueText hover:text-mainBeige">Ver mais</p>
                    <Button variant="strongBlue" 
                    leftIcon={null}
                    rightIcon={null}
                    onClick={() => console.log('Contratar Freelancer')}>
                        Se candidatar
                    </Button>
                </div>
            </div>
        </div>
    );
}
