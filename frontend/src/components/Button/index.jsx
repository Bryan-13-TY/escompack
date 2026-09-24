import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ROLE_CONFIGS, ANIMATION_CONFIGS } from '../../constants';

import './Button.css';

/**
 * Componente que muestra un botón personalizado.
 * 
 * - `buttonText` el texto qye se muestra en el botón.
 * - `type` el tipo del botón.
 * - `rol` estilo del botón que indica su uso.
 * - `position` posición del icono del botón.
 * - `onClick` función callback que se ejecuta al hacer clic en el
 * botón.
 * - `disable` habilita o deshabilita el botón.
 * - `animation` comportamiento del icono del botón. 
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
 *      animation='left'
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
    animation = 'none',
}) {
    // Si no se encuentra el 'rol' se usa el rol por defecto
    const config = ROLE_CONFIGS[rol] || ROLE_CONFIGS.link;
    const animateIcon = ANIMATION_CONFIGS[animation] || ANIMATION_CONFIGS.none;

    const buttonIcon = (
        <FontAwesomeIcon
            className={`${animateIcon.className} ${animateIcon.direction}`}
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
    animation: 'none',
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

    /* Define el comportamiento de la animación del icono */
    animation: PropTypes.oneOf(['none', 'left', 'right']),
};

/** @type {React.FC<any>} */
export default Button;
