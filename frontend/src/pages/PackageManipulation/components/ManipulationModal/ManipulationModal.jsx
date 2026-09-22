import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faXmark, faFilter, faClock } from "@fortawesome/free-solid-svg-icons";

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

const CloseFilterModalButton = ({onClick}) => {
    return (
        <button onClick={onClick} className="label-button">
            <span>
                <FontAwesomeIcon
                    icon={faXmark}
                    size="2x"
                />
            </span>
        </button>
    );
};

const FilterModalHeader = ({onClick}) => {
    return (
        <header className="modal-header">
            <div className="content-label">
                <div className="label">
                    <FontAwesomeIcon
                        icon={faFilter}
                        size="2x"
                    />
                    <div>
                        <p>Filtrar capturas de red</p>
                        <span className="label-format">.pcap</span>
                    </div>
                </div>
                <CloseFilterModalButton onClick={onClick}/>
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

const PackageCaptureResults = ({
    filename,
    filepath,
    protocol,
    packet_count,
    captured_at
}) => {
    return (
        <div className="results-information">
            {/* información de la captura */}
            <div className="information">
                {/* icono de archivo */}
                <FontAwesomeIcon icon={faFileLines} size="2x" className="information-file-icon"/>
                {/* iformación de la captura */}
                <div className="information-details">
                    <div className="details-filename">
                        <p className="filename">{filename}</p>
                        <div className="filename-label">
                            <span className="protocol">{protocol}</span>
                            <p className="packet-count">{packet_count} paquetes</p>
                        </div>
                    </div>
                    <p className="details-path">{filepath}</p>
                    <div className="details-date">
                        <FontAwesomeIcon icon={faClock} size="1x"/>
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

export function FilterModal({onClick}) {
    const {
        protocolSelected,
        setProtocolSelected,
        resetProtocol,
        getCaptures,
        captures,
    } = usePackageManipulation();

    return (
        <div className="manipulation-blur">
            <div className="manipulation-modal">
                <FilterModalHeader onClick={onClick}/>
                <div className="manipulation-form">
                    <FilterForm
                        protocolSelected={protocolSelected}
                        setProtocolSelected={setProtocolSelected}
                        resetProtocol={resetProtocol}
                        getCaptures={getCaptures}
                    />
                </div>
                <div className="manipulation-results">
                    {/*
                    {
                        <PackageCaptureResults
                            filename='Capture_Protocols.ICMP_20260910_035010.pcap'
                            filepath='/app/captures/Capture_Protocols.ICMP_20260910_035010.pcap'
                            protocol='ICMP'
                            packet_count='10'
                            captured_at='2026-09-10T03:50:10.657000'
                        />
                    }
                    */}
                    {
                        captures.map((capture) => (
                            <PackageCaptureResults
                                key={capture.captured_at}
                                filename={capture.filename}
                                filepath={capture.filepath}
                                protocol={capture.protocol.toUpperCase()}
                                packet_count={capture.packet_count}
                                captured_at={capture.captured_at}

                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
