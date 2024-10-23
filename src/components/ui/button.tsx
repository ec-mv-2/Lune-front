import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';

interface ButtonProps {
  variant: 'mainClear' | 'simple' | 'strongBlue' | 'paginationUnset' | 'paginationSet'; 
  leftIcon?: React.ReactNode; 
  rightIcon?: React.ReactNode | null; 
  children: React.ReactNode; 
  onClick: () => void; 
}

const Button: React.FC<ButtonProps> = ({ variant, leftIcon, rightIcon, children, onClick }) => {
  const buttonStyles = {
    mainClear: "border border-lightBlueText text-darkBlueText py-6 w-72 px-10 rounded flex items-center mt-3 justify-between",
    simple: "border border-lightBlueText text-darkBlueText py-5 w-60 rounded flex items-center justify-between mt-3",
    strongBlue: "bg-darkBlueText text-white py-2 px-4 rounded-lg hover:opacity-90 text-sm", 
    paginationUnset: "bg-transparent border border-darkBlueText text-darkBlueText py-2 px-3 rounded-md mx-1 hover:bg-blueText hover:text-white transition duration-200 w-10", 
    paginationSet: "bg-darkBlueText text-white py-2 px-3 rounded-md mx-1 hover:opacity-90 transition  border border-darkBlueText duration-200 w-10" 
  };

  return (
    <button className={buttonStyles[variant]} onClick={onClick}>
      {leftIcon && <span className="mr-2 text-2xl text-lightBlueText px-1">{leftIcon}</span>} 
      <span className={`flex-1 ${!leftIcon && !rightIcon ? 'text-center' : 'text-left'}`}>
        {children}
      </span>
      {rightIcon !== null ? ( 
        rightIcon || <MdKeyboardArrowRight className="ml-2 text-lightBlueText" />
      ) : null} 
    </button>
  );
};

export default Button;
