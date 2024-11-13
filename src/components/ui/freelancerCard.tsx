import { CiBookmark, CiEdit, CiShare2, CiTrash, CiWarning } from "react-icons/ci";
import Button from './button';
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

interface Freelancer {
    name: string;
    mainJob: string;
    skills: string[];
    experience: [];
    state: string;
    academic: [];
}

interface experienceProps{
    name: string,
    start: string,
    termination: string,
    company: string,
    activities: string
}

interface FreelancerCardProps {
    freelancer: Freelancer;  
}

interface academicProps{
    course: string,
    start: string,
    termination: string,
    college: string,
    education: string
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
                <p className="text-sm text-gray-500 font-medium">Experiências: <span className="text-darkBlueText">{ 
                
            
                freelancer?.experience.length>0?
                freelancer?.experience.map((experience: experienceProps) =>{ return (experience.name)} ) : <p>Não tem experiência</p>

                
                }
                
                
                </span></p>
                <p className="text-sm text-gray-500 font-medium">Escolaridade: <span className="text-darkBlueText">{
                
                freelancer?.academic.length>0?
                                
                                
                                
                                freelancer?.academic.map((academic: academicProps) =>{
                                    return(academic.course) 
                                
                                
                                
                                }) : <p>não tem academico</p>
                                
                            }
                                </span></p>
                <p className="text-xs text-gray-500">Localização: {freelancer.state}</p>

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
