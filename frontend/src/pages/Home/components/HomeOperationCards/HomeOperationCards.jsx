import { faMagnifyingGlass, faGear } from '@fortawesome/free-solid-svg-icons';

import OperationCard from '../../../../components/OperationCard';

import './HomeOperationCards.css';

function HomeOperationCards() {
    return (
        <section className='home-operation-cards'>
            <div className='operation-cards-wrapper'>
                <OperationCard
                    icon={faMagnifyingGlass}
                    title='Captura de Paquetes'
                    description='Captura paquetes de red en tiempo real.'
                    buttonText='Ir a Captura'
                    pageLink='/capture'
                />
                <OperationCard
                    icon={faGear}
                    title='Manipulación de Paquetes'
                    description='Modifica y analiza los paquetes capturados.'
                    buttonText='Ir a Manipulación'
                    pageLink='/manipulation'
                />
            </div>
        </section>
    );
}

export default HomeOperationCards;