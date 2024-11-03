import Page from "@/components/Page";
import img from "../assets/unnamed.png";

export function Job() {

    return (

        <Page className="">

            <div className=" max-w-[800px] mx-auto justify-center  my-32 flex-col flex ">

                <div className=" w-full mx-auto flex justify-between">
                    <p className="text-3xl text-darkBlueText">Desenvolvedor</p>
                    <button className=" bg-blueText text-[20px] text-white px-5 rounded-md hover:brightness-75 transition-all duration-200 ">Candidatar-se a essa vaga</button>
                </div>
                <div className="flex mt-2 mb-7">
                    <p className=" text-1xl bg-gray-400 rounded-xl px-2 py-1 text-gray-700">Remoto</p>
                </div>



                <div className="w-[650px] ">
                    <div className="text-[17px] text-justify text-darkBlueText h-[16] ">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </div>


                <div className="w-[650px] flex ">
                    <div className="text-[17px]  text-blueText  my-5 ">
                        <p>Remuneração: <span className="text-darkBlueText">R$: 200,00</span></p>
                        <p>Data de inicio: <span className="text-darkBlueText">01/01/2024</span></p>
                        <p>Data de término: <span className="text-darkBlueText">02/02/2024</span></p>
                        <p>Localização: <span className="text-darkBlueText">Remoto</span></p>

                    </div>
                </div>

                <div className="w-[650px] h-[150px] my-5 bg-whiteLight rounded-lg ">

                    <p className="text-darkBlueText ml-[15px] my-[15px]"> Habilidades necessárias</p>

                    <div className="flex gap-5 flex-wrap ml-[15px] text-darkBlueText">

                        <p className="bg-white px-3 py-1 rounded-md hover:brightness-75 transition-all duration-200">HTML</p>
                        <p className="bg-white px-3 py-1 rounded-md hover:brightness-75 transition-all duration-200">JAVASCRIPT</p>
                        <p className="bg-white px-3 py-1 rounded-md hover:brightness-75 transition-all duration-200">CSS</p>
                        <p className="bg-white px-3 py-1 rounded-md hover:brightness-75 transition-all duration-200">REACT.JS</p>
                        <p className="bg-white px-3 py-1 rounded-md hover:brightness-75 transition-all duration-200">HTML</p>
                        <p className="bg-white px-3 py-1 rounded-md hover:brightness-75 transition-all duration-200">HTML</p>
                        <p className="bg-white px-3 py-1 rounded-md hover:brightness-75 transition-all duration-200">HTML</p>
                    </div>
                </div>

                <div className="w-[650px] h-[195px] my-5 bg-whiteLight rounded-lg ">
                    <p className="text-darkBlueText ml-[15px] my-[15px] ">Formação acadêmica necessária</p>
                    <div className="w-[600px] h-[100px] ml-[17px] my-2 bg-white rounded-lg ">
                        <p className="text-darkBlueText ml-[15px] py-2">Ensino Superior</p>
                        <p className="text-darkBlueText ml-[15px]">Análise e Desenvolvimento de Sistemas</p>
                        <p className="text-darkBlueText ml-[15px]">Análise e Desenvolvimento de Sistemas</p>
                    </div>
                </div>
                <div className="flex items-center flex-col">
                    <div className="relative mt-[20px] top-[58px]">
                        <p className="text-[25px] text-blueText text-center">Contratante</p>
                        <img className="h-52 w-52 rounded-full  border-2y" src={img} />
                    </div>
                    <div className="max-w-[520px] pb-5 bg-darkBlueText my-5 rounded-[35px] ">

                        <div className=" text-justify" >

                            <p className=" text-whiteLight pt-8 pb-[7px] pl-5 text-[22px]">Oscorp Inc.</p>

                            <p className="text-whiteLight text-[15px] pl-5 pr-5"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat.</p>

                            <p className="text-whiteLight py-4 text-[13px] pl-5 pr-5">CPNJ: 53.495.563/0001-64</p>

                            <div className=" flex justify-center">
                                <button className=" bg-mainBeige  text-white px-3 py-1 rounded-md hover:brightness-75 transition-all duration-200 ">Ver mais</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </Page>

    )
}