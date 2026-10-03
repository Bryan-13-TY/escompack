import PropTypes from 'prop-types';

import './ProtocolCard.css';

/**
 * Componente que renderiza una tarjeta de uno de los protocolos
 * soportados por la aplicación
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.icon - Imagen del icono del protocolo.
 * @param {string} props.acronym - Acrónimo oficial del protocolo.
 * @param {string} props.rep - Significado del acrónimo.
 * @param {string} props.description - Explicación sobre el propósito del protocolo.
 * @example
 * return (
 *  <ProtocolCard
 *      icon='./assets/icons/icon-pim-dark.png'
 *      acronym='PIM'
 *      rep='(Protocol Independent Multicast)'
 *      description='Familia de protocolos de enrutamiento multidifusión.'
 *  />
 * );
 * @returns {React.JSX.Element}
 */
function ProtocolCard({ icon, acronym, rep, description, }) {
    return (
        <div className='home-protocol-card'>
            <header className='home-protocol-card-header'>
                <img src={icon} alt='' width={60} className='header-icon'/>
                <div className='header-label'>
                    <p className='label-acronym'>{acronym}</p>
                    <span className='label-acronym-rep'>{rep}</span>
                </div>
            </header>
            <p className='home-protocol-card-description'>{description}</p>
        </div>
    );
}

ProtocolCard.propTypes = {
    /** Icono de la tarjeta */
    icon: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
    ]).isRequired,

    /** Acrónimo del protocolo */
    acronym: PropTypes.string.isRequired,

    /** Significado del acrónimo del protocolo */
    rep: PropTypes.string.isRequired,

    /** Descripción del protocolo */
    description: PropTypes.string.isRequired,
};

export default ProtocolCard;
