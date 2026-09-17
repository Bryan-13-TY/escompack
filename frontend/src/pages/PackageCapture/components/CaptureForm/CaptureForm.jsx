import { useTheme } from "../../../../hooks/ThemeContext";
import { PROTOCOLS } from "../../../../constants";
import Button from "../../../../components/Button";
import ProtocolInput from "../../../../components/ProtocolInput";

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
            {/* input para el número de paquetes y botones */}
            <div className='packets-capture'>
                {/* input del form */}
                <div className='packets-input'>
                    <label htmlFor='packets-number'>Número de paquetes a capturar</label>
                    <input type='number' name='packets-number' id='packets-number' min={5} max={100} required/>
                </div>

                {/* botones del form */}
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

            {/* grilla con los inputs del form */}
            <div className='packets-protocol'>
                <div className='packets-protocol-wrapper'>
                    <p>Protocolo objetivo</p>
                    <div className='target-protocol-wrapper'>
                        {
                            // iteramos sobre los protocolos
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
                </div>
            </div>
        </form>
    );
}

export default CaptureForm;
