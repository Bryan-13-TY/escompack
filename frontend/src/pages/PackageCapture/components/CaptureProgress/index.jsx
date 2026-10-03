import PropTypes from 'prop-types';

import './CaptureProgress.css';

/**
 * Componente que rederiza la barra de progreso de la captura de 
 * paquetes.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {number} props.capturedCount - Paquetes capturados.
 * @param {number} props.totalPackets - Total de paquetes a capturar.
 * @param {number} props.percentage - Porcentaje de paquetes capturados.
 * @param {string} props.networkInterface - Interfaz por donde se hace la captura.
 * @returns {React.JSX.Element}
 */
function CaptureProgress({
    capturedCount,
    totalPackets,
    percentaje,
    networkInterface = 'enp0s8',
}) {
    return (
        <div className='form-capture-progress'>
            <header className='progress-header'>
                <p className='header-label'>Proceso de captura</p>
                <span className='header-percentage'>{percentaje}%</span>
            </header>
            <div className='progress-capture'>
                <div className='capture-bar' style={{ width: `${percentaje}%`}}></div>
            </div>
            <footer className='progress-footer'>
                <p className='footer-total-packets'>{capturedCount} / {totalPackets} paquetes</p>
                <span className='footer-interface'>Interfaz: {networkInterface}</span>
            </footer>
        </div>
    );
}

CaptureProgress.defaultProps = {
    networkInterface: 'enp0s8',
};

CaptureProgress.propTypes = {
    /** Paquetes capturados */
    capturedCount: PropTypes.number.isRequired,

    /** Total de paquetes a capturar */
    totalPackets: PropTypes.number.isRequired,

    /** Porcentaje de paquetes capturados */
    percentage: PropTypes.number.isRequired,

    /** Interfaz por donde se hace la captura */
    networkInterface: PropTypes.string.isRequired,
};

export default CaptureProgress;
