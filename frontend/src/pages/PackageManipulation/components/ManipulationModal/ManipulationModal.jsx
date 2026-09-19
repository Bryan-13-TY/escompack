import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faXmark, faFilter } from "@fortawesome/free-solid-svg-icons";

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

export function FilterModal() {
    return (
        <div className="manipulation-blur">
            <div className="manipulation-modal">
                <FilterModalHeader />
            </div>
        </div>
    );
}
