import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation} from 'react-router-dom';
import CircumIcon from '@klarr-agency/circum-icons-react'
import { RxHamburgerMenu } from "react-icons/rx";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import logo from "../assets/Logo.png"
import testeimg from "../assets/unnamed.png"
import { AuthContext } from '@/contexts/AuthContext';


export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [notificationIsOpen, setNotificationIsOpen] = useState(false)
  const [profileIsOpen, setProfileIsOpen] = useState(false)
  const [chatIsOpen, setChatIsOpen] = useState(false)
  const [exitIsOpen, setExitIsOpen] = useState(false)
  const [sidebarIsOpen, setSidebarisOpen] = useState(false)
  const auth = useContext(AuthContext)

  function goTo(navigateTo: string) {
    window.scrollTo({
      top: 0,
    })
    navigate(navigateTo)
  }
  const isActive = (path: string) => location.pathname === path;

  return (
    <div>
      <div className="bg-whiteLight fixed w-full z-10">
        <div className="pb-1">
          <div className="flex items-center justify-between px-6 h-28 " >
            <button
              className='text-darkBlueText hover:text-mainBeige focus:outline-none mt-4'
              onClick={() => setSidebarisOpen (!sidebarIsOpen) }>
              <RxHamburgerMenu />
            </button>
            <img
              src={logo}
              onClick={() => goTo(`/HomePage`)}
              className="h-20 mt-8 ml-4 cursor-pointer"
              alt="Logo do site Lune, com fonte azul e uma pequena lua dourada acima da letra U"
            />


            <ul className="flex gap-4 justify-center flex-grow ">
              <li className={`px-4  hover:text-mainBeige cursor-pointer ${isActive('/Notifications') ? 'text-mainBeige' : 'text-darkBlueText'}`}>

                <Popover open={notificationIsOpen} onOpenChange={setNotificationIsOpen}>
                  <PopoverTrigger asChild>
                    <button>
                      <CircumIcon name="bell_on" size={40} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72">
                    <div className="grid gap-4">
                      <div className="space-y-2 text-center">
                        <h4 className="leading-none text-mainBeige text-xl">Notificações</h4>
                        <p className="text-sm text-muted-foreground">Você possui notificações novas.</p>
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
                        <p className='text-center pt-6 pb-2 text-mainBeige cursor-pointer' onClick={()=> goTo (`/Notifications`)}>
                          Ver todas notificações (7)
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </li>


              <li className={`px-4  hover:text-mainBeige cursor-pointer ${isActive('/Profile') ? 'text-mainBeige' : 'text-darkBlueText'}`}>
                <Popover open={profileIsOpen} onOpenChange={setProfileIsOpen}>
                  <PopoverTrigger asChild>
                    <button>
                      <CircumIcon name="user" size={40} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72">
                    <div className="grid gap-4">
                      <div className="space-y-2 text-center">
                        <h4 className="leading-none text-mainBeige text-xl">Perfil</h4>

                      </div>
                      <div className="grid gap-2">
                        <div className="grid-cols-4 text-center gap-4">

                          <p className="col-span-3 text-xl text-darkBlueText">{auth.user?.name}</p>
                        </div>
                        <div className='flex justify-center items-center w-full'>
                          <img src={testeimg}
                            className='h-48 rounded-full items-center'
                          />
                        </div>

                        <div className="grid-cols-4 items-center gap-4">

                          <p className="col-span-3 text-center">{auth.user?.bio}</p>
                        </div>
                        <p className='text-center pt-6 pb-2 text-mainBeige cursor-pointer' onClick={()=> goTo (`/Profile/${auth.user?._id}`)}>
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
                    <li className={`px-4  hover:text-mainBeige cursor-pointer ${isActive('/Chat') ? 'text-mainBeige' : 'text-darkBlueText'}`}>
                      <CircumIcon name="chat_2" size={42} />
                    </li>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-72">
                  <div className="grid gap-4">
                    <div className="space-y-2 text-center">
                      <h4 className="leading-none text-mainBeige text-xl">Notifications</h4>
                      <p className="text-sm text-muted-foreground">You have 3 unread messages.</p>
                    </div>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium col-span-1">New</span>
                        <p className="col-span-3">Your order has been shipped</p>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium col-span-1">New</span>
                        <p className="col-span-3">Your password was changed</p>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium col-span-1">New</span>
                        <p className="col-span-3">Your subscription is expiring soon</p>
                      </div>
                      <p className='text-center pt-6 pb-2 text-mainBeige cursor-pointer' onClick={()=> goTo (`/Chat`)}>
                        Ver todas conversas
                      </p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover open={exitIsOpen} onOpenChange={setExitIsOpen}>
                <PopoverTrigger asChild>
                  <button >
                    <li className="px-4 text-darkBlueText hover:text-mainBeige focus:text-mainBeige cursor-pointer">
                      <CircumIcon name="logout" size={40} />
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
                  <button onClick={()=>{
                    auth.signout()
                    navigate("/")

                    }} className='uppercase bg-darkBlueText mt-5  px-9 py-2 rounded-md text-white'> Sair </button>
                  <p className='text-center pt-3 pb-2 text-mainBeige cursor-pointer'>
                    Continuar
                  </p>
                </PopoverContent>
              </Popover>


            </ul>
            <div className="ml-auto mr-12">Search Bar</div>
          </div>
        </div>

      </div>

      <ul
        className={`fixed top-0 left-0 h-screen w-64 py-48 px-12 bg-whiteLight transition-transform duration-300 ease-in-out z-0 ${
          sidebarIsOpen ? 'translate-x-0' : '-translate-x-full'

          }`}

      >

       

        <div className={`pl-6  ${isActive('/HomePage') ? ' rounded-full px-24  py-3 my-6 bg-grey ' : 'my-6'}`}>
          <li className="font-light cursor-pointer" onClick={() => goTo(`/HomePage`)}>
            Home
          </li>
        </div>
        <div className={` pl-6  ${isActive('/Positions') ? ' rounded-full  px-24   py-3 my-6 bg-grey ' : 'my-6'}`}>
          <li className="font-light cursor-pointer " onClick={() => goTo(`/Positions`)}>Vagas</li>
        </div>

        <div className={`   ${isActive('/Settings') ? ' rounded-full pl-4  py-3 my-6 bg-grey ' : 'my-6 pl-6'}`}>
          <li className="font-light cursor-pointer " onClick={() => goTo(`/Settings`)}>Configurações</li>
        </div>
        <div className={` pl-6  ${isActive('/Help') ? ' rounded-full px-24 py-3 my-6 bg-grey' : 'my-6 '}`}>
          <li className="font-light cursor-pointer " onClick={() => goTo(`/Help`)}>Ajuda</li>
        </div>
      </ul>
    </div>
  )
}