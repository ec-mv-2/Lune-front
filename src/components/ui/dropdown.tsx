import { useState } from 'react';

import { MdArrowDropDown } from "react-icons/md";


import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
} from "@radix-ui/react-select";

interface DropdownProps {
    onChange: (value: string) => void;
}



export function Dropdown({ onChange }: DropdownProps) {
    const [selectedOrder, setSelectedOrder] = useState<string>('Mais relevante');



    const orderChange = (value: string) => {
        setSelectedOrder(value);
        if (onChange) onChange(value);
        const activeElement = document.activeElement as HTMLElement;
        activeElement.blur();
    };

    return (
        <div className="flex text-left items-center justify-center text-2xl lg:text-base">
            <p className="mr-2 text-darkBlueText">Ordenar por:</p>
            <div className='text-left'>
                <Select onValueChange={orderChange} value={selectedOrder}>
                    <SelectTrigger className="flex items-center justify-between ">
                        <span className="text-mainBeige px-3">{selectedOrder}</span>
                        <MdArrowDropDown className='text-mainBeige' />

                    </SelectTrigger>
                    <SelectContent className='bg-grey rounded-b-sm py-2 px-5 shadow-md'>
                        <SelectItem value="Mais relevante" className={`cursor-pointer text-${selectedOrder === 'Mais relevante' ? 'mainBeige' : 'darkBlueText'}`}>
                            Mais relevante
                        </SelectItem>
                        <SelectItem value="Mais recente" className={`cursor-pointer text-${selectedOrder === 'Mais recente' ? 'mainBeige' : 'darkBlueText'}`}>
                            Mais recente
                        </SelectItem>
                        <SelectItem value="Mais antigo" className={`cursor-pointer text-${selectedOrder === 'Mais antigo' ? 'mainBeige' : 'darkBlueText'}`}>
                            Mais antigo
                        </SelectItem>
                    </SelectContent>

                </Select>
            </div>
        </div>
    );
}
