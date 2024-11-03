import Page from "@/components/Page";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/Input";

export function Help() {


    return (
        <Page className="">
            <div className=" justify-center items-center my-10 flex-col flex">

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
               

                <div className="text-2xl text-darkBlueText mt-20 " id="Perfil-text">
                    <p className="">Perfil</p>
                </div>
                <div className="w-[450px] ">
                <div className="h-64" id="Perfil">
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
                <div className="Container-needform">
                    <div className="Container-form bg-whiteLight h-96 w-auto border rounded-tr-3xl rounded-tl-3xl py-5 ">
                        <div className="FormTextHelp-text">
                            <div className="texto 1 ml-10 mr-10">
                                <Input title="Nome"/>

                            </div>
                            <div className="texto 2 ml-10 mr-10">
                            <Input title="E-mail"/>
                            </div>
                            <div className="texto 2 ml-10 mr-10">
                                <p className="text-darkBlueText max-w-[109px]  relative top-2 left-3 px-2 bg-whiteLight text-sm">Comentários</p>
                                <textarea name="comentarios" className="w-full py-2 min-h-24 rounded-md border-[1px] border-blueText bg-whiteLight focus:outline-none px-3 focus:border-lightBlueText transition-all duration-200" />
                            </div>

                            <button className=" bg-lightBlueText text-white px-10 rounded-md hover:brightness-75 transition-all duration-200">Enviar</button>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    )
}