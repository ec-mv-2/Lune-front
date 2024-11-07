import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CircumIcon from '@klarr-agency/circum-icons-react';
import { RxHamburgerMenu } from "react-icons/rx";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import logo from "../assets/Logo.png";
import testeimg from "../assets/unnamed.png";
import { AuthContext } from '@/contexts/AuthContext';

import { Sidebar } from './Sidebar';



export function Header() {
  const navigate = useNavigate();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const location = useLocation();
  const [notificationIsOpen, setNotificationIsOpen] = useState(false);
  const [profileIsOpen, setProfileIsOpen] = useState(false);
  const [chatIsOpen, setChatIsOpen] = useState(false);
  const [exitIsOpen, setExitIsOpen] = useState(false);
  const [notificationIsOpenbt, setNotificationIsOpenbt] = useState(false);
  const [profileIsOpenbt, setProfileIsOpenbt] = useState(false);
  const [chatIsOpenbt, setChatIsOpenbt] = useState(false);
  const [exitIsOpenbt, setExitIsOpenbt] = useState(false);
  const auth = useContext(AuthContext);

  function goTo(navigateTo: string) {
    window.scrollTo({ top: 0 });
    navigate(navigateTo);
  }

  const isActive = (path: string) => location.pathname === path;


  return (
    <div>
      <div className="bg-whiteLight fixed w-full z-10 ">
        <div className="pb-1">
          <div className="flex items-center lg:justify-between px-6 h-40 lg:h-28 ">
            <button
              className='text-darkBlueText hover:text-mainBeige focus:outline-none mt-3'
              onClick={() => setSidebarIsOpen(true)}
            >
              <RxHamburgerMenu className='text-5xl lg:text-lg' />
            </button>
            <img
              src={logo}
              onClick={() => goTo(`/HomePage`)}
              className="h-24 lg:h-16 mb-3 ml-4 cursor-pointer "
              alt="Logo do site Lune, com fonte azul e uma pequena lua dourada acima da letra U"
            />

          {sidebarIsOpen && <Sidebar sidebarIsOpen={sidebarIsOpen} closeSidebar={() => setSidebarIsOpen(false)} />}

          <ul className="hidden lg:flex lg:gap-4 lg:justify-center lg:flex-grow ">
            
            <li className={`px-8 hover:text-mainBeige cursor-pointer ${isActive('/Notifications') ? 'text-mainBeige' : 'text-darkBlueText'}`}>
                <Popover open={notificationIsOpen} onOpenChange={setNotificationIsOpen}>
                  <PopoverTrigger asChild>
                    <button>
                      <CircumIcon name="bell_on" size={35} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72">
                    <div className="grid gap-4">
                      <div className="space-y-2 text-center">
                        <h4 className="leading-none text-mainBeige text-xl">Notificações</h4>
                        <p className="text-lg text-muted-foreground">Você possui notificações novas.</p>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="font-medium col-span-1 text-mainBeige ml-1">Novo</span>
                          <p className="col-span-3">Retorno da vaga "Desenvolvedor"</p>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="font-medium col-span-1 text-mainBeige ml-1">Novo</span>
                          <p className="col-span-3">Retorno da vaga "Designer"</p>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <p className="col-span-6 ml-1">Senha alterada em 26/09/2024. Não foi você? Clique aqui.</p>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <p className="col-span-6 ml-1">Senha alterada em 20/09/2024. Não foi você? Clique aqui.</p>
                        </div>
                        <p className='text-center pt-6 pb-2 text-mainBeige cursor-pointer' onClick={() => goTo(`/Notifications`)}>
                          Ver todas notificações (7)
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </li>

              <li className={`px-8 hover:text-mainBeige cursor-pointer ${isActive('/Profile') ? 'text-mainBeige' : 'text-darkBlueText'}`}>
                <Popover open={profileIsOpen} onOpenChange={setProfileIsOpen}>
                  <PopoverTrigger asChild>
                    <button>
                      <CircumIcon name="user" size={35} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72">
                    <div className="grid gap-4">
                      <div className="space-y-2 text-center">
                        <h4 className="leading-none text-mainBeige text-xl">Perfil</h4>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid-cols-4 text-center gap-4">
                          <p className="col-span-3 text-xl text-darkBlueText text-truncate">{auth.user?.name}</p>
                        </div>
                        <div className='flex justify-center items-center w-full'>
                          <img src={testeimg} className='h-48 rounded-full items-center' />
                        </div>
                        <div className="grid-cols-4 items-center gap-4">
                          <p className="col-span-3 text-center">{auth.user?.bio}</p>
                        </div>
                        <p className='text-center pt-6 pb-2 text-mainBeige cursor-pointer' onClick={() => goTo(`/Profile/${auth.user?._id}`)}>
                          Ver seu perfil
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </li>

              <Popover open={chatIsOpen} onOpenChange={setChatIsOpen}>
                <PopoverTrigger asChild>
                  <button>
                    <li className={`px-8 hover:text-mainBeige cursor-pointer ${isActive('/Chat') ? 'text-mainBeige' : 'text-darkBlueText'}`}>
                      <CircumIcon name="chat_2" size={36} />
                    </li>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-72">
                  <div className="grid gap-4">
                    <div className="space-y-2 text-center">
                      <h4 className="leading-none text-mainBeige text-xl">Notificações</h4>
                      <p className="text-sm text-muted-foreground">Você tem 3 mensagens não lidas.</p>
                    </div>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium col-span-1">Novo</span>
                        <p className="col-span-3">Seu pedido foi enviado</p>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium col-span-1">Novo</span>
                        <p className="col-span-3">Sua senha foi alterada</p>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium col-span-1">Novo</span>
                        <p className="col-span-3">Sua assinatura está prestes a expirar</p>
                      </div>
                      <p className='text-center pt-6 pb-2 text-mainBeige cursor-pointer' onClick={() => goTo(`/Chat`)}>
                        Ver todas conversas
                      </p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover open={exitIsOpen} onOpenChange={setExitIsOpen}>
                <PopoverTrigger asChild>
                  <button>
                    <li className="px-8 text-darkBlueText hover:text-mainBeige focus:text-mainBeige cursor-pointer">
                      <CircumIcon name="logout" size={35} />
                    </li>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-72 text-center">
                  <div className="grid gap-4">
                    <div className="space-y-2 text-center">
                      <h4 className="leading-none text-mainBeige text-xl">Deslogar</h4>
                    </div>
                    <div className="grid gap-2">
                      <div className="items-center gap-4">
                        <p className="col-span-3 text-center"> Deseja sair de sua conta?</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => {
                    auth.signout();
                    navigate("/");
                  }} className='uppercase bg-darkBlueText mt-5 px-9 py-2 rounded-md text-white'> Sair </button>
                  <p className='text-center pt-3 pb-2 text-mainBeige cursor-pointer'>
                    Continuar
                  </p>
                </PopoverContent>
              </Popover>
            
            </ul>
            
            {/* divião entre barra superior e inferior */}


            <div className="lg:hidden fixed bottom-0 w-screen bg-whiteLight ">
            <ul className="flex justify-center items-center gap-16 py-8">
              
              <li className={`px-8 hover:text-mainBeige cursor-pointer ${isActive('/Notifications') ? 'text-mainBeige' : 'text-darkBlueText'}`}>
                <Popover open={notificationIsOpenbt} onOpenChange={setNotificationIsOpenbt}>
                  <PopoverTrigger asChild>
                    <button>
                      <CircumIcon name="bell_on" size={60} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="lg:w-72 w-[400px] text-3xl lg:text-base mx-5">
                    <div className="grid gap-4">
                      <div className="space-y-2 text-center">
                        <h4 className="leading-none text-mainBeige ">Notificações</h4>
                        <p className="text-2xl text-muted-foreground">Você possui notificações novas.</p>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="font-medium col-span-1 text-mainBeige ml-1">Novo</span>
                          <p className="col-span-3">Retorno da vaga "Desenvolvedor"</p>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="font-medium col-span-1 text-mainBeige ml-1">Novo</span>
                          <p className="col-span-3">Retorno da vaga "Designer"</p>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <p className="col-span-6 ml-1">Senha alterada em 26/09/2024. Não foi você? Clique aqui.</p>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <p className="col-span-6 ml-1">Senha alterada em 20/09/2024. Não foi você? Clique aqui.</p>
                        </div>
                        <p className='text-center pt-6 pb-2 text-mainBeige cursor-pointer' onClick={() => goTo(`/Notifications`)}>
                          Ver todas notificações (7)
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </li>

              <li className={`px-8 hover:text-mainBeige cursor-pointer ${isActive('/Profile') ? 'text-mainBeige' : 'text-darkBlueText'}`}>
                <Popover open={profileIsOpenbt} onOpenChange={setProfileIsOpenbt}>
                  <PopoverTrigger asChild>
                    <button>
                      <CircumIcon name="user" size={60} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] text-3xl lg:text-base mx-5">
                    <div className="grid gap-4">
                      <div className="space-y-2 text-center">
                        <h4 className="leading-none text-mainBeige">Perfil</h4>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid-cols-4 text-center gap-4">
                          <p className="col-span-3  text-darkBlueText text-truncate">{auth.user?.name}</p>
                        </div>
                        <div className='flex justify-center items-center w-full'>
                          <img src={testeimg} className='h-48 rounded-full items-center' />
                        </div>
                        <div className="grid-cols-4 items-center gap-4">
                          <p className="col-span-3 text-center">{auth.user?.bio}</p>
                        </div>
                        <p className='text-center pt-6 pb-2 text-mainBeige cursor-pointer' onClick={() => goTo(`/Profile/${auth.user?._id}`)}>
                          Ver seu perfil
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </li>

              <Popover open={chatIsOpenbt} onOpenChange={setChatIsOpenbt}>
                <PopoverTrigger asChild>
                  <button>
                    <li className={`px-8 hover:text-mainBeige cursor-pointer ${isActive('/Chat') ? 'text-mainBeige' : 'text-darkBlueText'}`}>
                      <CircumIcon name="chat_2" size={60} />
                    </li>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] text-3xl lg:text-base mx-5">
                  <div className="grid gap-4">
                    <div className="space-y-2 text-center">
                      <h4 className="leading-none text-mainBeige ">Notificações</h4>
                      <p className="text-2xl text-muted-foreground">Você tem 3 mensagens não lidas.</p>
                    </div>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium col-span-1">Novo</span>
                        <p className="col-span-3">Seu pedido foi enviado</p>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium col-span-1">Novo</span>
                        <p className="col-span-3">Sua senha foi alterada</p>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium col-span-1">Novo</span>
                        <p className="col-span-3">Sua assinatura está prestes a expirar</p>
                      </div>
                      <p className='text-center pt-6 pb-2 text-mainBeige cursor-pointer' onClick={() => goTo(`/Chat`)}>
                        Ver todas conversas
                      </p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover open={exitIsOpenbt} onOpenChange={setExitIsOpenbt}>
                <PopoverTrigger asChild>
                  <button>
                    <li className="px-8 text-darkBlueText hover:text-mainBeige focus:text-mainBeige cursor-pointer">
                      <CircumIcon name="logout" size={60} />
                    </li>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="lg:w-72 w-[400px] text-3xl lg:text-base text-center mx-5">
                  <div className="grid gap-4">
                    <div className="space-y-2 text-center">
                      <h4 className="leading-none text-mainBeige ">Deslogar</h4>
                    </div>
                    <div className="grid gap-2">
                      <div className="items-center gap-4">
                        <p className="col-span-3 text-center text-2xl"> Deseja sair de sua conta?</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => {
                    auth.signout();
                    navigate("/");
                  }} className='uppercase bg-darkBlueText mt-5 px-9 py-2 rounded-md text-white'> Sair </button>
                  <p className='text-center pt-3 pb-2 text-mainBeige cursor-pointer'>
                    Continuar
                  </p>
                </PopoverContent>
              </Popover>
            
            </ul>
          </div>
            <p className='hidden'>Search Bar</p>
          </div>
        </div>
      </div>
    </div>
  );
}
