import Page from "@/components/Page";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { useBackendApi } from "@/hooks/useBackendApi";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export function Help() {
    const backEndApi = useBackendApi()
    const [name, setName] = useState("")
    const [question, setQuestion] = useState("")
    async function sendHelp(e: FormEvent){
        e.preventDefault();
        const data = await backEndApi.sendHelp(name,question)
        console.log(name)
        if (data){setName("") 
            setQuestion("")
            toast.success("Dúvida enviada com sucesso!")
        } 
    }
        


    return (
        <Page className="">
            <div className=" max-w-[500px] mx-auto items-center my-10 flex-col flex">

                <div className="   ">

                    <div className="text-3xl text-darkBlueText h-16" id="Help-text">
                        <p>Ajuda</p>
                    </div>

                    <div className="text-2xl text-darkBlueText h-9" id="FAQ-text">
                        <p>Dúvidas frequentes</p>
                    </div>

                    <div className="w-[450px] ">
                    <div className=" justify-center">
                        <Accordion type="single" collapsible  >
                            <AccordionItem value="item-1" className="py-0  border-blueText border-t-[1] transition-all duration-200 text-darkBlueText ">
                                <AccordionTrigger ><p className="text-left">O que é o Lune?</p></AccordionTrigger>
                                <AccordionContent>
                                    O Lune é um sistema web focado em admissão de freelancers, onde seu objetivo é unir usuários que desejam 
                                    contratar um profissional para um serviço curto e sem contrato, e usuários que desejam proporcionar esse serviço.
                                </AccordionContent>
                            </AccordionItem>


                            <AccordionItem value="item-2" className="py-0 border-blueText border-t-[1] transition-all duration-200  text-darkBlueText">
                                <AccordionTrigger><p>Como realizo a publicação de uma vaga?</p></AccordionTrigger>
                                <AccordionContent>
                                    A publicação da vaga só poderá ser realizada no perfil do contratante onde a opção está disponivel. Todas as informações da 
                                    vaga deverão ser obrigatoriamente preenchidas para serem publicadas.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3" className="py-0 min-h-0  border-blueText border-t-[1] transition-all duration-200  text-darkBlueText">
                                <AccordionTrigger><p className="text-left">Onde posso localizar as informações de contato do contratante?</p></AccordionTrigger>
                                <AccordionContent>
                                    Todas as informações relacionadas ao contratante estarão disponíveis no perfil do contratante.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4" className="py-0 min-h-0  border-blueText border-t-[1] transition-all duration-200 text-darkBlueText">
                                <AccordionTrigger><p className="text-left">Posso ter os perfis de freelancer e contratante ao mesmo tempo?</p></AccordionTrigger>
                                <AccordionContent className=" text-darkBlueText">
                                    Não, no momento só é possivel ter uma conta de cada vez.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
               

                <div className="text-2xl text-darkBlueText mt-20" id="Perfil-text">
                    <p className="">Envio de dúvidas</p>
                </div>
                <div className="w-[450px] ">
                <div className="mb-20" id="Perfil">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1" className="py-0 min-h-0  border-blueText border-t-[1] transition-all duration-200 text-darkBlueText">
                            <AccordionTrigger><p>Como realizo o envio de uma dúvida?</p></AccordionTrigger>
                            <AccordionContent>
                                A dúvida pode ser enviada através do formulário que está locazalido no final desta página.
                            </AccordionContent>
                        </AccordionItem>


                        <AccordionItem value="item-2" className="py-0 min-h-0  border-blueText border-t-[1] transition-all duration-200 text-darkBlueText">
                            <AccordionTrigger><p>Todas as dúvidas são anônimas?</p></AccordionTrigger>
                            <AccordionContent>
                                Não, no momento solicitamos apenas o nome do usuário como forma de identificação.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="py-0   border-blueText border-t-[1] transition-all duration-200 text-darkBlueText">
                            <AccordionTrigger><p>Como minha dúvida será respondida?</p></AccordionTrigger>
                            <AccordionContent>
                                As dúvidas serão respondidas através do chat, nossos administradores entrarão em contato com a explicação da dúvida que foi enviada pelo formulário.
                                As respostas podem variar de 3 à 5 dias úteis devido a demanda da equipe.
                            </AccordionContent>
                        </AccordionItem>


                        <AccordionItem value="item-4" className="py-0 min-h-0  border-blueText border-t-[1] transition-all duration-200 text-darkBlueText">
                            <AccordionTrigger><p>Como o formulário funciona?</p></AccordionTrigger>
                            <AccordionContent>
                                O usuário irá escrever sua dúvida e enviar através do formulário, onde a dúvida será encaminhada para nossa equipe que ficará responsável pelo retorno ao usuário.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                </div>
                </div>


                <div className=" text-3xl text-darkBlueText h-16 ">
                    Ainda precisa de ajuda?
                </div>
                <div className="Container-needform w-full ">
                    <form className=" bg-whiteLight  border rounded-tr-3xl rounded-3xl py-5" onSubmit={sendHelp}>
                        <div className="FormTextHelp-text">
                            <div className="texto 1 ml-10 mr-10 text-darkBlueText text-sm">
                                <Input title="Nome" value={name} onChange={(e) => setName(e.target.value)}/>

                            </div>
                            <div className="texto 2 ml-10 mr-10">

                            </div>
                            <div className="text 2 ml-10 mr-10">
                                <p className="text-darkBlueText max-w-[150px]  relative top-2 left-3 px-2 bg-whiteLight text-sm">Escreva sua dúvida</p>
                                <textarea name="comentarios" className="w-full py-2 min-h-24 rounded-md border-[1px] border-blueText bg-whiteLight focus:outline-none px-3 focus:border-lightBlueText transition-all duration-200" value={question} onChange={(e) => setQuestion(e.target.value)}/>
                            </div>
                            <div className="flex justify-center">
                            <button type="submit"  className="bg-darkBlueText py-3 px-14 mt-2 text-white rounded hover:brightness-75 transition-all duration-200" >Enviar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer/>
        </Page>
    )
}