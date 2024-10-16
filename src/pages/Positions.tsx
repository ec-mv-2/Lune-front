import Page from "@/components/Page"
import { BiSliderAlt } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import { CiWarning } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
export function Positions (){
    
    return (


        <Page className=" flex justify-center">

      <div className=" flex items-center gap-12">
      <div className=" mt-20  flex flex-col gap-2  text-xs">
        <button className="bg-blue-950 text-white rounded-2xl py-2 px-3">Tecnologia</button>
        <button className="border-blue-700 border-[1px] text-blue-500 rounded-2xl py-2 px-3">Panfletagem</button>
        <button className="border-blue-700 border-[1px] text-blue-500 rounded-2xl py-2 px-3">Limpeza doméstica</button>
        <button className="border-blue-700 border-[1px] text-blue-500 rounded-2xl py-2 px-3">Tecnologia</button>
        <button className="border-blue-700 border-[1px] text-blue-500 rounded-2xl py-2 px-3">Outros</button>
        
        
        </div>

        <div className=" flex flex-col gap-2">
            <p className="mt-20 ">Buscar vagas de:</p>
            <div className="flex items-center gap-2">
            <input type="text" placeholder=" Desenvolvedor" className="border-[1px]  border-black rounded-md  " />
            <p className="text-2xl"><BiSliderAlt /></p>
            </div>
            <div className="flex items-center ">    <p className="text-xs">Ordernar por: Mais relevante</p>
            <p className=" ml-[15.5rem] text-xs" > <CiBookmark /> </p>
            <p className="text-xs">Vagas Salvas</p>
            </div>
        

        
            <div className="pl-3 border-black border-[1px] rounded-xl  flex flex-col gap-[0.30rem] py-1">
                <div className="flex justify-between">
                <p className="text-sm text-blue-950">Desenvolvedor</p>
                <div className="flex gap-2 mr-4">
                <p><CiShare2 /></p>
                <p><CiWarning /></p>
                <p><CiBookmark /></p>
                </div>
                </div>
                <p className="text-[0.5rem]">Empresa Oscorp Inc.</p>
                <p className="text-[0.75rem] w-[25rem] text-blue-600">Resumo: Precisamos de alguém que crie o design de um site, o
                fluxo do usuário e registre toda a documentação necessária</p>
                <p className="text-[0.75rem] text-blue-600">Habilidades necessárias: Photoshop, Canva, Figma</p>
                <p className="text-[0.75rem] text-blue-600">Diferenciais: UX/UI</p>
                <div className="flex  justify-between "> 
                <p className="text-[0.5rem]">Localização: São Paulo - SP - Brasil</p>
                <div className=" flex flex-col gap-2 mt-[-2.8rem] mr-[0.7rem] text-right">
                <p className="text-sm pr-2">Ver mais</p>
                <button className="bg-blue-950 text-white rounded-2xl py-2 px-3 text-[0.8rem] ">Se candidatar</button>
                </div>
                </div>
                
            </div>

        </div>

      </div>
      
     
    </Page>

    )
}