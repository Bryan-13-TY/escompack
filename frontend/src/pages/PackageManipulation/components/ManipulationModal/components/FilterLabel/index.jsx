import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollHorizontal } from '@fortawesome/free-solid-svg-icons';

import './FilterLabel.css';

/**
 * Componente que renderiza el label del formulario para el filtrado de
 * paquetes que muestra un resumen del resultado del filtrado.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {number} props.results - Número de resultados encontrados tras el filtro.
 * @param {string} props.protocol - Protocolo seleccionado en el filtro.
 * @param {string} props.date - Fecha seleccionada en el filtro.
 * @returns {React.JSX.Element}
 */
function FilterLabel({ results, protocol, date, }) {
    const protocolIsEmpty = !protocol || protocol.trim() === '';
    const dateIsEmpty = !date || date.trim() === '';

    return (
       <div className='label-information'>
            <FontAwesomeIcon icon={faSquarePollHorizontal} size='1x' className='information-results-icon' />
            <div className='results'>
                <p>{results} capturas encontradas para</p>
                <p>
                    {!protocolIsEmpty && (
                        <span>{protocol} </span>
                    )}
                    {!dateIsEmpty && (
                        <span>{`(${date})`}</span>
                    )}
                </p>
            </div>
        </div>
    );
}

FilterLabel.propTypes = {
    /** Número de resultados encontrados tras el filtro */
    results: PropTypes.number.isRequired,

    /** Protocolo seleccionado en el filtro */
    protocol: PropTypes.string.isRequired,

    /** Fecha seleccionada en el filtro */
    date: PropTypes.string.isRequired,
};

export default FilterLabel;
