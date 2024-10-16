import { ReactNode } from "react";
import { Header } from "./Header";

interface PageProps {

    children: ReactNode
    className: string

}

export default function Page(props: PageProps) {

    const baseClassName = `mt-28 w-full `

    const completeClassName = `${baseClassName} ${props.className}`

    return (

        <div className="min-h-screen bg-grey">

            <Header/>
            
            <div className="flex">

                {/* sidebar */}

                <div className={completeClassName}>{props.children}</div>

            </div>

        </div>

    )

}