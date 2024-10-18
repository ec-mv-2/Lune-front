import React, { useEffect, useState } from 'react';
import { HiArrowUp } from 'react-icons/hi';

export const ScrollUp: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const scroll = () => {
            const currentScrollY = window.scrollY;
            setIsVisible(currentScrollY > 300); 
        };

        window.addEventListener('scroll', scroll);
        return () => window.removeEventListener('scroll', scroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            className={`fixed bottom-6 right-6 transition-opacity duration-400 bg-lightBlueText rounded p-3 text-darkBlueText 
                ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
            onClick={scrollToTop}
        >
            <HiArrowUp size={30} />
        </button>
    );
};
