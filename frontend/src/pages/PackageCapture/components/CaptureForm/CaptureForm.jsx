import { useTheme } from "../../../../hooks/ThemeContext";
import { PROTOCOLS } from "../../../../constants";
import Button from '../../../../components/Button/Button';
import ProtocolInput from '../../../../components/ProtocolInput/ProtocolInput';

import './CaptureForm.css';

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
                    {
                        PROTOCOLS.map((protocol_input) => (
                            <ProtocolInput
                                key={protocol_input.id}
                                id={protocol_input.id}
                                icon={protocol_input.icon[theme]}
                                label={protocol_input.label}
                                isSelected={protocolSelected === protocol_input.id}
                                onSelect={setProtocolSelected}
                            />
                        ))
                    }
                </div>
            </fieldset>
        </form>
    );
}

export default CaptureForm;
