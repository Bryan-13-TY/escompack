import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faFilter } from "@fortawesome/free-solid-svg-icons";

import './FilterModalHeader.css';

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

function FilterModalHeader ({onClick}) {
    return (
        <header className="modal-header">
            <div className="content-label">
                <div className="label">
                    <FontAwesomeIcon
                        icon={faFilter}
                        size="2x"
                    />
                    <div>
                        <p className="modal-title">Filtrar capturas de red</p>
                        <span className="label-format">.pcap</span>
                    </div>
                </div>
                <CloseFilterModalButton onClick={onClick}/>
            </div>
            <p className='content-description'>Selecciona un protocolo y rango de fecha para cargar o manipular trazas .pcap almacenadas</p>
        </header>
    );
}

export default FilterModalHeader;
