import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import escomPackIcon from '../../../../assets/others/icon-v2.png';
import { useTheme } from '../../../../hooks/ThemeContext';
import HamburguerMenu from '../HamburguerMenu';
import { THEME_MODE_ICON } from '../../../../constants';

import './HeaderMain.css';

const ThemeButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} type='button' className='header-theme-button'>
            <span>
                <FontAwesomeIcon
                    className='theme-button-icon'
                    icon={THEME_MODE_ICON[theme]}
                    size='2x'
                />
            </span>
        </button>
    );
};

function HeaderMain() {
    return (
        <header className='header'>
            <div className='header-content'>
                <HamburguerMenu />
                <div className='content-icon'>
                    <Link to={'/home'}>
                        <img src={escomPackIcon} alt="" width={50}/>
                        <div className='icon-label'>
                            <span className='label-escom'>ESCOM</span>
                            <span className='label-pack'>Pack</span>
                        </div>
                    </Link>
                </div>
                <nav className='content-nav'>
                    <ul>
                        <Link to={'/home'}><li>Inicio</li></Link>
                        <Link to={'/capture'}><li>Captura</li></Link>
                        <Link to={'/manipulation'}><li>Manipulación</li></Link>
                    </ul>
                </nav>
            </div>
            <ThemeButton />
        </header>
    );
}

export default HeaderMain;
