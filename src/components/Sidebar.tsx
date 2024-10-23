import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
    sidebarIsOpen: boolean;
    closeSidebar: () => void;
}

export function Sidebar({ sidebarIsOpen, closeSidebar }: SidebarProps) {
    const location = useLocation();
    const navigate = useNavigate();

    function goTo(navigateTo: string) {
        window.scrollTo({ top: 0 });
        navigate(navigateTo);
        closeSidebar(); 
    }

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
           
            {sidebarIsOpen && (
                <div 
                    className="fixed inset-0 bg-transparent z-10" 
                    onClick={closeSidebar} 
                />
            )}

            <ul
                className={`absolute top-28 left-0 h-screen w-64 py-48 px-12 bg-whiteLight transition-transform duration-300 ease-in-out z-20 ${
                    sidebarIsOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className={`pl-6 ${isActive('/HomePage') ? 'rounded-full px-24 py-3 my-6 bg-grey' : 'my-6'}`}>
                    <li className="font-light cursor-pointer" onClick={() => goTo('/HomePage')}>
                        Home
                    </li>
                </div>
                <div className={`pl-6 ${isActive('/Positions') ? 'rounded-full px-24 py-3 my-6 bg-grey' : 'my-6'}`}>
                    <li className="font-light cursor-pointer" onClick={() => goTo('/Positions')}>
                        Vagas
                    </li>
                </div>
                <div className={`pl-6 ${isActive('/Settings') ? 'rounded-full pl-4 py-3 my-6 bg-grey' : 'my-6 pl-6'}`}>
                    <li className="font-light cursor-pointer" onClick={() => goTo('/Settings')}>
                        Configurações
                    </li>
                </div>
                <div className={`pl-6 ${isActive('/Help') ? 'rounded-full px-24 py-3 my-6 bg-grey' : 'my-6'}`}>
                    <li className="font-light cursor-pointer" onClick={() => goTo('/Help')}>
                        Ajuda
                    </li>
                </div>
            </ul>
        </>
    );
}
