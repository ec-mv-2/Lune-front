import Page from "@/components/Page";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

export function Settings() {

    const [numPage,setNumPage] = useState(1) 

    return (
        <Page className="">
        <div className="max-w-[800px]  mx-auto items-center my-10 flex">

                <div className="flex flex-col gap-5 px-10">

                    <button type="submit" className="bg-darkBlueText py-3 px-5 text-white 
          rounded hover:brightness-75 transition-all duration-200" onClick={()=>setNumPage(1)}> Conta </button>

                    <button type="submit" className="bg-darkBlueText py-3 px-5 text-white 
          rounded hover:brightness-75 transition-all duration-200" onClick={()=>setNumPage(2)}> Acessibilidade</button>

                </div>
                        { numPage == 1 ? 
                <div className="">
                    <div className="text-2xl text-darkBlueText " id="Help-text">
                        <p>Conta</p>
                    </div>
                    <p className="text-blueText my-[6px]">Acesse as configurações de sua conta para que seus dados estejam sempre atualizados.</p>

                    <div className="text-2xl text-darkBlueText " id="Help-text">
                        <p>Dados Pessoais</p>
                    </div>
                    <p className="text-blueText my-[6px]">Altere seus dados</p>

                    <div className="flex  gap-5 px-10">

                    <form className="" >
                        <div className="FormTextHelp-text">
                            <div className="text-darkBlueText text-sm">
                                <Input title="Email" />

                            </div>

                            <div className="text-darkBlueText text-sm">
                                <Input title="Senha" />
                            </div>

                            <div className="text-darkBlueText text-sm">
                                <Input title="Confirme sua senha" />
                            </div>
                                                                                                                                      
                            <div className="text-darkBlueText text-sm">                                                       
                            <Input title="CEP" />
                            </div>

                            <div className="text-darkBlueText text-sm">
                            <Input title="Estado"/>
                            </div>

                            <div className="text-darkBlueText text-sm">
                            <Input title="Data de nascimento" type="date"/>
                            </div>
                  
                        </div>
                    </form>
                    </div>

                </div>
    :               <div>
                   

                
                
                    
            </div>
    }
</div>  
        </Page>
    )
}