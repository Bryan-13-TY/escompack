import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faGear} from '@fortawesome/free-solid-svg-icons'
import { OperationCard } from '../components/OperationCard';
import { NabVar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import escomPackLogo from '../assets/escompack.PNG'
import { ProtocolCard } from '../components/ProtocolCard';
import { INFO_PROTOCOL_CARDS } from '../constants';

import './Welcome.css';

export function Welcome() {
    const navigate = useNavigate(); // Hook para navegar desde código

    return (
        <>
            <NabVar />
            <main>
                <section className='welcome-prtn-section'>
                    <div className='prtn-section-desc'>
                        <h1 className='desc-title'>
                            {`Aplicación web para la captura
                            y manipulación de paquetes de red`}
                        </h1>
                        <h3 className='desc-summary'>
                            {`Captura y manipula paquetes de red, tales como:
                            ARP, ICMP, IGMP, DVMRP, PIM, MSDP, TCP Y UDP
                            y exportalos para su posterior análisis.`}
                        </h3>
                    </div>
                    <div className='prtn-section-image'>
                        <img src={escomPackLogo} alt="ESCOMPack logo" width={300}/>
                    </div>
                </section>

                <section className='welcome-opertn-cards-section'>
                    <h2 className='opertn-cards-section-title'>¿Empezamos? Elije alguna de las opciones</h2>
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

                <section className='welcome-protocol-cards-section'>
                    <div className='protocol-card-section-container'>
                        {
                            INFO_PROTOCOL_CARDS.map((protocol) => {
                                return (
                                    <ProtocolCard
                                        key={protocol.acronym}
                                        icon={protocol.icon}
                                        acronym={protocol.acronym}
                                        rep_es={protocol.rep_es}
                                        rep_en={protocol.rep_en}
                                        tcpip_layer={protocol.tcpip_layer}
                                        functions={protocol.functions}
                                    />
                                );
                            })
                        }
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
