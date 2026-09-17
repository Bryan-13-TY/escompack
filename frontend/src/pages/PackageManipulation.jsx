import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faXmark, faFilter } from '@fortawesome/free-solid-svg-icons';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ProtocolInput from '../components/ProtocolInput';
import { PROTOCOLS } from '../constants';
import { useTheme } from '../hooks/ThemeContext';

import './PackageManipulation.css';
import Button from '../components/Button';

const ChoosePackageCaptured = ({onClick}) => {
    return (
        <div className='modal-button-wrapper'>
            <button onClick={onClick} type='button' className='modal-button'>
                <span>
                    <FontAwesomeIcon
                        icon={faFileLines}
                        size='2x'
                    />
                </span>
            </button>
        </div>
    );
};

const CloseModalButton = () => {
    return (
        <div className='close-modal-button-wrapper'>
            <button type='button' className='close-modal-button'>
                <span>
                    <FontAwesomeIcon
                        className='close-modal-icon'
                        icon={faXmark}
                        size='2x'
                    />
                </span>
            </button>
        </div>
    );
};

const ModalHeader = () => {
    return (
        <div className=''>

        </div>
    );
}


const ChoosePackageCaptureModal = () => {
    const { theme } = useTheme();

    // estado para cambiar el protocolo seleccionado
    const [protocolModalSelected, setProtocolModalSelected] = useState('tcp');

    return (
        <div className='modal-window'>
            <div className='modal-window-wrapper'>
                {/* header de la ventana modal */}
                <section className='modal-header-wrapper'>
                    <div className='modal-header-content'>
                        <div className='header-label'>
                            <div className='label'>
                                <FontAwesomeIcon className='filter-modal-icon' icon={faFilter} size='2x'/>
                                <p>Filtrar Capturas de Red</p>
                                <span className='capture-file-format'>.pcap</span>
                            </div>
                            <CloseModalButton />
                        </div>
                        <div className='header-description'>
                            <p>Selecciona un protocolo y rango de fecha para cargar o manipular trazas .pcap almacenadas</p>
                        </div>
                    </div>
                </section>
                {/* contenido del modal */}
                <section className='modal-content-wrapper'>
                    <section className='modal-form'>
                        <div className='modal-form-wrapper'>
                            <form action="">
                                <section className='modal-packets'>
                                    <div className='modal-packets-wrapper'>
                                        <p>Protocolo de red</p>
                                        <div className='modal-target-packets-wrapper'>
                                            {
                                                PROTOCOLS.map((protocol_input) => (
                                                    <ProtocolInput
                                                        key={protocol_input.id}
                                                        id={protocol_input.id}
                                                        icon={protocol_input.icon[theme]}
                                                        label={protocol_input.label}
                                                        isSelected={protocolModalSelected === protocol_input.id}
                                                        onSelect={setProtocolModalSelected}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </section>
                                <section className='modal-date'>
                                    <div className='modal-date-input'>
                                        <label htmlFor="">Fecha de captura (UTC)</label>
                                        <input type='date' name='modal-date' id='modal-date' required/>
                                    </div>
                                    <Button
                                        buttonText='Limpiar filtros'
                                        type='reset'
                                        rol='reset_filter'
                                        position='before'
                                        animation='left'
                                    />
                                    <Button
                                        buttonText='Aplicar filtros'
                                        type='submit'
                                        rol='apply_filter'
                                        position='before'
                                        animation='left'
                                    />
                                </section>
                            </form>
                        </div>
                    </section>
                </section>
            </div>
        </div>
    );
};

function PackageManipulation() {
    // estado para saber si el modal se muestra
    const [isModalShown, setIsModalShown] = useState(false);

    const toogleModal = () => {
        setIsModalShown(!isModalShown);
    };

    return (
        <div className='package-manipulation'>
            <div className='package-manipulation-wrapper'>
                <Header />
                <main>
                    <section className='package-manipulation-welcome'>
                        <div className='package-manipulation-welcome-wrapper'>
                            <p className='welcome'>
                                Módulo de <span className='welcome-manipulation'>Manipulación de paquetes</span>
                            </p>
                            <h1 className='summary'>
                                {`Manipula los paquetes capturados
                                a tu gusto`}
                            </h1>
                        </div>
                    </section>
                    <ChoosePackageCaptured onClick={toogleModal}/>
                    {isModalShown && (
                        <ChoosePackageCaptureModal />
                    )}
                    <section className='temporal'>
                        {`Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Quae, quia. Accusamus
                        exercitationem reiciendis eum, adipisci
                        corrupti nemo nihil provident ipsa blanditiis
                        modi, beatae veniam veritatis, ullam itaque
                        possimus sed repellendus!
                        Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Quae, quia. Accusamus
                        exercitationem reiciendis eum, adipisci
                        corrupti nemo nihil provident ipsa blanditiis
                        modi, beatae veniam veritatis, ullam itaque
                        possimus sed repellendus!
                        Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Quae, quia. Accusamus
                        exercitationem reiciendis eum, adipisci
                        corrupti nemo nihil provident ipsa blanditiis
                        modi, beatae veniam veritatis, ullam itaque
                        possimus sed repellendus!
                        Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Quae, quia. Accusamus
                        exercitationem reiciendis eum, adipisci
                        corrupti nemo nihil provident ipsa blanditiis
                        modi, beatae veniam veritatis, ullam itaque
                        possimus sed repellendus!
                        Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Quae, quia. Accusamus
                        exercitationem reiciendis eum, adipisci
                        corrupti nemo nihil provident ipsa blanditiis
                        modi, beatae veniam veritatis, ullam itaque
                        possimus sed repellendus!
                        Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Quae, quia. Accusamus
                        exercitationem reiciendis eum, adipisci
                        corrupti nemo nihil provident ipsa blanditiis
                        modi, beatae veniam veritatis, ullam itaque
                        possimus sed repellendus!
                        Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Quae, quia. Accusamus
                        exercitationem reiciendis eum, adipisci
                        corrupti nemo nihil provident ipsa blanditiis
                        modi, beatae veniam veritatis, ullam itaque
                        possimus sed repellendus!
                        Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Quae, quia. Accusamus
                        exercitationem reiciendis eum, adipisci
                        corrupti nemo nihil provident ipsa blanditiis
                        modi, beatae veniam veritatis, ullam itaque
                        possimus sed repellendus!
                        Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Quae, quia. Accusamus
                        exercitationem reiciendis eum, adipisci
                        corrupti nemo nihil provident ipsa blanditiis
                        modi, beatae veniam veritatis, ullam itaque
                        possimus sed repellendus!
                        Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Quae, quia. Accusamus
                        exercitationem reiciendis eum, adipisci
                        corrupti nemo nihil provident ipsa blanditiis
                        modi, beatae veniam veritatis, ullam itaque
                        possimus sed repellendus!
                        Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Quae, quia. Accusamus
                        exercitationem reiciendis eum, adipisci
                        corrupti nemo nihil provident ipsa blanditiis
                        modi, beatae veniam veritatis, ullam itaque
                        possimus sed repellendus!
                        `}
                    </section>
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default PackageManipulation;
