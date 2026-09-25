import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faClock } from "@fortawesome/free-solid-svg-icons";

import Button from "../../../../../../components/Button";

import './FilterResults.css';

function FilterResults ({
    filename,
    filepath,
    protocol,
    packet_count,
    captured_at
}) {
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

export default FilterResults;
