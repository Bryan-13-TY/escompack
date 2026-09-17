import PropTypes from 'prop-types';

import './ProtocolCard.css';

/**
 * Componente que muestra la tarjeta de un protocolo soportado.
 * 
 * Este componente renderiza una tarjeta para un protocolo soportado.
 * Incluye el icono del protocolo, el acrónimo, el significado de este
 * y la descripción de su función.
 * 
 * El icono del protocolo cambia de acuerdo al tema de la aplicación,
 * por lo que se importa el hook `useTheme` para acceder al tema
 * actual con `const { theme } = useTheme();`.
 * 
 * @component
 * @example
 * 
 * return (
 *  <ProtocolCard
 *      icon='./assets/icons/icon-pim-dark.png'
 *      acronym='PIM'
 *      rep='(Protocol Independent Multicast)'
 *      description='Familia de protocolos de enrutamiento multidifusión.'
 *  />
 * );
 */
function ProtocolCard({ icon, acronym, rep, description }) {
    return (
        <div className='home-protocol-card'>
            <header className='home-protocol-card-header'>
                <img src={icon} alt="" width={60} className='header-icon'/>
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

/** @type {React.FC<any>} */
export default ProtocolCard;
