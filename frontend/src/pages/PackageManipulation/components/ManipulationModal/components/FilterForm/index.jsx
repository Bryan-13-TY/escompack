import ProtocolInput from "../../../../../../components/ProtocolInput";
import { PROTOCOLS } from "../../../../../../constants";
import Button from "../../../../../../components/Button";
import { useTheme } from "../../../../../../hooks/ThemeContext";

import './FilterForm.css';

function FilterForm ({
    protocolSelected,
    setProtocolSelected,
    resetProtocol,
    getCaptures,
}) {
    const { theme } = useTheme();

    return (
        <form onSubmit={getCaptures}>
            <fieldset className="form-modal-protocol">
                <legend>Protocolo de red</legend>
                <div className='modal-protocol-grid'>
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
            <div className="form-modal-date">
                <div className="date-input">
                    <label htmlFor="input-captured-date">Fecha de captura (UTC)</label>
                    <input type="date" name="input-captured-date" id="input-captured-date"/>
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

export default FilterForm;
