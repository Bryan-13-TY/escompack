import { useNavigate } from 'react-router-dom';
import { faMagnifyingGlass, faGear} from '@fortawesome/free-solid-svg-icons'
import { OperationCard } from '../components/OperationCard';
import { NabVar } from '../components/NavBar';
import { Footer } from '../components/Footer';

import './Welcome.css';

export function Welcome() {
    const navigate = useNavigate(); // Hook para navegar desde código

    return (
        <>
            <NabVar />
            <main>
                <section className='welcome-prtn-section'>
                    <h1>
                        <span className='prtn-escom'>ESCOM</span>
                        <span className='prtn-pack'>Pack</span>
                    </h1>
                    <h2>
                        {`UNA APLICACIÓN WEB PARA LA
                        CAPTURA Y MANIPULACIÓN DE
                        PAQUETES DE RED`}
                    </h2>
                    <div className='welcome-prtn-info'>
                        <p>
                            {`Captura y manipula paquetes de red, tales como:
                            ARP, ICMP, IGMP, DVMRP, PIM, MSDP, TCP y UDP,
                            y exportalos para su posterior análisis.`}
                        </p>
                    </div>
                </section>

                <section className='welcome-opertn-cards-section'>
                    <div className='opertn-cards-section-container'>
                        {/* Tarjetas para la captura y manipulación de paquetes */}
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
            </main>
            <Footer />
        </>
    );
}
