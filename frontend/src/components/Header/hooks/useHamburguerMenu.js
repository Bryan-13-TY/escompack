import { useEffect, useRef, useState } from 'react';

export function useHamburguerMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toogleMenu = () => {
        setIsOpen(!isOpen);
    };

    // para cerrar el menú hamburguesa
    useEffect(() => {
        // para manejar el clic afuera del menú
        const handleClickOutside = (event) => {
            // si la referecia al menú existe y el clic se dio afuera de este
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        // escuchamos el click si el menú está abierto
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return {
        isOpen,
        menuRef,
        toogleMenu,
    };
}
