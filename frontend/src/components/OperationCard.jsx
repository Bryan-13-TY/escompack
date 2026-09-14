import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import Button from './Button';

import './OperationCard.css';

/**
 * Componente que muestra la tarjeta de operación.
 * 
 * Este componente renderiza una tarjeta para alguna de las operaciones
 * principales de la aplicación.
 * 
 * Incluye el icono que representa la operación, el título, descripción
 * el texto del botón incluido y la ruta la que lleva la tarjeta.
 * 
 * @component
 * @example
 * import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
 * 
 * return (
 *  <OperationCard
 *      icon={faMagnifyingGlass}
 *      title='Captura de paquetes'
 *      description='Captura de paquetes en tiempo real.'
 *      buttonText='Ir a Captura'
 *      pageLink='/capture'
 *  /> 
 * );
 */
function OperationCard({
    icon,
    title,
    description,
    buttonText,
    pageLink
}) {
    return (
        <div className="operation-card">
            <div className='operation-card-wrapper'>
                <div className='operation-card-header'>
                    <FontAwesomeIcon className='operation-card-icon' icon={icon} size='2x' />
                    <FontAwesomeIcon className='operation-card-link-icon' icon={faArrowUpRightFromSquare} />
                </div>
                <div className='operation-card-desc'>
                    <p className='card-title'>{title}</p>
                    <p className='card-desc'>{description}</p>
                </div>
                <Link to={pageLink}>
                    <Button
                        buttonText={buttonText}
                        type='button'
                    />
                </Link>
            </div>
        </div>
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

/** @type {React.FC<any>} */
export default OperationCard;
