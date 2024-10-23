import Page from "@/components/Page"
import { BiSliderAlt } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import { CiWarning } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";

import { Dropdown } from '../components/ui/dropdown';
import { JobCard } from '../components/ui/jobCard';
import { ScrollUp } from '../components/ui/scrollUp';
import { useEffect, useState } from "react";
import { useBackendApi } from "@/hooks/useBackendApi";

interface jobPosition {
  title: string;
  enterprise: string;
  summary: string;
  skill: string[];
  location: string;
}

const exemplo = {
  title: "Desenvolvedor",
  company: "Oscorp Inc.",
  summary: "Precisamos de alguém que crie o design de um site, o fluxo do usuário e registre toda a documentação necessária.",
  skills: ["Photoshop", "Canva", "Figma"],
  differentials: ["UX/UI"],
  location: "São Paulo - SP - Brasil"
};

export function Positions() {
  const [order, setOrder] = useState('Mais relevante');
  const [position, setPosition] = useState<jobPosition[]>([])
  const backEndApi = useBackendApi()
  useEffect(()=>{
    async function positionFunc(){
        const data = await backEndApi.listPosition()
        if(data){
          setPosition(data.position)
        
        }
    }
    positionFunc()
  },[]) 


  return (


    <Page className=" flex justify-center">

      <div className=" flex  gap-12">
        <div className=" mt-20  flex flex-col gap-2 pt-10 ">
          <button className="border border-lightBlueText rounded-md shadow-sm py-2 px-3">Tecnologia</button>
          <button className="border border-lightBlueText rounded-md shadow-sm py-2 px-3">Panfletagem</button>
          <button className="border border-lightBlueText rounded-md shadow-sm py-2 px-3">Limpeza doméstica</button>
          <button className="border border-lightBlueText rounded-md shadow-sm py-2 px-3">Tecnologia</button>
          <button className="border border-lightBlueText rounded-md shadow-sm py-2 px-3">Outros</button>


        </div>

        <div className=" flex flex-col gap-2 ">
          <p className="mt-20 text-lg text-darkBlueText">Buscar vagas de:</p>
          <div className="flex items-center gap-2">
            <input type="text" placeholder=" Desenvolvedor" className="border border-lightBlueText rounded-md  p-1" />
            <p className="text-2xl text-darkBlueText"><BiSliderAlt /></p>
          </div>
          <div className="flex items-center ">
            <Dropdown onChange={setOrder} />
            <p className=" ml-[15.5rem] text-xs" > <CiBookmark /> </p>
            <p className="text-xs">Vagas Salvas</p>
          </div>

 

        {
          position.map(position => {
            return (
              <JobCard title = {position.title} 
              enterprise = {position.enterprise}
              summary= { position.summary}
              skill = { position.skill} location=  {position.location}/>
            )
          })
        }

         
          
        </div>

      </div>

    <ScrollUp/>
    </Page>

  )
}