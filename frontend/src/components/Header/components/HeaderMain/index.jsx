import { Link } from 'react-router-dom';

import escomPackIcon from '../../../../assets/others/icon-v2.png';
import HamburguerMenu from '../HamburguerMenu';

import './index.css';

/**
 * Componente que renderiza el menú principal del header.
 * 
 * @returns {React.JSX.Element}
 */
function HeaderMain() {
    return (
        <header className='header'>
            <div className='header-content'>
                <HamburguerMenu />
                <div className='content-icon'>
                    <Link to={'/home'}>
                        <img src={escomPackIcon} alt="" width={40}/>
                        <div className='icon-label'>
                            <span className='label-escom'>ESCOM</span>
                            <span className='label-pack'>Pack</span>
                        </div>
                    </Link>
                </div>
                <nav className='content-nav'>
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
