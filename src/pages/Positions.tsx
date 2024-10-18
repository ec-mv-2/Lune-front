import Page from "@/components/Page"
import { BiSliderAlt } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import { CiWarning } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";

import { Dropdown } from '../components/ui/dropdown';
import { JobCard } from '../components/ui/jobCard';
import { ScrollUp } from '../components/ui/scrollUp';
import { useState } from "react";

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
  return (


    <Page className=" flex justify-center">

      <div className=" flex items-center gap-12">
        <div className=" mt-20  flex flex-col gap-2  ">
          <button className="bg-darkBlueText text-whiteLight rounded-2xl py-2 px-3">Tecnologia</button>
          <button className="border-darkBlueText border-[1px] text-darkBlueText rounded-2xl py-2 px-3">Panfletagem</button>
          <button className="border-darkBlueText border-[1px] text-darkBlueText rounded-2xl py-2 px-3">Limpeza doméstica</button>
          <button className="border-darkBlueText border-[1px] text-darkBlueText rounded-2xl py-2 px-3">Tecnologia</button>
          <button className="border-darkBlueText border-[1px] text-darkBlueText rounded-2xl py-2 px-3">Outros</button>


        </div>

        <div className=" flex flex-col gap-2">
          <p className="mt-20 text-lg text-darkBlueText">Buscar vagas de:</p>
          <div className="flex items-center gap-2">
            <input type="text" placeholder=" Desenvolvedor" className="border  border-darkBlueText rounded-md  p-1" />
            <p className="text-2xl text-darkBlueText"><BiSliderAlt /></p>
          </div>
          <div className="flex items-center ">
            <Dropdown onChange={setOrder} />
            <p className=" ml-[15.5rem] text-xs" > <CiBookmark /> </p>
            <p className="text-xs">Vagas Salvas</p>
          </div>



          <div className="pl-3 border-darkBlueText border-[1px] rounded-xl  flex flex-col gap-[0.30rem] py-1">
            <div className="flex justify-between">
              <p className="text-sm text-darbg-darkBlueText">Desenvolvedor</p>
              <div className="flex gap-2 mr-4">
                <p><CiShare2 /></p>
                <p><CiWarning /></p>
                <p><CiBookmark /></p>
              </div>
            </div>
            <p className="text-[0.7rem]">Empresa Oscorp Inc.</p>
            <p className="text-[0.75rem] w-[25rem] text-darkBlueText">Resumo: Precisamos de alguém que crie o design de um site, o
              fluxo do usuário e registre toda a documentação necessária</p>
            <p className="text-[0.75rem] text-darkBlueText">Habilidades necessárias: Photoshop, Canva, Figma</p>
            <p className="text-[0.75rem] text-darkBlueText">Diferenciais: UX/UI</p>
            <div className="flex  justify-between ">
              <p className="text-[0.5rem]">Localização: São Paulo - SP - Brasil</p>
              <div className=" flex flex-col gap-2 mt-[-2.8rem] mr-[0.7rem] text-right">
                <p className="text-sm pr-2">Ver mais</p>
                <button className="bg-darkBlueText text-whiteLight rounded-2xl py-2 px-3 text-[0.8rem] ">Se candidatar</button>
        {/*vou deixar aqui a sua parte pra caso vc ainda queira usar, mas tb criei o componente, ve ai dps, se for usar o componente tem que arrumar o menuzinho da esquerda pq ele ta fixado no meio*/}
              </div>

            </div>

          </div>
          <JobCard job={exemplo} />
          <JobCard job={exemplo} />
          
        </div>

      </div>

    <ScrollUp/>
    </Page>

  )
}