import PropTypes from 'prop-types';

import FilterModalHeader from './components/FilterModalHeader';
import FilterForm from './components/FilterForm';
import FilterResults from './components/FilterResults';
import FilterNoResults from './components/FilterNoResults';
import Filterlabel from './components/FilterLabel';
import { usePackageManipulation } from '../../hooks/usePackageManipulation';

import './ManipulationModal.css';

/**
 * Componente que renderiza la ventana modal para el filtro de paquetes
 * de la vista de manipulación de paquetes.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {function} props.onClick - Función callback que se ejecuta al hacer clic en el botón. 
 * @returns {React.JSX.Element}
 */
function FilterModal({ onClick }) {
    const {
        protocolSelected,
        setProtocolSelected,
        resetProtocol,
        getCaptures,
        captures,
        capturedDate,
        capturedProtocol,
        hasSearched,
    } = usePackageManipulation();

    return (
        <div className='manipulation-blur'>
            <div className='manipulation-modal'>
                <FilterModalHeader onClick={onClick}/>
                <div className='manipulation-form'>
                    <FilterForm
                        protocolSelected={protocolSelected}
                        setProtocolSelected={setProtocolSelected}
                        resetProtocol={resetProtocol}
                        getCaptures={getCaptures}
                    />
                </div>
                {hasSearched && captures.length > 0 && (
                    <>
                        <div className='manipulation-label'>
                            <Filterlabel
                                results={captures.length}
                                protocol={capturedProtocol ? capturedProtocol.toUpperCase() : ''}
                                date={capturedDate}
                            />
                        </div>
                        <div className='manipulation-results'>
                            <div className='results-scroll'>
                                {captures.map((capture) => (
                                    <FilterResults
                                        key={capture.captured_at}
                                        filename={capture.filename}
                                        filepath={capture.filepath}
                                        protocol={capture.protocol.toUpperCase()}
                                        packet_count={capture.packet_count}
                                        captured_at={capture.captured_at}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}
                {hasSearched && captures.length === 0 && (
                    <FilterNoResults />
                )}
            </div>
        </div>
    );
}

FilterModal.propTypes = {
    /** Función callback que ejecuta al jacer clic en el botón */
    onClick: PropTypes.func.isRequired,
}

export default FilterModal;
