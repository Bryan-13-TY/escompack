import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ROLE_CONFIGS } from '../constants';

import './Button.css';

/**
 * Componente que muestra un botón personalizado.
 * 
 * Se le puede especificar el texto del botón `buttonText`, el rol
 * `rol` que muestra visualmente su funcionamiento, el tipo del
 * botón `type`, la posición del icono del botón `position`, la
 * función callback `onClick` que se ejecuta al hacer clic en el
 * botón y el estado para habilitar o deshabilitar el botón `disable`.
 * 
 * @component
 * @example
 * return (
 *  <Button
 *      buttonText='Detener captura'
 *      type='button'
 *      rol='stop_capture'
 *      position='before'
 *      onClick={handleStop}
 *      disable={!isCapturing}
 *  />
 * );
 */
function Button({
    buttonText,
    type = 'button',
    rol = 'link',
    position = 'after',
    onClick = () => {},
    disable = false,

}) {
    // Si no se encuentra el 'rol' se usa el rol por defecto
    const config = ROLE_CONFIGS[rol] || ROLE_CONFIGS.link;

    const buttonIcon = (
        <FontAwesomeIcon
            className='custom-btn-icon'
            icon={config.icon}
            size='2x'
        />
    );

    return (
        <button
            onClick={onClick}
            type={type}
            className={config.className}
            disabled={disable}>
            <span>
                {position === 'before' && buttonIcon}
                <p>{buttonText}</p>
                {position === 'after' && buttonIcon}
            </span>
        </button>
    );
}

Button.defaultProps = {
    type: 'button',
    rol: 'link',
    position: 'after',
    onClick: () => {},
    disable: false,   
}

Button.propTypes = {
    /** Texto que se muestra en el botón */
    buttonText: PropTypes.string.isRequired,

    /** Atributo 'type' nativo del botón HTML */
    type: PropTypes.oneOf(['button', 'submit']),

    /** El rol del botón que define el color e icono del mismo */
    rol: PropTypes.oneOf(['link', 'stop_capture', 'start_capture']),

    /** Posición del icono respecto al texto */
    position: PropTypes.oneOf(['before', 'after']),

    /** Función callback que se ejecuta al hacer clic en el botón */
    onClick: PropTypes.func,

    /** Define si el botón se habilita o deshabilita */
    disable: PropTypes.bool,
};

/** @type {React.FC<any>} */
export default Button;
