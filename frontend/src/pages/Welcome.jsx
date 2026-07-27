import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faGear} from '@fortawesome/free-solid-svg-icons'
import { OperationCard } from '../components/OperationCard';
import { NabVar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import escomPackLogo from '../assets/escompack.PNG'

import './Welcome.css';

export function Welcome() {
    const navigate = useNavigate(); // Hook para navegar desde código

    return (
        <>
            <NabVar />
            <main>
                <section className='welcome-section'>
                    <div className='welcome-section-descrp'>
                        <h1 className='descrp-general'>
                            {`Aplicación web para la captura
                            y manipulación de paquetes de red`}
                        </h1>
                        <h3 className='descrp-specify'>
                            {`Captura y manipula paquetes de red, tales como:
                            ARP, ICMP, IGMP, DVMRP, PIM, MSDP, TCP Y UDP
                            y exportalos para su posterior análisis.`}
                        </h3>
                    </div>
                    <div className='welcome-section-image'>
                        <img src={escomPackLogo} alt="ESCOMPack logo" width={300}/>
                    </div>
                </section>

                <section className='cards-container'>
                    {/* Tarjetas para la captura y manipulación de paquetes */}
                    <OperationCard 
                        icon={faMagnifyingGlass}
                        title='Captura de Paquetes'
                        description='Capture paquetes de red en tiempo real.'
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
                </section>
                <section className='about'>

                </section>
            </main>
            <Footer />
        </>
    );
}
