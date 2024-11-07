import Page from "@/components/Page";
import img from "../assets/unnamed.png";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBackendApi } from "@/hooks/useBackendApi";
import Button from "@/components/ui/button";
import { AuthContext } from "@/contexts/AuthContext";
import { IoCheckmark } from "react-icons/io5";
import { ScrollUp } from "@/components/ui/scrollUp";
interface jobProps{
    title: string, 
    enterprise: string, 
    summary: string,
    salary: number, 
    skill: [],
    jobModel: string,
    location: string,
    startDate: string,
    endDate: string,
    degree: string,
    experience: number,
    isPrivate: boolean,
    candidates: []
}

interface contractorProps{
    bio: string
}


export function Job() {

    const [job, setJob] = useState<jobProps>()

    const [contrator, setContrator] = useState<contractorProps>()

    const auth = useContext(AuthContext)
    const {jobId} = useParams()
    const backendApi = useBackendApi()
    const [reload, setReload] = useState(false)

    function funcreload(){
        setReload(!reload)
    }

    useEffect(()=>{
        async function getJob(){
            if(jobId){
                const data = await backendApi.getPosition(jobId)
                if(data){
                    setJob(data.job)
                    setContrator(data.contractor)
                }
            }
        }
        getJob()
    }, [reload])

    async function addCandidate(){
        if(!jobId){
            return
        }
        await backendApi.addCandidate(jobId)
        funcreload()
    }

    return (

        <Page className="">

            <div className=" max-w-[800px] mx-auto justify-center  my-32 flex-col flex ">

                <div className=" w-full mx-auto flex justify-between">
                    <p className="text-3xl text-darkBlueText">{job?.title}</p>
                    {job?
                        job?.candidates.length > 0?
                        job.candidates.filter((candidate)=> candidate == auth.user?._id).length>0?
                            <p className="flex items-center gap-3"><IoCheckmark/>Já candidatado</p>
                        :   <Button leftIcon={null} rightIcon={null} onClick={()=>{addCandidate()}} variant="mediumSizeDark" >Candidatar-se</Button>
                        :<Button leftIcon={null} rightIcon={null} onClick={()=>{addCandidate()}} variant="mediumSizeDark" >Candidatar-se</Button>   
                    :null
                    }
                    
                </div>
                <div className="flex mt-2 mb-7">
                    <p className=" text-1xl bg-gray-400 rounded px-2 py-1 text-gray-700">{job?.jobModel}</p>
                </div>



                <div className="w-[650px] ">
                    <div className="text-[17px] text-justify text-darkBlueText h-[16] ">
                        <p>{job?.summary}</p>
                    </div>
                </div>


                <div className="w-[650px] flex ">
                    <div className="text-[17px]  text-blueText  my-5 ">
                        <p>Remuneração: <span className="text-darkBlueText">R$: {job?.salary}</span></p>
                        <p>Data de inicio: <span className="text-darkBlueText">{job?.startDate}</span></p>
                        <p>Data de término: <span className="text-darkBlueText">{job?.endDate}</span></p>
                        <p>Localização: <span className="text-darkBlueText">{job?.location  }</span></p>

                    </div>
                </div>

                <div className=" h-[150px] my-5 bg-whiteLight rounded ">

                    <p className="text-darkBlueText ml-[15px] my-[15px]"> Habilidades necessárias</p>

                    <div className="flex gap-5 flex-wrap ml-[15px] text-darkBlueText">
                        {job?
                        job.skill.map(skill =>{
                            return(
                                <p className="bg-white px-3 py-1 rounded hover:brightness-75 transition-all duration-200">{skill}</p>
                            )
                        })
                        :null
                        }
                        
                    </div>
                </div>

                <div className="pb-3 my-5 bg-whiteLight rounded ">
                    <p className="text-darkBlueText ml-[15px] my-[15px] ">Formação acadêmica necessária</p>
                    <div className=" mx-[17px] my-2 bg-white rounded ">
                        <p className="text-darkBlueText ml-[15px] py-2">{job?.degree}</p>
                    </div>
                </div>
                <div className="flex items-center flex-col">
                    <div className="relative mt-[20px] top-[58px]">
                        <p className="text-[25px] text-blueText text-center">Contratante</p>
                        <img className="h-52 w-52 rounded-full  border-2y" src={img} />
                    </div>
                    <div className="min-w-[520px] pb-5 bg-darkBlueText my-5 rounded-[35px] ">

                        <div className=" text-justify" >

                            <p className=" text-whiteLight pt-8 pb-[7px] pl-5 text-[22px]">Oscorp Inc.</p>

                            <p className="text-whiteLight text-[15px] pl-5 pr-5"> {contrator?.bio}</p>

                  

                            <div className=" flex justify-center">
                                <button className=" bg-mainBeige  text-white px-3 py-1 rounded hover:brightness-75 transition-all duration-200 ">Ver mais</button>
                            </div>
                        </div>
                    </div>
                    <ScrollUp />
                </div>
                
            </div>
        </Page>

    )
}