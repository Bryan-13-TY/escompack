import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

import { useHamburguerMenu } from '../../hooks/useHamburguerMenu';

import './HamburguerMenu.css';

/**
 * Componente que renderiza el menú hamburguesa.
 * 
 * @returns {React.JSX.Element}
 */
function HamburguerMenu() {
    const {isOpen, menuRef, toogleMenu} = useHamburguerMenu();

    return (
        <div ref={menuRef} className='header-hamburguer-menu'>
            <button onClick={toogleMenu} type='button' className='hamburguer-menu-button'>
                <span>
                    <FontAwesomeIcon
                        icon={isOpen ? faXmark : faBars}
                        size='2x'
                    />
                </span>
            </button>
            {isOpen && (
                <nav className='hamburguer-menu-nav'>
                    <ul>
                        <Link to={'/home'}><li>Inicio</li></Link>
                        <Link to={'/capture'}><li>Captura</li></Link>
                        <Link to={'/manipulation'}><li>Manipulación</li></Link>
                    </ul>
                </nav> 
            )}
        </div>
    );
}

export default HamburguerMenu;
