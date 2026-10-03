import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import './OperationCard.css';

/**
 * Icono de FontAwesome
 * @typedef {import('../../constants.types').IconDefinition} IconDefinition
 */

/**
 * Componente que renderiza una de las tarjetas de las operaciones
 * principales de la aplicación.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {IconDefinition} props.icon - Icono FontAwesome de la tarjeta. 
 * @param {string} props.title - Título de la tarjeta.
 * @param {string} props.description - Descripción de la tarjeta.
 * @param {string} props.pageLink - URL a la que lleva la tarjeta
 * @example
 * import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
 * 
 * return (
 *  <OperationCard
 *      icon={faMagnifyingGlass}
 *      title='Captura de paquetes'
 *      description='Captura de paquetes en tiempo real.'
 *      pageLink='/capture'
 *  /> 
 * );
 * @returns {React.JSX.Element}
 */
function OperationCard({
    icon,
    title,
    description,
    pageLink,
}) {
    return (
        <Link className='home-operation-card' to={pageLink}>
            <header className='home-operation-card-header'>
                <FontAwesomeIcon className='header-icon' icon={icon} size='2x' />
                <FontAwesomeIcon className='header-expand-icon' icon={faArrowUpRightFromSquare} />
            </header>
            <div className='home-operation-card-content'>
                <p className='content-title'>{title}</p>
                <p className='content-description'>{description}</p>
            </div>
        </Link>
    );
}

OperationCard.propTypes = {
    /** Icono de la tarjeta */
    icon: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
        PropTypes.string,
    ]).isRequired,

    /** Título que indica la función de la tarjeta */
    title: PropTypes.string.isRequired,

    /** Descripción pequeña de la función de la tarjeta */
    description: PropTypes.string.isRequired,

    /** Texto que se muestra en el botón incluido */
    buttonText: PropTypes.string.isRequired,

    /** Ruta a la que nos dirige el botón al dar clic */
    pageLink: PropTypes.string.isRequired,
};

export default OperationCard;
