import { useInputErrors } from "@/hooks/useInputErrors"
import { InputHTMLAttributes, useState } from "react"

interface inputProps extends InputHTMLAttributes<HTMLInputElement>{
    title: string
}

export function Input({title, ...props}: inputProps){

    const pattern = useInputErrors(title).pattern
    const errorMessage = useInputErrors(title).errorMessage
    const [validatePattern, setValidatePattern] = useState(false)
    if(location.pathname == "/Register"){
        return(
            <div className={`min-w-[40%]`}>
                <div className="flex">
                    <p className=" relative top-2 left-3 px-2 bg-grey text-md rounded-md">{title}</p>
                </div>
                <input {...props} className="border-[1px] peer border-blueText bg-grey rounded-md h-9  w-full focus:outline-none px-3 focus:border-lightBlueText transition-all duration-200 disabled:bg-gray-400 read-only:cursor-not-allowed invalid:border-red-800" onBlur={()=>setValidatePattern(true)} pattern={validatePattern? pattern : ""} required={validatePattern}/>
                <p className="peer-invalid:visible invisible text-red-700">{errorMessage}</p>
            </div>
        )
    }else{
        return(
            <div className={`min-w-[40%]`}>
                <div className="flex">
                    <p className=" relative top-2 left-3 px-2 bg-grey text-md rounded-md">{title}</p>
                </div>
                <input {...props} className="border-[1px] peer border-blueText bg-grey rounded-md h-9 w-full focus:outline-none px-3 py-6 focus:border-lightBlueText transition-all duration-200 disabled:bg-gray-400 read-only:cursor-not-allowed "/>
            </div>
        )
    }
    
}