import PropTypes from "prop-types";

import { useTheme } from "../../../../hooks/ThemeContext";
import { PROTOCOLS } from "../../../../constants";
import Button from '../../../../components/Button';
import ProtocolInput from '../../../../components/ProtocolInput';

import './CaptureForm.css';

/**
 * Componente que renderiza el formulario para la captura de paquetes
 * de red.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {function} props.onSubmit - Función que se ejecuta al enviar el formulario.
 * @param {function} props.onStop - Función callback que se ejecuta al hacer clic en el botón de detener la captura.
 * @param {boolean} props.isCapturing - Indica si la captura esta en proceso o ha terminado.
 * @param {string} props.protocolSelected - Protocolo seleccionado en el formulario.
 * @param {function} props.setProtocolSelected - Función callback que se ejecuta el seleccionar el protocolo.
 * @returns {React.JSX.Element}
 */
function CaptureForm({
    onSubmit,
    onStop,
    isCapturing,
    protocolSelected,
    setProtocolSelected,
}) {
    const { theme } = useTheme();

    return (
        <form onSubmit={onSubmit}>
            <div className="form-packets">
                <div className="packets-input">
                    <label htmlFor='input-packets-number'>Número de paquetes a capturar</label>
                    <input type='number' name='input-packets-number' id='input-packets-number' min={5} max={100} required/>
                </div>
                <Button
                    buttonText='Empezar captura'
                    type='submit'
                    rol='start_capture'
                    position='before'
                />
                <Button
                    buttonText='Detener captura'
                    rol='stop_capture'
                    position='before'
                    onClick={onStop}
                    disable={!isCapturing}
                />
            </div>
            <fieldset className="form-protocol">
                <legend>Protocolo objetivo</legend>
                <div className="protocol-grid">
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
        </form>
    );
}

CaptureForm.propTypes = {
    /** Función que se ejecuta al enviar el formulario */
    onSubmit: PropTypes.func.isRequired,

    /** Función callback que se ejecuta al hacer clic en el botón de detener la captura */
    onStop: PropTypes.func.isRequired,

    /** Indica si la captura esta en proceso o ha terminado */
    isCapturing: PropTypes.bool.isRequired,

    /** Protocolo seleccionado en el formulario */
    protocolSelected: PropTypes.string.isRequired,

    /** Función callback que se ejecuta al seleccionar el protocolo */
    setProtocolSelected: PropTypes.func.isRequired,
};

export default CaptureForm;
