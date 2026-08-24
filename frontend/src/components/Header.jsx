import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { useTheme } from '../ThemeContext';
import escomPackIcon from '../assets/others/icon-v2.png'
import { THEME_MODE_ICON } from '../constants';

import './Header.css';

const HamburguerMenu = () => {
    return (
        <button type='button' className='hamburguer-menu-button'>
            <span>
                <FontAwesomeIcon
                    icon={faBars}
                    size='2x'
                />
            </span>
        </button>
    )
}

const ThemeModeButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} type='button' className='theme-mode-button'>
            <span>
                <FontAwesomeIcon
                    className='theme-mode-icon'
                    icon={THEME_MODE_ICON[theme]}
                    size='2x'
                />
            </span>
        </button>
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
                                        <hr />
                                    </Link>
                                    <Link to={'/capture'}>
                                        <li className='nav-element'>Captura</li>
                                        <hr />
                                    </Link>
                                    <Link to={'/manipulation'}>
                                        <li className='nav-element'>Manipulación</li>
                                        <hr />
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
