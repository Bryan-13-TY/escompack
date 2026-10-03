import PropTypes from 'prop-types';

import ProtocolInput from '../../../../../../components/ProtocolInput';
import { PROTOCOLS } from '../../../../../../constants';
import Button from '../../../../../../components/Button';
import { useTheme } from '../../../../../../hooks/ThemeContext';

import './FilterForm.css';

/**
 * Componente que renderiza el formulario para el filtrado de
 * paquetes.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.protocolSelected - Protocolo seleccionado en el formulario.
 * @param {function} props.setProtocolSelected - Función callback que se ejecuta al seleccionar el protocolo.
 * @param {function} props.resetProtocol - Función callback que se ejecuta al resetear el formulario.
 * @param {function} props.getCaptures - Función callback que se ejecuta al enviar el formulario.
 * @returns {React.JSX.Element}
 */
function FilterForm ({
    protocolSelected,
    setProtocolSelected,
    resetProtocol,
    getCaptures,
}) {
    const { theme } = useTheme();

    return (
        <form onSubmit={getCaptures}>
            <fieldset className='form-modal-protocol'>
                <legend>Protocolo de red</legend>
                <div className='modal-protocol-grid'>
                    {PROTOCOLS.map((protocol_input) => (
                        <ProtocolInput
                            key={protocol_input.id}
                            id={protocol_input.id}
                            icon={protocol_input.icon[theme]}
                            label={protocol_input.label}
                            isSelected={protocolSelected === protocol_input.id}
                            onSelect={setProtocolSelected}
                        />
                    ))}
                </div>
            </fieldset>
            <div className='form-modal-date'>
                <div className='date-input'>
                    <label htmlFor='input-captured-date'>Fecha de captura (UTC)</label>
                    <input type='date' name='input-captured-date' id='input-captured-date'/>
                </div>
                <Button
                    buttonText='Limpiar filtro'
                    type='reset'
                    rol='reset_filter'
                    position='before'
                    onClick={resetProtocol}
                />
                <Button
                    buttonText='Aplicar filtro'
                    type='submit'
                    rol='apply_filter'
                    position='before'
                />
            </div>
        </form>
    );
}

FilterForm.propTypes = {
    /** Protocolo seleccionado en el formulario */
    protocolSelected: PropTypes.string.isRequired,

    /** Función callback que se ejecuta al seleccionar el protocolo */
    setProtocolSelected: PropTypes.func.isRequired,
    
    /** Función callback que se ejecuta al resetear el formulario */
    resetProtocol: PropTypes.func.isRequired,

    /** Función callback que se ejecuta al enviar el formulario */
    getCaptures: PropTypes.func.isRequired,
}

export default FilterForm;
