import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';

interface ButtonProps {
  variant: 'mainClear' | 'simple' | 'strongBlue' | 'paginationUnset' | 'paginationSet' | 'mediumSizeDark' | 'mediumSizeLight'; 
  leftIcon?: React.ReactNode; 
  rightIcon?: React.ReactNode | null; 
  children: React.ReactNode; 
  onClick: () => void; 
  type?: 'button' | 'submit' | 'reset'; 
}

const Button: React.FC<ButtonProps> = ({ type = 'button', variant, leftIcon, rightIcon, children, onClick }) => {
  const buttonStyles = {
    mainClear: "border border-lightBlueText text-darkBlueText py-10 lg:py-5 text-2xl lg:text-base w-96 lg:w-72 px-14 rounded flex items-center mt-3 justify-between",
    simple: "border border-lightBlueText text-darkBlueText py-10 lg:py-5 w-96 pl-5 lg:w-60 rounded flex items-center justify-between mt-3 text-2xl lg:text-base ",
    strongBlue: "bg-darkBlueText text-white py-2 px-4 rounded hover:opacity-90 lg:text-sm", 
    paginationUnset: "bg-transparent border border-darkBlueText text-darkBlueText py-2 px-3 rounded-md mx-1 hover:bg-blueText hover:text-white transition duration-200 w-10", 
    paginationSet: "bg-darkBlueText text-white py-2 px-3 rounded-md mx-1 hover:opacity-90 transition  border border-darkBlueText duration-200 w-10 " ,
    mediumSizeDark:"border border-lightBlueText bg-darkBlueText text-white py-3 w-44 rounded flex items-center justify-between mt-3 text-2xl lg:text-base",
    mediumSizeLight:'border border-lightBlueText text-darkBlueText py-3 w-44 rounded flex items-center justify-between mt-3 text-2xl lg:text-base',
  };

  return (
    <button type={type} className={buttonStyles[variant]} onClick={onClick}>
      {leftIcon && <span className="mr-2 text-4xl lg:text-2xl text-lightBlueText px-2">{leftIcon}</span>} 
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
