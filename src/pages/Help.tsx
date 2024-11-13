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
                        <p>FAQ</p>
                    </div>

                    <div className="w-[450px] ">
                    <div className=" justify-center" id="Conteudo-FAQ">
                        <Accordion type="single" collapsible  >
                            <AccordionItem value="item-1" className="py-0  border-blueText border-t-[1] transition-all duration-200 text-darkBlueText ">
                                <AccordionTrigger ><p>Lorem Ipsum is simply dummy text of the printing?</p></AccordionTrigger>
                                <AccordionContent>
                                    Lorem Ipsum is simply dummy text of the printing lorem Ipsum is simply
                                    dummy text of the printing. Ipsum is simply is simply dummy text of the
                                    printing
                                </AccordionContent>
                            </AccordionItem>


                            <AccordionItem value="item-2" className="py-0 border-blueText border-t-[1] transition-all duration-200 text-darkBlueText ">
                                <AccordionTrigger><p>Lorem Ipsum is simply dummy text of the printing?</p></AccordionTrigger>
                                <AccordionContent>
                                    Lorem Ipsum is simply dummy text of the printing lorem Ipsum is simply
                                    dummy text of the printing. Ipsum is simply is simply dummy text of the
                                    printing
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3" className="py-0 min-h-0  border-blueText border-t-[1] transition-all duration-200 text-darkBlueText">
                                <AccordionTrigger><p>Lorem Ipsum is simply dummy text of the printing?</p></AccordionTrigger>
                                <AccordionContent>
                                    Lorem Ipsum is simply dummy text of the printing lorem Ipsum is simply
                                    dummy text of the printing. Ipsum is simply is simply dummy text of the
                                    printing
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4" className="py-0 min-h-0  border-blueText border-t-[1] transition-all duration-200 text-darkBlueText">
                                <AccordionTrigger><p>Lorem Ipsum is simply dummy text of the printing?</p></AccordionTrigger>
                                <AccordionContent className=" text-darkBlueText">
                                    Lorem Ipsum is simply dummy text of the printing lorem Ipsum is simply
                                    dummy text of the printing. Ipsum is simply is simply dummy text of the
                                    printing
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
               

                <div className="text-2xl text-darkBlueText mt-20" id="Perfil-text">
                    <p className="">Perfil</p>
                </div>
                <div className="w-[450px] ">
                <div className="mb-20" id="Perfil">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1" className="py-0 min-h-0  border-blueText border-t-[1] transition-all duration-200 text-darkBlueText">
                            <AccordionTrigger><p>Lorem Ipsum is simply dummy text of the printing?</p></AccordionTrigger>
                            <AccordionContent>
                                Lorem Ipsum is simply dummy text of the printing lorem Ipsum is simply
                                dummy text of the printing. Ipsum is simply is simply dummy text of the
                                printing
                            </AccordionContent>
                        </AccordionItem>


                        <AccordionItem value="item-2" className="py-0 min-h-0  border-blueText border-t-[1] transition-all duration-200 text-darkBlueText">
                            <AccordionTrigger><p>Lorem Ipsum is simply dummy text of the printing?</p></AccordionTrigger>
                            <AccordionContent>
                                Lorem Ipsum is simply dummy text of the printing lorem Ipsum is simply
                                dummy text of the printing. Ipsum is simply is simply dummy text of the
                                printing
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="py-0   border-blueText border-t-[1] transition-all duration-200 text-darkBlueText">
                            <AccordionTrigger><p>Lorem Ipsum is simply dummy text of the printing?</p></AccordionTrigger>
                            <AccordionContent>
                                Lorem Ipsum is simply dummy text of the printing lorem Ipsum is simply
                                dummy text of the printing. Ipsum is simply is simply dummy text of the
                                printing
                            </AccordionContent>
                        </AccordionItem>


                        <AccordionItem value="item-4" className="py-0 min-h-0  border-blueText border-t-[1] transition-all duration-200 text-darkBlueText">
                            <AccordionTrigger><p>Lorem Ipsum is simply dummy text of the printing?</p></AccordionTrigger>
                            <AccordionContent>
                                Lorem Ipsum is simply dummy text of the printing lorem Ipsum is simply
                                dummy text of the printing. Ipsum is simply is simply dummy text of the
                                printing
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
                            <Button variant="mediumSizeDark" onClick={()=>sendHelp} leftIcon={null} rightIcon={null}>Enviar</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Page>
    )
}