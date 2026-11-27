import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faGear, faThumbTack, faNetworkWired } from '@fortawesome/free-solid-svg-icons';

import OperationCard from '../../../components/OperationCard';

import './index.css';

/**
 * Componente que renderiza la sección de las tarjetas de operación
 * de la vista principal.
 * 
 * @returns {React.JSX.Element}
 */
function HomeOperationCards() {
    return (
        <section className='home-operation-cards'>
            <div className='home-operation-cards__title-section'>
                <div className='title'>
                    <FontAwesomeIcon
                        icon={faThumbTack}
                        size='2x'
                    />
                    <h2>Funciones principales</h2>
                </div>
                <p className='description'>Elije tu punto de partida. Capturar, manipular paquetes de red o construir tu propia topología en GNS3 ¡Todo en un mismo lugar en <span>ESCOM</span>Pack!.</p>
            </div>
            <div className='home-operation-cards__content-section'>
                <OperationCard
                    icon={faMagnifyingGlass}
                    title='Capturar Paquetes'
                    description='Captura paquetes del tráfico de red en tiempo real de una topología GNS3.'
                    pageLink='/capture'
                />
                <OperationCard
                    icon={faGear}
                    title='Manipular Paquetes'
                    description='Modifica y analiza los paquetes capturados, exportalos en formatop PCAP y/o reenvialos a una red destino GNS3.'
                    pageLink='/manipulation'
                />
                <OperationCard
                    icon={faNetworkWired}
                    title='Construir Topología'
                    description='Construye y diseña tu propia topología GNS3 remotamente.'
                    pageLink='/manipulation'
                />
            </div>
        </section>
    );
}

export default HomeOperationCards;
