import { Link } from 'react-router-dom';

import escomPackIcon from '../../../assets/others/icon-v2.png';
import HamburguerMenu from './HamburguerMenu';

import './HeaderMain.css';

/**
 * Componente que renderiza el menú principal del header.
 * 
 * @returns {React.JSX.Element}
 */
function HeaderMain() {
    return (
        <header className='application-header'>
            <div className='application-header__content'>
                <HamburguerMenu />
                
                {/* Icono de la aplicación */}
                <div className='application-icon'>
                    <Link to={'/home'}>
                        <img src={escomPackIcon} alt="Icono de ESCOMPack" width={40}/>
                        <div className='icon-label'>
                            <span className='icon-label__escom'>ESCOM</span>
                            <span className='icon-label__pack'>Pack</span>
                        </div>
                    </Link>
                </div>

                {/* Nabvar de la aplicación */}
                <nav className='application-nav'>
                    <ul>
                        <Link to={'/home'}><li>Inicio</li></Link>
                        <Link to={'/capture'}><li>Capturar</li></Link>
                        <Link to={'/manipulation'}><li>Manipular</li></Link>
                        <Link to={'/manipulation'}><li>Construir topología</li></Link>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default HeaderMain;
