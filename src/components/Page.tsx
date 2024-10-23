
import { ReactNode, useState } from "react"; 
import { Header } from "./Header"; 
import { Sidebar } from "./Sidebar"; 

interface PageProps { 
    children: ReactNode; 
    className: string; 
}

export default function Page(props: PageProps) { 
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false); 
    const baseClassName = `mt-28 w-full transition-transform duration-300`; 
    const completeClassName = `${baseClassName} ${props.className} ${sidebarIsOpen ? '' : ''}`; 

    return ( 
        <div className="min-h-screen  bg-grey flex"> 
            <Header /> 
            <Sidebar sidebarIsOpen={sidebarIsOpen} closeSidebar={() => setSidebarIsOpen(false)} /> 
            <div className={`${completeClassName} `}>{props.children}</div> 
        </div> 
    ); 
} 
