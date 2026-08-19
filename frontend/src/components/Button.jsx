import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ROLE_CONFIGS } from '../constants';

import './Button.css';

export function Button({
    buttonText,
    type = 'button',
    rol = 'link',
    position = 'after'
}) {
    // si no se encuentra el 'rol' se usa el rol por defecto
    const config = ROLE_CONFIGS[rol] || ROLE_CONFIGS.link;

    const buttonIcon = (
        <FontAwesomeIcon
            className='custom-btn-icon'
            icon={config.icon}
            size='2x'
        />
    );

    return (
        <button type={type} className={config.className}>
            <span>
                {position === 'before' && buttonIcon}
                <p>{buttonText}</p>
                {position === 'after' && buttonIcon}
            </span>
        </button>
    );
}

Button.propTypes = {
    /** Texto que se muestra dentro del botón (Obligatorio) */
    buttonText: PropTypes.string.isRequired,

    /** Atributo 'type' nativo del botón HTML */
    type: PropTypes.oneOf(['button', 'submit']),

    /** El rol del botón que define color e icono */
    rol: PropTypes.oneOf(['link', 'stop_capture', 'start_capture']),

    /** Posición del icono respecto al texto */
    position: PropTypes.oneOf(['before', 'after']),
};
