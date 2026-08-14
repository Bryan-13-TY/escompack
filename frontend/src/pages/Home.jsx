import { useNavigate } from 'react-router-dom';

import { faMagnifyingGlass, faGear } from '@fortawesome/free-solid-svg-icons';

import { useTheme } from '../ThemeContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { OperationCard } from '../components/OperationCard';
import { ProtocolCard } from '../components/ProtocolCard';
import { PROTOCOL_CARDS } from '../constants';

import './Home.css';

export function Home() {
    const navigate = useNavigate();
    const { theme } = useTheme();

    return (
        <div className='home'>
            <div className='home-wrapper'>
                <Header />
                <main>
                    <section className='home-welcome'>
                        <div className='welcome-wrapper'>
                            <p className='welcome'>
                                Bienvenido a <span className='welcome-escom'>ESCOM</span>
                                <span className='welcome-pack'>Pack</span>
                            </p>
                            <h1 className='summary'>
                                {`Una aplicación web para
                                la captura y manipulación
                                de paquetes de red`}
                            </h1>
                            <p className='description'>
                                {`Captura y manipula paquetes de red, 
                                y exportalos para su posterior análisis
                                en formato .pcap.`}
                            </p>
                        </div>
                    </section>
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
                    <section className='home-protocol-cards'>
                        <div className='protocol-cards-wrapper'>
                            <h2>Protocolos soportados</h2>
                            <div className='cards-wrapper'>
                                {
                                    PROTOCOL_CARDS.map((protocol) => (
                                        <ProtocolCard
                                            key={protocol.acronym}
                                            icon={protocol.icon[theme]}
                                            acronym={protocol.acronym}
                                            rep={protocol.rep}
                                            description={protocol.description}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </div>
    );
}
