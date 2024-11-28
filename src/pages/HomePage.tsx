import Page from "@/components/Page";
import { Dropdown } from '../components/ui/dropdown';
import { JobCard } from '../components/ui/jobCard';
import Button from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";

import { useCepApi } from "@/hooks/useCepApi";
import { ScrollUp } from '../components/ui/scrollUp';
import React, { useContext, useEffect, useState } from "react";
import { RiBrush4Line, RiUserSearchLine } from "react-icons/ri";
import { VscPreview } from "react-icons/vsc";
import { SlEnvolopeLetter } from "react-icons/sl";
import { HiOutlineBookmark } from "react-icons/hi2";
import { useBackendApi } from '../hooks/useBackendApi'; 
import { FaPlus } from "react-icons/fa6";
import { BiCollection } from "react-icons/bi";
import img from "../assets/unnamed.png";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer"



import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/Input";
import { FaRegEdit } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { format } from "date-fns";
import { error } from "console";

interface jobPosition {
    _id: string;
    title: string;
    enterprise: string;
    summary: string;
    skill: [];
    location: string;
  }

export function HomePage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [positions, setPositions] = useState<jobPosition[]>([]);
    const [order, setOrder] = useState('Mais relevante');
    const itemsPerPage = 6;
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const api = useBackendApi();
    const [userType, setUserType] = useState<'freelancer' | 'contractor' | null>(null);
    const [openDialogPosition, setOpenDialogPosition] = useState(false);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);
    const [openDialogDelete, setOpenDialogDelete] = useState(false)
    const [step, setStep] = useState(1);
    const [workModel, setWorkModel] = useState('distancia');
    const cepApi = useCepApi();
  

    const [cep, setCep] = useState("");
    const [remuneracao, setRemuneracao] = useState("");
    
    // const [id, setId] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [education, setEducation] = useState('Ensino médio');
    // const [jobModel, setJobModel] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState<string | undefined>(undefined);
    const [endDate, setEndDate] = useState<string | undefined>(undefined);
    const [experience, setExperience] = useState(Number);
    const [isPrivate, setIsPrivate] = useState(false);

    
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            api.persistenceLogin(token).then((response) => {
                const user = response.user;
                setUserType(user.isContractor ? 'contractor' : 'freelancer');
            }).catch((error) => {
                console.error("Erro ao persistir login:", error);
            });
        }
    }, [api]);

   

    // useEffect(() => {
    //     const fetchpositions = async () => {
    //         try {
    //             const response = await api.listPosition();
    //             setPositions(response.position);
    //         } catch (error) {
    //             console.error("Erro ao buscar vagas:", error);
    //         }
    //     };
    //     fetchpositions();
    // }, [api]);

    useEffect(() => {
        if (auth.user?.isADM) {
            navigate("/Dashboard");
        }
    }, [auth.user, navigate]);
    
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentpositions = positions.slice(indexOfFirstItem, indexOfLastItem);

    const goTo = (navigateTo: string) => {
        window.scrollTo({ top: 0 });
        navigate(navigateTo);
    };

    const formatCurrency = (value: any) => {
        const numericValue = value.replace(/[^\d]/g, "");
        const formattedValue = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(numericValue / 100);
        return formattedValue;
    };

    const createJobPosition = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if(!startDate) return 
        if(!endDate) return
        const dateFormated = format(startDate, 'MM/dd/yyyy')
        const dateFormatedEnd = format(endDate, 'MM/dd/yyyy')

        const newPosition = {
            title,
            enterprise: auth.user?.name as string || "Nome da Empresa", 
            summary,
            salary: parseFloat(remuneracao.replace(/[^\d.-]+/g, "")), 
            skill: skills,
            jobModel: workModel,
            location,
            startDate: dateFormated || "", 
            endDate: dateFormatedEnd || "", 
            degree: education,
            experience,
            isPrivate,
        };


       

        console.log("Nova posição sendo enviada:", newPosition);
    
        try {
            const response = await api.createPosition(
                newPosition.title,
                newPosition.enterprise,
                newPosition.summary,
                newPosition.salary,
                newPosition.skill,
                newPosition.jobModel,
                newPosition.location,
                newPosition.startDate,
                newPosition.endDate,
                newPosition.degree,
                newPosition.experience,
                newPosition.isPrivate
            );
            
            // setPositions([...positions, response.position]);
            console.log('Vaga criada com sucesso:', response.position);
            setOpenDialogPosition(false);
        } catch (error) {
            console.error('Erro ao cadastrar vaga', error);
        }
    };


   
    const deleteJobPosition = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const deletePosition = {

        
        title

        }

        console.log("Nova posição sendo enviada:", deletePosition);
    
        try {
            const response = await api.deletePosition(
                title
                
            );
            
            // setPositions([...positions, response.position]);
         
            setOpenDialogDelete(false);
        } catch (error) {
            console.error('Erro ao cadastrar vaga', error);
        }

    };


    

    return (
        <div className="min-h-screen">
            <Page className="bg-grey">
                <div className=" lg:flex justify-items-center lg:justify-between lg:items-start mx-32 lg:mx-48 my-24 lg:space-x-8 pt-14 lg:pt-0">
                    <div className="lg:w-1/4">
                        <div className="flex flex-col items-center lg:justify-center">

                       
                            <p className="text-5xl text-center lg:text-xl text-darkBlueText">
                                Boas vindas, <span className="text-mainBeige"> {userType === 'contractor' ? 'contratante' : 'freelancer'}!</span>
                            </p>
                            <div className="mt-6 mb-8 flex justify-center w-full">
                            <img
                                className="h-72 lg:h-52  rounded-full object-cover border-2 border-grey"
                                src={img}
                                alt="User"
                            />
                            </div>
                             <div className=" ">
                                <Button
                                variant="simple"
                                onClick={() => goTo(`/Profile/${auth.user?._id}`)}
                            >
                                Ver perfil
                            </Button>
                            
                            <Drawer>
    <DrawerTrigger>
        <Button
            variant="simple"
            onClick={() => console.log('metricas')}
        >
            Métricas
        </Button>
    </DrawerTrigger>
    <DrawerContent className="bg-grey min-h-[500px]">
        <div className="min-w-[600px] mx-auto">
            <DrawerHeader>
                <div className="flex justify-between gap-4">
                    <div className="text-3xl mt-10 text-mainBeige">Métricas do Perfil</div>
                </div>
            </DrawerHeader>
            <div className="p-5">
                {auth.user?.createdAt ? (
                    <div className="text-center ">
                        <div className="border rounded px-5 py-3 border-lightBlueText text-darkBlueText my-3 ">
                            <p>Data de Criação: {new Date(auth.user.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="border rounded px-5 py-3 border-lightBlueText text-darkBlueText my-3">
                            <p>{`Este perfil foi criado há ${new Date().getFullYear() - new Date(auth.user.createdAt).getFullYear()} anos.`}</p>
                        </div>

                        {new Date().getFullYear() - new Date(auth.user.createdAt).getFullYear() >= 1 && (
                            <div className="border rounded px-5 py-3 border-lightBlueText text-darkBlueText my-3">
                                <p>Este perfil possui mais de 1 ano de existência!</p>
                            </div>
                        )}

                        {new Date().getFullYear() - new Date(auth.user.createdAt).getFullYear() >= 5 && (
                            <div className="border rounded px-5 py-3 border-lightBlueText text-darkBlueText my-3">
                                <p>Este perfil tem mais de 5 anos. Parabéns pela jornada!</p>
                            </div>
                        )}

                        <div className="border rounded px-5 py-3 border-lightBlueText text-darkBlueText my-3">
                            <p>Data de criação do perfil: {new Date(auth.user.createdAt).toLocaleDateString()}</p>
                        </div>
                        

                        <div className="border rounded px-5 py-3 border-lightBlueText text-darkBlueText my-3">
                            <p>Idade do usuário: {new Date().getFullYear() - new Date(auth.user.birthDate).getFullYear()} anos</p>
                        </div>
                        <div className="border rounded px-5 py-3 border-lightBlueText text-darkBlueText my-3">
                            <p>Habilidades cadastradas: {auth.user.skills.length}</p>
                        </div>
                        <div className="border rounded px-5 py-3 border-lightBlueText text-darkBlueText my-3">
                            <p>Experiências profissionais: {auth.user.experience.length}</p>
                        </div>
                        <div className="border rounded px-5 py-3 border-lightBlueText text-darkBlueText my-3">
                            <p>Formações acadêmicas: {auth.user.academic.length}</p>
                        </div>
                        <div className="border rounded px-5 py-3 border-lightBlueText text-darkBlueText my-3">
                            <p>Tipo de usuário: {auth.user.isContractor ? 'Contratante' : 'Freelancer'}</p>
                        </div>
                    </div>
                ) : (
                    <div className="border rounded px-5 py-3 border-lightBlueText text-darkBlueText my-3">
                        <p>Nenhuma métrica disponível. Por favor, verifique se a data de criação do perfil está correta.</p>
                    </div>
                )}
            </div>
        </div>
    </DrawerContent>
</Drawer>


                        </div>
                        </div>
                    </div>

                    <div className="flex-1 pt-20 lg:pt-0">
                        {userType === 'freelancer' && (
                            <>
                                <p className="text-darkBlueText text-5xl lg:text-3xl pb-4 text-center">Vagas que talvez te interessem</p>
                                <Dropdown onChange={setOrder} />
                                <p className="text-2xl lg:text-lg text-gray-500 text-center my-5">
                                    Você ainda não possui vagas recomendadas. Atualize as informações de seu perfil para receber recomendações ou confira a página de vagas.
                                </p>
                                <Pagination
                                    totalPages={Math.ceil(positions.length / itemsPerPage)}
                                    currentPage={currentPage}
                                    onPageChange={setCurrentPage}
                                />
                            </>
                        )}
                        {userType === 'contractor' && (
                            <>
                            <div>
                                <p className="text-darkBlueText text-5xl lg:text-3xl pb-4 text-center">Freelancers disponíveis</p>
                                
                                <Dropdown onChange={setOrder} />
                                <p className="text-2xl lg:text-lg text-gray-500 text-center mt-5">
                                    Você ainda não possui freelancers recomendados. Atualize as informações de suas vagas para receber recomendações ou confira a página de freelancers disponíveis.
                                </p>
                                {positions.map((position, index) => (
                                  <JobCard key={index} job={position} isContractor={false} />
                                 ))}
                            
                            {positions.map((position, index) => (
                                  <JobCard key={index} job={position} isContractor={true} />
                                 ))}
                            

                                <Pagination
                                    totalPages={Math.ceil(currentpositions.length / itemsPerPage)}
                                    currentPage={currentPage}
                                    onPageChange={setCurrentPage}
                                />
                                </div>
                            </>
                        )}
                        
                    </div>

                    <div className="lg:w-1/6 flex flex-col items-right space-y-6 pt-16 mb-64 lg:mb-0">
                        {userType === 'freelancer' && (
                            <>
                                {/* <Button
                                    variant="mainClear"
                                    leftIcon={<HiOutlineBookmark />}
                                    onClick={() => console.log('Vagas salvas clicado')}
                                >
                                    Vagas salvas
                                </Button> */}
                                <Button
                                    variant="mainClear"
                                    leftIcon={<RiBrush4Line />}
                                    onClick={() => console.log('Atualizar dados pessoais clicado')}
                                >
                                    Atualizar dados pessoais
                                </Button>
                                <Button
                                    variant="mainClear"
                                    leftIcon={<VscPreview />}
                                    onClick={() => goTo(`/Positions`)}
                                >
                                    Buscar vagas
                                </Button>
                                <Button
                                    variant="mainClear"
                                    leftIcon={<SlEnvolopeLetter />}
                                    onClick={() => goTo(`/CoverLetter`)}
                                >
                                    Carta de apresentação
                                </Button>
                            </>
                        )}
                        {userType === 'contractor' && (
                            <>
                            <div className="lg:w-1/6 flex flex-col items-right space-y-6 pt-16  lg:mb-0">
                                <Dialog onOpenChange={setOpenDialogPosition} open={openDialogPosition}>
                                    <DialogTrigger>
                                        <Button
                                            variant="mainClear"
                                            leftIcon={<FaPlus />}
                                            onClick={() => setOpenDialogPosition(true)} 
                                            
                                        >
                                            Publicar uma vaga
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-whiteLight md:min-w-[700px] lg:min-w-[600px]  py-10 px-8 text-3xl lg:text-base">
                                        <DialogHeader>
                                            <DialogTitle className="text-darkBlueText text-5xl lg:text-2xl">Publicar uma vaga</DialogTitle>
                                            <p className="text-gray-500">Encontre o freelancer ideal para o seu serviço.</p>
                                        </DialogHeader>

                                        {step === 1 && (
                                            <form className="flex flex-col gap-3 text-darkBlueText" >
                                                <div className="">
                                                <Input title="Título da vaga" value={title} onChange={(e) => setTitle(e.target.value)} className="" required />
                                                
                                                    <p className="text-darkBlueText max-w-36 relative top-2 left-3 px-2 bg-whiteLight text-md">Descrição da vaga</p>

                                                    <textarea className="w-full py-2 min-h-24 rounded-md border-[1px] border-blueText bg-whiteLight focus:outline-none px-3 focus:border-lightBlueText transition-all duration-200"
                                                    value={summary}
                                                    onChange={(e) => setSummary(e.target.value)}
                                                    required />

                                                    <Input title="Habilidades desejadas" className="" 
                                                    value={skills}
                                                    onChange={(e) =>{console.log(skills)  
                                                        setSkills(e.target.value.split(','))}}
                                                    placeholder="Habilidades desejadas para a vaga (separadas por vírgulas, sem espaço)"
                                                    required
                                                    />

                                                    <div className="mb-5">
                                                    <p className="text-darkBlueText max-w-28 relative top-2 left-3 px-2 bg-whiteLight text-md"> Escolaridade </p>
                                                    <select className="w-full rounded-md border-[1px] border-blueText bg-whiteLight focus:outline-none focus:border-lightBlueText px-3 py-4 m"
                                                    value={education}
                                                    onChange={(e) => setEducation(e.target.value)}
                                                    >
                                                        <option value="Ensino médio">Ensino médio</option>
                                                        <option value="Superior cursando">Ensino superior (cursando)</option>
                                                        <option value="Superior completo">Ensino superior (completo)</option>
                                                        <option value="Bacharelado cursando">Bacharelado (cursando)</option>
                                                        <option value="Bacharelado completo">Bacharelado (completo)</option>
                                                        <option value="nulo">Sem preferência de escolaridade</option>
                                                        
                                                    </select>

                                                    <Input title="Experiência desejada" value={experience} type="text"  onChange={(e) => setExperience(e.target.value)}/>

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
                                            <form className="flex flex-col gap-3 text-darkBlueText" onSubmit={createJobPosition}>
                                                <div className="m-">
                                                <p className="text-lightBlueText lg:text-sm hover:text-mainBeige"
                                                onClick={() => {
                                                setStep(1); 
                                                    }}>
                                                        Voltar</p>

                                                <Input
                                                    title="Remuneração"
                                                    type="text"
                                                    value={remuneracao}
                                                    onChange={(e) => setRemuneracao(formatCurrency(e.target.value))}
                                                
                                                required
                                                />

                                                <Input title="Início de contrato" className="" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

                                                <Input title="Fim de contrato" value={endDate}
                                                 onChange={(e) => setEndDate(e.target.value)} type="date"/>

                                                <div className="mb-5">
                                                    <p className="text-darkBlueText max-w-40 relative top-2 left-3 px-2 bg-whiteLight text-md">Modelo de trabalho</p>
                                                    <select className="w-full rounded-md border-[1px] border-blueText bg-whiteLight focus:outline-none focus:border-lightBlueText px-3 py-4 m"
                                                    value={workModel}
                                                    onChange={(e) => setWorkModel(e.target.value)}
                                                    >
                                                        <option value="À distância">À distância</option>
                                                        <option value="Presencial">Presencial</option>
                                                    </select>
                                                    {workModel === 'Presencial' && (
                                                        <div>
                                                        <Input title="CEP" onChange={(e)=>getAddress(e.target.value)}/>
                                                  <Input readOnly title="Estado" value={location} onChange={(e)=>setLocation(e.target.value)}/>
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
                                                    Publicar Vaga
                                                </Button>
                                                </div>
                                               
                                                
                                            </form>
                                        )}
                                    </DialogContent>
                                </Dialog>


                                <Dialog onOpenChange={setOpenDialogDelete} open={openDialogDelete}>
                                    <DialogTrigger>
                                        <Button
                                            variant="mainClear"
                                            leftIcon={< CiTrash />}
                                            onClick={() => setOpenDialogDelete(true)} 
                                            
                                        >
                                            Deletar vaga
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-whiteLight  py-10 px-8">
                                        <DialogHeader>
                                            <DialogTitle className="text-darkBlueText text-2xl">Deletar vaga</DialogTitle>
                                    
                                        </DialogHeader>

                                        
                                            <form className="flex flex-col gap-3 text-darkBlueText " onSubmit={deleteJobPosition} >
                                                <div className="">
                                                <Input title="Título da vaga" value={title} onChange={(e) => setTitle(e.target.value)} className="" required />
                                      
                                                </div>

                                                <div className="flex">
                                                    
                                                <Button  variant="strongBlue" leftIcon={null} rightIcon={null} type="submit" onClick={() => console.log('Vaga publicada')}  >
                                                    Deletar vaga
                                                </Button>
                                                </div>

                                            </form>
                                        
                                    </DialogContent>
                                </Dialog>
                                
                                
                                
                                <Button 
                                    variant="mainClear" 
                                    leftIcon={<RiUserSearchLine />} 
                                    onClick={() => goTo(`/Positions`)}
                                >
                                    Buscar freelancers                           
                                </Button>

                                <Dialog onOpenChange={setOpenDialogEdit} open={openDialogEdit}>
                                    <DialogTrigger>
                                        <Button
                                            variant="mainClear"
                                            leftIcon={<FaRegEdit  />}
                                            onClick={() => setOpenDialogEdit(true)} 
                                            
                                        >
                                            Editar vaga
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
                                                <Input title="Título da vaga" value={title} onChange={(e) => setTitle(e.target.value)} className="" required />
                                                <Input title="Novo título da vaga" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="" required />
                                                
                                                    <p className="text-darkBlueText max-w-36 relative top-2 left-3 px-2 bg-whiteLight text-md">Descrição da vaga</p>

                                                    <textarea className="w-full py-2 min-h-24 rounded-md border-[1px] border-blueText bg-whiteLight focus:outline-none px-3 focus:border-lightBlueText transition-all duration-200"
                                                    value={summary}
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
                                                    value={education}
                                                    onChange={(e) => setEducation(e.target.value)}
                                                    >
                                                        <option value="ensinomedio">Ensino médio</option>
                                                        <option value="superiorcursando">Ensino superior (cursando)</option>
                                                        <option value="superiorcompleto">Ensino superior (completo)</option>
                                                        <option value="bachareladocursando">Bacharelado (cursando)</option>
                                                        <option value="bachareladocompleto">Bacharelado (completo)</option>
                                                        <option value="nulo">Sem preferência de escolaridade</option>
                                                        
                                                    </select>

                                                    <Input title="Experiência desejada" value={experience} type="text"  onChange={(e) => setExperience(e.target.value)}/>

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
                                            null
                                        )}
                                    </DialogContent>
                                </Dialog>
                                </div>
                            </>
                            
                        )}
                    </div>
                </div>
                <ScrollUp />
            </Page>
        </div>
    );
}
