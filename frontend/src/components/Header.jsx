import { useEffect, useRef, useState} from 'react';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

import { useTheme } from '../hooks/ThemeContext';
import escomPackIcon from '../assets/others/icon-v2.png'
import { THEME_MODE_ICON } from '../constants';

import './Header.css';

const HamburguerMenu = () => {
    // estado para saber si el menú hamburguesa esta abierto
    const [isOpen, setIsOpen] = useState(false);
    // referencia al menú hamburguesa
    const menuRef = useRef(null);

    const toogleMenu = () => {
        setIsOpen(!isOpen);
    };

    // se ejecuta cada que cambiar el valor de 'isOpen'
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


    return (
        <div ref={menuRef} className='hamburguer-menu-wrapper'>
            <button onClick={toogleMenu} type='button' className='hamburguer-menu-button'>
                <span>
                    <FontAwesomeIcon
                        icon={isOpen ? faXmark : faBars}
                        size='2x'
                    />
                </span>
            </button>
                {isOpen && (
                    <div className='nav-menu-wrapper'>
                        <nav>
                            <ul>
                                <Link to={'/home'}>
                                    <li className='nav-menu-element'>Inicio</li>
                                </Link>
                                <Link to={'/capture'}>
                                    <li className='nav-menu-element'>Captura</li>
                                </Link>
                                <Link to={'/manipulation'}>
                                    <li className='nav-menu-element'>Manipulación</li>
                                </Link>
                            </ul>
                        </nav>
                    </div>
                )}
        </div>
    );
};

const ThemeModeButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className='mode-button-wrapper'>
            <button onClick={toggleTheme} type='button' className='theme-mode-button'>
                <span>
                    <FontAwesomeIcon
                        className='theme-mode-icon'
                        icon={THEME_MODE_ICON[theme]}
                        size='2x'
                    />
                </span>
            </button>
        </div>
    );
};

/**
 * Componente que muestra el **header** de la aplicación.
 * 
 * @component 
 */
function Header() {
    return (
        <header>
            <div className='header-wrapper'>
                <div className='header-content'>
                    <div className='header-nav'>
                        <HamburguerMenu />
                        <div className='header-icon'>
                            <Link to={'/home'}>
                                <div className='header-image'>
                                    <img src={escomPackIcon} alt='ESCOMPack icon' width={50} />
                                </div>
                                <div className='header-image-desc'>
                                    <span className='desc-escom'>ESCOM</span>
                                    <span className='desc-pack'>Pack</span>
                                </div>
                            </Link>
                        </div>
                        <div className='nav-wrapper'>
                            <nav>
                                <ul>
                                    <Link to={'/home'}>
                                        <li className='nav-element'>Inicio</li>
                                        {/*<hr />*/}
                                    </Link>
                                    <Link to={'/capture'}>
                                        <li className='nav-element'>Captura</li>
                                        {/*<hr />*/}
                                    </Link>
                                    <Link to={'/manipulation'}>
                                        <li className='nav-element'>Manipulación</li>
                                        {/*<hr />*/}
                                    </Link>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <ThemeModeButton />
                </div>
            </div>
        </header>
    );
}

export default Header;
