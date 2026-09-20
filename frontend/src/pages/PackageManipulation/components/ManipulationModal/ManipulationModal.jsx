import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faXmark, faFilter } from "@fortawesome/free-solid-svg-icons";

import Button from "../../../../components/Button/Button";
import ProtocolInput from "../../../../components/ProtocolInput/ProtocolInput";
import { PROTOCOLS } from "../../../../constants";
import { useTheme } from "../../../../hooks/ThemeContext";
import { usePackageManipulation } from "../../hooks/usePackageManipulation";

import './ManipulationModal.css';

export const FilterModalButton = ({onClick}) => {
    return (
        <button  onClick={onClick} type="button" className="manipulation-modal-button">
            <span>
                <FontAwesomeIcon
                    icon={faFileLines}
                    size="2x"
                />
            </span>
        </button>
    );
};

const CloseFilterModalButton = () => {
    return (
        <button className="label-button">
            <span>
                <FontAwesomeIcon
                    icon={faXmark}
                    size="2x"
                />
            </span>
        </button>
    );
};

const FilterModalHeader = () => {
    return (
        <header className="modal-header">
            <div className="content-label">
                <div className="label">
                    <FontAwesomeIcon
                        icon={faFilter}
                        size="2x"
                    />
                    <p>Filtrar capturas de red</p>
                    <span className="label-format">.pcap</span>
                </div>
                <CloseFilterModalButton />
            </div>
            <p className='content-description'>Selecciona un protocolo y rango de fecha para cargar o manipular trazas .pcap almacenadas</p>
        </header>
    );
};

const FilterForm = ({
    protocolSelected,
    setProtocolSelected,
    resetProtocol,
    getCaptures,
}) => {
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
                    <label htmlFor="input-captured-date">Fecha de capture (UTC)</label>
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

export function FilterModal() {
    const {
        protocolSelected,
        setProtocolSelected,
        resetProtocol,
        getCaptures,
    } = usePackageManipulation();

    return (
        <div className="manipulation-blur">
            <div className="manipulation-modal">
                <FilterModalHeader />
                <div className="manipulation-form">
                    <FilterForm
                        protocolSelected={protocolSelected}
                        setProtocolSelected={setProtocolSelected}
                        resetProtocol={resetProtocol}
                        getCaptures={getCaptures}
                    />
                </div>
            </div>
        </div>
    );
}
