import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

import { useHamburguerMenu } from '../hooks/useHamburguerMenu';

import './HamburguerMenu.css';

/**
 * Componente que renderiza el menú hamburguesa.
 * 
 * @returns {React.JSX.Element}
 */
function HamburguerMenu() {
    const {isOpen, menuRef, toogleMenu} = useHamburguerMenu();

    return (
        <div ref={menuRef} className='application-hamburguer-menu'>
            {/* Botón para abrir el menú hamburguesa */}
            <button onClick={toogleMenu} type='button' className='application-hamburguer-menu__button'>
                <span>
                    <FontAwesomeIcon
                        icon={isOpen ? faXmark : faBars}
                        size='2x'
                    />
                </span>
            </button>

            {/* Ventana flotante para el navbar del menú hamburguesa */}
            {isOpen && (
                <nav className='application-hamburguer-menu__nav'>
                    <ul>
                        <Link to={'/home'}><li>Inicio</li></Link>
                        <Link to={'/capture'}><li>Capturar</li></Link>
                        <Link to={'/manipulation'}><li>Manipular</li></Link>
                        <Link to={'/manipulation'}><li>Construir topología</li></Link>
                    </ul>
                </nav> 
            )}
        </div>
    );
}

export default HamburguerMenu;
