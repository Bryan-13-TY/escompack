import { faMagnifyingGlass, faGear } from '@fortawesome/free-solid-svg-icons';

import OperationCard from '../../../../components/OperationCard';

import './HomeOperationCards.css';

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
                title='Captura de Paquetes'
                description='Captura paquetes de red en tiempo real.'
                pageLink='/capture'
            />
            <OperationCard
                icon={faGear}
                title='Manipulación de Paquetes'
                description='Modifica y analiza los paquetes capturados.'
                pageLink='/manipulation'
            />
        </section>
    );
}

export default HomeOperationCards;