import { useInputErrors } from "@/hooks/useInputErrors";
import { InputHTMLAttributes, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

export function Input({ title, ...props }: InputProps) {
  const { pattern, errorMessage } = useInputErrors(title);
  const [validatePattern, setValidatePattern] = useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setValidatePattern(true);
    if (pattern && !new RegExp(pattern).test(e.target.value)) {
      e.target.setCustomValidity(errorMessage);
    } else {
      e.target.setCustomValidity("");
    }
  
    e.target.reportValidity();
  };

  if (location.pathname === "/Register/false" || location.pathname === "/Register/true") {
    return (
      <div className="min-w-[40%]">
        <div className="flex">
          <p className="relative top-2 left-3 px-2 bg-whiteLight text-md rounded-md">{title}</p>
        </div>
        <input
          {...props}
          className="border-[1px] peer border-blueText bg-whiteLight rounded-md h-9 w-full focus:outline-none px-3 focus:border-lightBlueText transition-all duration-200 py-6 disabled:bg-gray-400 read-only:cursor-not-allowed invalid:border-red-800"
          onBlur={handleBlur}
          pattern={validatePattern ? pattern : ""}
          required={validatePattern}
        />
        <p className="peer-invalid:visible invisible text-red-700">{errorMessage}</p>
      </div>
    );
  } else {
    return (
      <div className="min-w-[40%]">
        <div className="flex">
          <p className="relative top-2 left-3 px-2 bg-whiteLight text-md rounded-md">{title}</p>
        </div>
        <input
          {...props}
          className="border-[1px] peer border-blueText bg-whiteLight rounded-md h-9 w-full focus:outline-none px-3 py-6 focus:border-lightBlueText transition-all duration-200 disabled:bg-gray-400 read-only:cursor-not-allowed"
        />
      </div>
    );
  }
}
