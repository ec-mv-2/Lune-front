import { CiBookmark, CiEdit, CiShare2, CiTrash, CiWarning } from "react-icons/ci";
import Button from './button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogHeader } from "./dialog"; 
import { Input } from "./Input";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useBackendApi } from "@/hooks/useBackendApi";
import { useNavigate } from "react-router-dom";
import { useCepApi } from "@/hooks/useCepApi";

interface Job {
  _id: string;
  title: string;
  enterprise: string;
  summary: string;
  skill: string;
  location: string;
}

interface JobCardProps {
  job: Job;
  isContractor: boolean; 
}

export function JobCard({ job}: JobCardProps) {
  const { _id, title, enterprise, summary, skill, location } = job;
  
  const backendApi = useBackendApi()
  const cepApi = useCepApi();



  const [remuneracao, setRemuneracao] = useState("");
  const [skills, setSkills] = useState('');
  const [workModel, setWorkModel] = useState('distancia');
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [education, setEducation] = useState('Ensino médio');
  const [experience, setExperience] = useState(Number);
  const [isPrivate, setIsPrivate] = useState(false);
  const [locationS, setLocation] = useState('')
  const [summaryS, setSummary] = useState('')
  const [énterprise, setEnterprise] = useState('')
  const [titleS, setTitle] = useState('')
  const [cep, setCep] = useState("");
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const [step, setStep] = useState(1);

      const auth = useContext(AuthContext)

      const editJobPosition = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const editPosition = {

      
        title: titleS,
        enterprise: auth.user?.name as string || "Nome da Empresa", 
        summary: summaryS,
        salary: parseFloat(remuneracao.replace(/[^\d.-]+/g, "")), 
        skill: skills,
        jobModel: workModel,
        location,
        startDate: startDate || "", 
        endDate: endDate || "", 
        degree: education,
        experience,
        isPrivate,

        }

        console.log("Nova posição sendo enviada:", editPosition, _id);
    
        try {
            const response = await backendApi.editPosition(
                _id,
                editPosition.title,
                editPosition.enterprise,
                editPosition.summary,
                editPosition.salary,
                editPosition.skill,
                editPosition.jobModel,
                editPosition.location,
                editPosition.startDate,
                editPosition.endDate,
                editPosition.degree,
                editPosition.experience,
                editPosition.isPrivate
            );
            
            // setPositions([...positions, response.position]);
            console.log('Vaga criada com sucesso:', response.position);
            setOpenDialogEdit(false);
        } catch (error) {
            console.error('Erro ao editar vaga', error);
        }

    };

    function getAddress(cep: string) {
      if (cep.length === 8) {
          const data = cepApi.getAddress(cep);
          if (data) {
              data.then(
                  function (value) {
                      setLocation(value.address);
                      setCep(cep);
                  },
                  function (error) {
                      console.log(error);
                  }
              );
          }
      }
  }
    

  const formatCurrency = (value: any) => {
    const numericValue = value.replace(/[^\d]/g, "");
    const formattedValue = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(numericValue / 100);
    return formattedValue;
};

      
  return (
    <div className="my-4">
      <div className="border border-lightBlueText rounded-md shadow-sm px-4 py-3 flex flex-col gap-3 w-full max-w-lg">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <p className="text-lg font-semibold text-darkBlueText">{title}</p>
          <div className="flex gap-5 text-2xl text-gray-600 mt-2 md:mt-0">
            <p className="cursor-pointer hover:text-lightBlueText"><CiShare2 /></p>
     

            
          </div>
        </div>
        <p className="text-md text-gray-500 italic">Empresa: <span className="font-semibold text-blueText">{enterprise}</span></p>
        <p className="text-sm w-full text-gray-500 font-medium">Resumo: <span className="text-darkBlueText">{summary}</span></p>
        <p className="text-sm text-gray-500 font-medium">Habilidades necessárias: <span className="text-darkBlueText">{skill}</span></p>
        <p className="text-xs text-gray-500">Localização: {location}</p>

        <div className="flex flex-col md:flex-row justify-between items-center mt-3 ">
          {auth.user?.isContractor ? (
            <div className="flex space-x-10 ">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="mediumSizeLight" leftIcon={null} rightIcon={null}  onClick={() => {
                        console.log('Botão Editar clicado');
                    }}>
                    Editar Vaga
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-whiteLight  py-10 px-8">
                                        <DialogHeader>
                                            <DialogTitle className="text-darkBlueText text-2xl">Editar vaga</DialogTitle>
                                            <p className="text-gray-500">Encontre o freelancer ideal para o seu serviço.</p>
                                        </DialogHeader>

                                        {step === 1 && (
                                            <form className="flex flex-col gap-3 text-darkBlueText" >
                                                <div className="">
                                                <Input title="Novo título da vaga" defaultValue={title} onChange={(e) => setTitle(e.target.value)} className="" required />
                                                
                                                    <p className="text-darkBlueText max-w-36 relative top-2 left-3 px-2 bg-whiteLight text-md">Descrição da vaga</p>

                                                    <textarea className="w-full py-2 min-h-24 rounded-md border-[1px] border-blueText bg-whiteLight focus:outline-none px-3 focus:border-lightBlueText transition-all duration-200"
                                                    defaultValue={summary}
                                                    onChange={(e) => setSummary(e.target.value)}
                                                    required />

                                                    {/* <Input title="Habilidades desejadas" className="" 
                                                    value={skills}
                                                    // onChange={(e) => setSkills(e.target.value.split(','))}
                                                    placeholder="Habilidades desejadas para a vaga (separadas por vírgulas)"
                                                    required
                                                    /> */}

                                                    <div className="mb-5">
                                                    <p className="text-darkBlueText max-w-28 relative top-2 left-3 px-2 bg-whiteLight text-md"> Escolaridade </p>
                                                    <select className="w-full rounded-md border-[1px] border-blueText bg-whiteLight focus:outline-none focus:border-lightBlueText px-3 py-4 m"
                                                    defaultValue={education}
                                                    onChange={(e) => setEducation(e.target.value)}
                                                    >
                                                        <option value="ensinomedio">Ensino médio</option>
                                                        <option value="superiorcursando">Ensino superior (cursando)</option>
                                                        <option value="superiorcompleto">Ensino superior (completo)</option>
                                                        <option value="bachareladocursando">Bacharelado (cursando)</option>
                                                        <option value="bachareladocompleto">Bacharelado (completo)</option>
                                                        <option value="nulo">Sem preferência de escolaridade</option>
                                                        
                                                    </select>

                                                    <Input title="Experiência desejada" defaultValue={experience} type="text"  onChange={(e) => setExperience(Number(e.target.value))}/>

                                                </div>
                                                </div>
                                                <div className="flex">
                                                <Button 
                                                    variant="strongBlue" 
                                                    leftIcon={null} 
                                                    rightIcon={null}                                             
                                                    onClick={(e: { preventDefault: () => void; }) => {
                                                        e.preventDefault(); 
                                                        setStep(2);
                                                    }}
                                                >
                                                    Continuar
                                                </Button>
                                                </div>
                                            </form>
                                        )}

                                        {step === 2 && (
                                            <form className="flex flex-col gap-3 text-darkBlueText" onSubmit={editJobPosition}>
                                                <div className="m-">
                                                <p className="text-lightBlueText text-sm hover:text-mainBeige"
                                                onClick={() => {
                                                setStep(1); 
                                                    }}>
                                                        Voltar</p>

                                                <Input
                                                    title="Remuneração"
                                                    type="text"
                                                    defaultValue={remuneracao}
                                                    onChange={(e) => setRemuneracao(formatCurrency(e.target.value))}
                                                
                                                required
                                                />

                                                <Input title="Início de contrato" className="" type="date" defaultValue={startDate} onChange={(e) => setStartDate(e.target.value)} />

                                                <Input title="Fim de contrato" defaultValue={endDate}
                                                 onChange={(e) => setEndDate(e.target.value)} type="date"/>

                                                <div className="mb-5">
                                                    <p className="text-darkBlueText max-w-40 relative top-2 left-3 px-2 bg-whiteLight text-md">Modelo de trabalho</p>
                                                    <select className="w-full rounded-md border-[1px] border-blueText bg-whiteLight focus:outline-none focus:border-lightBlueText px-3 py-4 m"
                                                    defaultValue={workModel}
                                                    onChange={(e) => setWorkModel(e.target.value)}
                                                    >
                                                        <option value="distancia">À distância</option>
                                                        <option value="presencial">Presencial</option>
                                                    </select>
                                                    {workModel === 'presencial' && (
                                                        <div>
                                                        <Input title="CEP" onChange={(e)=>getAddress(e.target.value)}/>
                                                  <Input readOnly title="Estado" defaultValue={location} onChange={(e)=>setLocation(e.target.value)}/>
                                                        </div>
                                                    )}

                                                  <div className="flex align-middle justify-end mt-5">
                                                    
                                                    <div className="flex items-center space-x-2">
                                                    <label htmlFor="isPrivate" className="text-gray-700">Vaga privada</label>
                                                    <input
                                                        id="isPrivate"
                                                        type="checkbox"
                                                        checked={isPrivate}
                                                        onChange={(e) => setIsPrivate(e.target.checked)}
                                                    />
                                                </div>

                                                    </div> 
                                                </div>

                                                </div>


                                                <div className="flex">
                                                    
                                                <Button  variant="strongBlue" leftIcon={null} rightIcon={null} type="submit" onClick={() => console.log('Vaga publicada')}  >
                                                    Editar vaga
                                                </Button>
                                                </div>
                                               
                                                
                                            </form>
                                        )}
                                    </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="mediumSizeDark" leftIcon={null} rightIcon={null}  onClick={() => {
                    console.log('Botão Editar clicado');
                }}>
                    Deletar Vaga
                  </Button>
                </DialogTrigger>
                <DialogContent >
                  <DialogTitle>Confirmar Deleção</DialogTitle>
                  <DialogDescription>
                    Tem certeza de que deseja deletar a vaga?
                  </DialogDescription>
                  <div className="flex justify-end mt-4 space-x-10">
                    <DialogClose asChild>
                      <Button variant="mediumSizeLight" leftIcon={null} rightIcon={null}  onClick={() => console.log('Cancelar')}>Cancelar</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button variant="mediumSizeDark" leftIcon={null} rightIcon={null}  onClick={() => console.log('Vaga deletada')}>Deletar</Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <Button variant="strongBlue" onClick={() => console.log('Contratar Freelancer')}>
              Se candidatar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
