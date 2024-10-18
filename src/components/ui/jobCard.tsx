import { CiBookmark, CiShare2, CiWarning } from "react-icons/ci";

interface Job {
    title: string;
    company: string;
    summary: string;
    skills: string[];
    differentials: string[];
    location: string;
}

interface JobCardProps {
    job: Job;
}

export function JobCard({ job }: JobCardProps) {
    return (
        <div className="my-2">
            <div className="border border-lightBlueText rounded-md shadow-sm px-4 py-3 flex flex-col gap-3 w-[550px]">
                <div className="flex justify-between">
                    <p className="text-lg font-semibold text-darkBlueText">{job.title}</p>
                    <div className="flex gap-5 text-2xl text-gray-600">
                        <p className="cursor-pointer hover:text-lightBlueText"><CiShare2 /></p>
                        <p className="cursor-pointer hover:text-mainBeige"><CiWarning /></p>
                        <p className="cursor-pointer hover:text-green-700"><CiBookmark /></p>
                    </div>
                </div>
                <p className="text-sm text-blueText italic">Empresa: <span className="font-semibold">{job.company}</span></p>
                <p className="text-sm w-full text-darkBlueText">
                    Resumo: {job.summary}
                </p>
                <p className="text-sm text-darkBlueText font-medium">Habilidades necessárias: {job.skills.join(', ')}</p>
                <p className="text-sm text-darkBlueText font-medium">Diferenciais: {job.differentials.join(', ')}</p>
                <p className="text-xs text-gray-500">Localização: {job.location}</p>

                <div className="flex justify-between items-center mt-3">
                    <p className="text-sm cursor-pointer text-darkBlueText hover:text-mainBeige">Ver mais</p>
                    <button className="bg-darkBlueText text-white rounded-lg py-2 px-4 text-sm hover:opacity-90">
                        Se candidatar
                    </button>
                </div>
            </div>
        </div>
    );
}
