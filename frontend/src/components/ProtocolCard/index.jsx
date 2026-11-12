import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import gns3 from '../../assets/icons/icon-gns3.png';
import './index.css';

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
function ProtocolCard({ icon, acronym, rep, description, layer, layer_icon}) {
    return (
        <div className='home-protocol-card'>
            <header className='home-protocol-card-header'>
                <img src={icon} alt='' width={60} className='header-icon'/>
                <div className='header-label'>
                    <p className='label-acronym'>{acronym}</p>
                    <span className='label-acronym-rep'>{rep}</span>
                </div>
            </header>
            <div className='home-protocol-card-content'>
                <p className='home-protocol-card-description'>{description}</p>
                <div className='protocol-topology'>
                    <div className='topology-image'>
                        <FontAwesomeIcon className='see-topology' icon={faEye} />
                        <span>Ver topología de red</span>
                    </div>
                    <img src={gns3} alt='' width={50} className='gns3-icon'/>
                </div>
            </div>
            <footer className='home-protocol-card-footer'>
                <FontAwesomeIcon className='header-layer-icon' icon={layer_icon} />
                <span>{layer}</span>
            </footer>
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
