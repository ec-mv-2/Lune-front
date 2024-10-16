import { InputHTMLAttributes } from "react"

interface inputProps extends InputHTMLAttributes<HTMLInputElement>{
    title: string
}

export function Input({title, ...props}: inputProps){
    return(
        <div className={`min-w-[40%]`}>
            <div className="flex">
                <p className=" relative top-2 left-3 px-2 bg-whiteLight text-sm">{title}</p>
            </div>   
            <input {...props} className="border-[1px] border-blueText bg-whiteLight rounded-md h-9 w-full focus:outline-none px-3 focus:border-lightBlueText transition-all duration-200" />
        </div>
    )
}