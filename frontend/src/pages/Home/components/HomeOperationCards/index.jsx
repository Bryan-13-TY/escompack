import { faMagnifyingGlass, faGear, faHammer, faNetworkWired } from '@fortawesome/free-solid-svg-icons';

import OperationCard from '../../../../components/OperationCard';

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
        </section>
    );
}

export default HomeOperationCards;