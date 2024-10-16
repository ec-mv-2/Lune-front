import ScrollReveal from "scrollreveal";

import logo from "../assets/Logo.png"

import img from "../assets/imgs (3).png"

import { FaStar, FaYoutube  } from "react-icons/fa";
import { BiBarChartAlt2 } from "react-icons/bi";
import { FaRegHandshake, FaSquareXTwitter } from "react-icons/fa6";
import { GoShieldCheck } from "react-icons/go";
import { IoChatbubblesOutline } from "react-icons/io5";
import { PiUsersThree } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate()

    const starsNumber = [1, 2, 3, 4, 5]

    const scrollRevealServices = document.getElementById('scrollRevealServices') 
    const scrollRevealInfos = document.getElementById('scrollRevealInfos') 
    const scrollRevealButton = document.getElementById('scrollRevealButton') 
    const scrollRevealReviews = document.getElementById('scrollRevealReviews') 
     
    if(scrollRevealServices){
        ScrollReveal().reveal(scrollRevealServices, {
            delay: 100,
            duration: 300,
            origin: 'bottom'
        });
    }
    if(scrollRevealInfos){
        ScrollReveal().reveal(scrollRevealInfos, {
            delay: 100,
            duration: 300,
            origin: 'bottom'
        });
    }
    if(scrollRevealButton){
        ScrollReveal().reveal(scrollRevealButton, {
            delay: 100,
            duration: 300,
            origin: 'bottom'
        });
    }
    if(scrollRevealReviews){
        ScrollReveal().reveal(scrollRevealReviews, {
            delay: 100,
            duration: 300,
            reset: true,
            origin: 'bottom'
        });
    }

    return (
        <div className="bg-whiteLight ">    
            <div className="p-10" >
                <div className="flex justify-end gap-5 text-center text-blueText  ">
                    <div>
                        <h1 className="text-3xl">+200</h1>
                        <p className="text-sm">freelancers</p>
                    </div>
                    <div>
                        <h1 className="text-3xl">+400</h1>
                        <p className="text-sm">vagas</p>
                    </div>
                    <div>
                        <h1 className="text-3xl">+150</h1>
                        <p className="text-sm">empregadores</p>
                    </div>
                </div>
                <div className="flex flex-col items-center sm:p-24 text-darkBlueText sticky top-0" >
                    <div className="w-full">
                        <img src={logo} className="h-32"/>
                    </div>
                    <p className="text-2xl sticky top-0 w-full">A plataforma que conecta talentos e oportunidades</p>
                    <div className="mt-10 flex gap-10" >
                        <div className="hidden sm:block">
                            <div className="h-[2300px] w-[3px] bg-lightBlueText z-30"></div>
                        </div>
                        <div className="flex flex-col gap-52 items-center " >
                            <div className="flex flex-col gap-7 w-full items-center">
                                <div onClick={()=>navigate("/Register/false")} className="bg-blueText p-5 flex justify-between w-4/6 rounded-md text-white hover:brightness-75 transition-all duration-200 cursor-pointer flex-wrap">
                                    <h1 className="text-xl"><strong>SOU FREELANCER</strong></h1>
                                    <p>Cadastre seus serviços</p>
                                </div>
                                <div className="bg-blueText p-5 flex justify-between flex-wrap rounded-md text-white hover:brightness-75 transition-all duration-200 cursor-pointer w-4/6" onClick={()=>navigate("/Register/true")}>
                                    <h1 className="text-xl"><strong>SOU CONTRATANTE</strong></h1>
                                    <p>Encontre um profissional</p>
                                </div>
                                <p className="text-darkBlueText w-4/6">Já possuí uma conta? <span className="text-mainBeige cursor-pointer hover:underline" onClick={()=>navigate("/Login")}>Faça login</span></p>
                            </div>
                            
                            <div className=" text-darkBlueText w-4/6" id="scrollRevealServices">
                                <h2 className="text-2xl text-darkBlueText">Suas oportunidades na palma da sua mão</h2>
                                <div>
                                    <img  src={img} />  
                                </div>
                                <p className="">Conecte-se aos melhores talentos e oportunidades de trabalho remoto, em qualquer lugar e em qualquer dispositivo. Seja no computador, tablet ou smartphone, nossa plataforma permite que você contrate ou ofereça serviços de forma simples, rápida e segura, tudo ao seu alcance!</p>
                            </div>
                            <div className=" flex flex-wrap gap-y-24 md:justify-between justify-center " id="scrollRevealInfos">
                                <div className="flex flex-wrap gap-y-24 md:justify-between justify-center max-w-[850px]">
                                    <div className="text-center max-w-[283px] ">
                                        <p className="text-9xl  flex justify-center"><BiBarChartAlt2 /></p>
                                        <h2 className="text-mainBeige"><strong>Se destaque</strong></h2>
                                        <p >Demonstre todo o seu potencial para conseguir oportunidades incríveis</p>
                                    </div>
                                    <div className="text-center max-w-[283px] xl:relative top-36">
                                        <p className="text-9xl  flex justify-center"><FaRegHandshake /></p>
                                        <h2 className="text-mainBeige"><strong>Feche acordos</strong></h2>
                                        <p >Feche acordos e negocie com a empresa que deseja seus serviços</p>
                                    </div>
                                    <div className="text-center max-w-[283px] ">
                                        <p className="text-9xl  flex justify-center"><GoShieldCheck /></p>
                                        <h2 className="text-mainBeige"><strong>Verifique sua conta</strong></h2>
                                        <p >Verifique a autenticidade de sua conta ao nos encaminhar seu documento</p>
                                    </div>
                                    <div className="text-center max-w-[283px] ">
                                        <p className="text-9xl  flex justify-center"><IoChatbubblesOutline /></p>
                                        <h2 className="text-mainBeige"><strong>Converse com contratantes</strong></h2>
                                        <p >Receba e responda mensagens de empresas interessadas em seu perfil</p>
                                    </div>
                                    <div className="text-center max-w-[283px] ">
                                        <p className="text-9xl  flex justify-center"><PiUsersThree /></p>
                                        <h2 className="text-mainBeige"><strong>Crie uma network forte</strong></h2>
                                        <p >Aproveite o reconhecimento de nosso site e fortaleça seu networking</p>
                                    </div>
                                    <div className="flex justify-center w-full" id="scrollRevealButton">
                                        <button className="text-white bg-mainBeige px-24 py-3 rounded-full transition-all hover:brightness-75 duration-200">Comece agora</button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-around w-4/6" id="scrollRevealReviews">
                                <div className="flex flex-col items-center">
                                    <h1 className="text-2xl ">Jhon Doe</h1>
                                    <img className="rounded-full lg:h-52 lg:w-52 h-28 w-28 z-10" src="https://as1.ftcdn.net/v2/jpg/03/16/01/06/1000_F_316010690_Wm9W2fSc2KTVvuyuJDZSb7xDNZ77q0qC.jpg" alt="" />
                                    <div className="bg-[#dfdfdf] max-w-80 text-center lg:h-60 h-72 flex flex-col justify-end relative -top-20 p-5 rounded-md">
                                        <div className="flex gap-1 justify-center text-lg text-center">
                                            {starsNumber.map(star => {
                                                return (
                                                    <FaStar key={star} className="text-yellow-400" />
                                                )
                                            })}
                                        </div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <h1 className="text-2xl ">Jhon Doe</h1>
                                    <img className="rounded-full lg:h-52 lg:w-52 h-28 w-28 z-10" src="https://as1.ftcdn.net/v2/jpg/03/16/01/06/1000_F_316010690_Wm9W2fSc2KTVvuyuJDZSb7xDNZ77q0qC.jpg" alt="" />
                                    <div className="bg-[#dfdfdf] max-w-80 text-center lg:h-60 h-72 flex flex-col justify-end relative -top-20 p-5 rounded-md">
                                        <div className="flex gap-1 justify-center text-lg text-center">
                                            {starsNumber.map(star => {
                                                return (
                                                    <FaStar key={star} className="text-yellow-400" />
                                                )
                                            })}
                                        </div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#dfdfdf] h-60 p-20 flex justify-between">
                <div className="flex items-center h-full">
                    <h1 className="text-4xl text-darkBlueText">LUNE</h1>
                </div>
                <div>
                    <ul>
                        <li>Product</li>
                        <li>Features</li>
                        <li>Enterprise</li>
                        <li>Copilot</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>Security</li>
                        <li>Pricing</li>
                        <li>Team</li>
                        <li>Contact</li>
                    </ul>
                </div>
                <div className="flex items-end text-3xl gap-10 text-darkBlueText">
                    <FaYoutube/>
                    <FaSquareXTwitter/>
                    <MdEmail/>
                    <RiInstagramFill/>  
                </div>
            </div>

        </div>
    )
}