import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faClock } from '@fortawesome/free-solid-svg-icons';

import Button from '../../../../../../components/Button';

import './FilterResults.css';

/**
 * Componente que renderiza una de las capturas encontradas después
 * de aplicar el filtro.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.filename - Nombre del archivo de la captura.
 * @param {string} props.filepath - Ruta en donde se guardo el archivo de la captura.
 * @param {string} props.protocol - Protocolo de los paquetes de la captura.
 * @param {number} props.packet_count - Número de paquetes capturados.
 * @param {string} props.captured_at - Fecha en la que se hizo la captura.
 * @returns {React.JSX.Element}
 */
function FilterResults ({
    filename,
    filepath,
    protocol,
    packet_count,
    captured_at,
}) {
    return (
        <div className='results-information'>
            {/* información de la captura */}
            <div className='information'>
                {/* icono de archivo */}
                <FontAwesomeIcon icon={faFileLines} size='2x' className='information-file-icon'/>
                {/* iformación de la captura */}
                <div className='information-details'>
                    <div className='details-filename'>
                        <p className='filename'>{filename}</p>
                        <div className='filename-label'>
                            <span className='protocol'>{protocol}</span>
                            <p className='packet-count'>{packet_count} paquetes</p>
                        </div>
                    </div>
                    <p className='details-path'>{filepath}</p>
                    <div className='details-date'>
                        <FontAwesomeIcon icon={faClock} size='1x'/>
                        <p>{captured_at}</p>
                    </div>
                </div>
            </div>
            {/* botones */}
            <Button
                buttonText='Cargar para manipular'
                type='button'
                rol='load_capture'
                position='before'
            />
        </div>
    );
}

FilterResults.propTypes = {
    /** Nombre del archivo de la captura */
    filename: PropTypes.string.isRequired,

    /** Ruta en donde se guardo el archivo de la captura */
    filepath: PropTypes.string.isRequired,

    /** Protocolo de los paquetes de la captura */
    protocol: PropTypes.string.isRequired,

    /** Número de paquetes capturados */
    packet_count: PropTypes.number.isRequired,

    /** Fecha en la que se hizo la captura */
    captured_at: PropTypes.string.isRequired,
};

export default FilterResults;
