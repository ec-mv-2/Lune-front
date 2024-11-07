import Page from "@/components/Page";
import { BiSliderAlt } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useBackendApi } from "@/hooks/useBackendApi";
import { Dropdown } from '../components/ui/dropdown';
import { JobCard } from '../components/ui/jobCard';
import { ScrollUp } from '../components/ui/scrollUp';

interface jobPosition {
  _id: string;
  title: string;
  enterprise: string;
  summary: string;
  skill: string;
  location: string;
}

export function Positions() {
  const [reload, setReload] = useState(false)
  const [order, setOrder] = useState('Mais relevante');
  const [positions, setPositions] = useState<jobPosition[]>([]);
  const backEndApi = useBackendApi();

  useEffect(() => {
    async function fetchPositions() {
      const data = await backEndApi.listPosition();
      console.log(data);
      if (data) {
        setPositions(data.position);
      }
    }

    fetchPositions();
  }, [reload]);


  function funcreload(){
    setReload(!reload)
}

/*  useEffect(() => {
    async function fetchPositions() {
      const data = await backEndApi.listPosition();
      
      console.log("Dados da API:", data);
  
      if (data && data.position) {
        setPositions(data.position);
      }
    }
  
    fetchPositions();
  }, []);
*/
  
  return (
    <Page className="flex justify-center">
      <div className="flex gap-12">
        <div className="mt-20 flex flex-col gap-2 pt-10 ">
          <button className="border border-lightBlueText rounded-md shadow-sm py-2 px-3">Tecnologia</button>
          <button className="border border-lightBlueText rounded-md shadow-sm py-2 px-3">Panfletagem</button>
          <button className="border border-lightBlueText rounded-md shadow-sm py-2 px-3">Limpeza doméstica</button>
          <button className="border border-lightBlueText rounded-md shadow-sm py-2 px-3">Outros</button>
        </div>

        <div className="flex flex-col gap-2 ">
          <p className="mt-20 text-lg text-darkBlueText">Buscar vagas de:</p>
          <div className="flex items-center gap-2">
            <input type="text" placeholder="Desenvolvedor" className="border border-lightBlueText rounded-md p-1" />
            <p className="text-2xl text-darkBlueText"><BiSliderAlt /></p>
          </div>
          <div className="flex items-center ">
            <Dropdown onChange={setOrder} />
            <p className="ml-[15.5rem] text-xs"><CiBookmark /></p>
            <p className="text-xs">Vagas Salvas</p>
          </div>

          {positions.map((position, index) => (
            <JobCard key={index} job={position} isContractor={false}/>
          ))}

        </div>
      </div>
      <ScrollUp />
    </Page>
  );
}
