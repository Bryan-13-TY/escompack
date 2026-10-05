import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ROLE_CONFIGS, ANIMATION_CONFIGS } from '../../constants';

import './Button.css';

/**
 * Componente que renderiza un botón personalizado.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.buttonText - El texto que se muestra en el botón.
 * @param {string} props.type - El tipo del botón.
 * @param {string} props.rol - Estilo visual del botón que indica su uso.
 * @param {string} props.position - Posición del icono del botón.
 * @param {function} props.onClick - Función callback que se ejecuta al hacer clic en el botón.
 * @param {boolean} props.disable - Habilita o deshabilita el botón.
 * @param {string} props.animation - Comportamiento del icono del botón.
 * @param {boolean} props.icon - Se muestra o no el icono del botón.
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
 * @returns {React.JSX.Element}
 */
function Button({
    buttonText,
    type = 'button',
    rol = 'link',
    position = 'after',
    onClick = () => {},
    disable = false,
    animation = 'none',
    icon = true,
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
                {position === 'before' && icon && buttonIcon}
                <p>{buttonText}</p>
                {position === 'after' && icon && buttonIcon}
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
    icon: true,
};

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

    /** Define el comportamiento de la animación del icono */
    animation: PropTypes.oneOf(['none', 'left', 'right']),

    /** Se muestra o no el icono del botón */
    icon: PropTypes.bool,
};

export default Button;
