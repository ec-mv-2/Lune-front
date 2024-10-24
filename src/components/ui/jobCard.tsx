import { CiBookmark, CiShare2, CiWarning } from "react-icons/ci";
import Button from './button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogHeader } from "./dialog"; 
import { Input } from "./Input";
import { useState } from "react";

interface Job {
  title: string;
  enterprise: string;
  summary: string;
  skill: string[];
  location: string;
}

interface JobCardProps {
  job: Job;
  isContractor: boolean; 
}

export function JobCard({ job, isContractor }: JobCardProps) {
  const { title, enterprise, summary, skill, location } = job;
  
  // Mova useState para dentro do JobCard
  const [step, setStep] = useState(1);
  const [workModel, setWorkModel] = useState('distancia');

  return (
    <div className="my-4">
      <div className="border border-lightBlueText rounded-md shadow-sm px-4 py-3 flex flex-col gap-3 w-full max-w-lg">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <p className="text-lg font-semibold text-darkBlueText">{title}</p>
          <div className="flex gap-5 text-2xl text-gray-600 mt-2 md:mt-0">
            <p className="cursor-pointer hover:text-lightBlueText"><CiShare2 /></p>
            {!isContractor && (
              <>
                <p className="cursor-pointer hover:text-mainBeige"><CiWarning /></p>
                <p className="cursor-pointer hover:text-green-700"><CiBookmark /></p>
              </>
            )}
          </div>
        </div>
        <p className="text-md text-gray-500 italic">Empresa: <span className="font-semibold text-blueText">{enterprise}</span></p>
        <p className="text-sm w-full text-gray-500 font-medium">Resumo: <span className="text-darkBlueText">{summary}</span></p>
        <p className="text-sm text-gray-500 font-medium">Habilidades necessárias: <span className="text-darkBlueText">{skill.join(', ')}</span></p>
        <p className="text-xs text-gray-500">Localização: {location}</p>

        <div className="flex flex-col md:flex-row justify-between items-center mt-3 ">
          {isContractor ? (
            <div className="flex space-x-10 ">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="mediumSizeLight" leftIcon={null} rightIcon={null}  onClick={() => {
                        console.log('Botão Editar clicado');
                    }}>
                    Editar Vaga
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-whiteLight py-10 px-8">
                  <DialogHeader>
                    <DialogTitle className="text-darkBlueText text-2xl">Editar uma vaga</DialogTitle>
                    <p className="text-gray-500">Atualize as informações referentes à vaga publicada.</p>
                  </DialogHeader>

                  {step === 1 && (
                    <form className="flex flex-col gap-3 text-darkBlueText"><div>
                      <Input title="Título da vaga" required />
                      <p className="text-darkBlueText max-w-36 relative top-2  left-3 px-2 bg-whiteLight text-md">Descrição da vaga</p>
                      <textarea
                        className="w-full py-2 min-h-24 rounded-md border-[1px] border-blueText bg-whiteLight focus:outline-none px-3 focus:border-lightBlueText transition-all duration-200"
                        required
                      /></div>
                      <Input title="Habilidades desejadas" placeholder="Habilidades desejadas para a vaga (separadas por vírgulas)" required />
                      <div className="mb-5">
                        <p className="text-darkBlueText max-w-28 relative top-2 left-3 px-2 bg-whiteLight text-md">Escolaridade</p>
                        <select className="w-full rounded-md border-[1px] border-blueText bg-whiteLight focus:outline-none focus:border-lightBlueText px-3 py-4">
                          <option value="ensinomedio">Ensino médio</option>
                          <option value="superiorcursando">Ensino superior (cursando)</option>
                          <option value="superiorcompleto">Ensino superior (completo)</option>
                          <option value="bachareladocursando">Bacharelado (cursando)</option>
                          <option value="bachareladocompleto">Bacharelado (completo)</option>
                          <option value="nulo">Sem preferência de escolaridade</option>
                        </select>
                        <Input title="Experiência desejada" type="text" />
                      </div>
                      <div className="flex">
                        <Button 
                          variant="mediumSizeLight" 
                          leftIcon={null} rightIcon={null} 
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
                    <form className="flex flex-col gap-3 text-darkBlueText">
                      <div>
                        <p className="text-lightBlueText text-sm hover:text-mainBeige" onClick={() => setStep(1)}>
                          Voltar
                        </p>
                        <Input title="Remuneração" type="text" required />
                        <Input title="Início de contrato" type="date" />
                        <Input title="Fim de contrato" type="date" />
                        <div className="mb-5">
                          <p className="text-darkBlueText max-w-40 relative top-2 left-3 px-2 bg-whiteLight text-md">Modelo de trabalho</p>
                          <select 
                            className="w-full rounded-md border-[1px] border-blueText bg-whiteLight focus:outline-none focus:border-lightBlueText px-3 py-4"
                            value={workModel}
                            onChange={(e) => setWorkModel(e.target.value)}
                          >
                            <option value="distancia">À distância</option>
                            <option value="presencial">Presencial</option>
                          </select>
                          {workModel === 'presencial' && (
                            <div>
                              <Input title="CEP" />
                              <Input readOnly title="Estado" />
                            </div>
                          )}
                          <div className="flex align-middle justify-end mt-5">
                            <div className="flex items-center space-x-2">
                              <label htmlFor="isPrivate" className="text-gray-700">Vaga privada</label>
                              <input id="isPrivate" type="checkbox" />
                              
                            </div>
                            
                          </div> 
                         
                        </div>
                      </div>
                    </form>
                    
                  )}

                    <DialogClose asChild>
                           
                            <Button variant="mediumSizeDark" leftIcon={null} rightIcon={null}  onClick={() => console.log('')}>Editar dados</Button>
        </DialogClose>
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
