import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';

import './Welcome.css'; // Importa el archivo CSS para estilos

export function Welcome() {
    const navigate = useNavigate(); // Hook para navegar desde código

    return (
        <>
            <nav>
                { /* Aquí ira el navbar */ }
            </nav>
            <section className='welcome-section'>
                <h1>
                    {`Aplicación web de captura y
                    manipulación de paquetes de red`}
                </h1>
                <p className='contributors'>
                    {`Por
                    Castillo Bonilla Angel Eduardo
                    García Escamilla Bryan Alexis
                    Melendez Macedonio Rodrigo`}
                </p>
                <p className='description'>
                    {`Captura y manipula paquetes de red, tales como:
                    ARP, ICMP, IGMP, DVMRP, PIM, MSDP, TCP Y UDP
                    y exportalos para su posterior análisis.`}
                </p>
            </section>

            <section className='cards-container'>
                {/* Tarjetas para la captura y manipulación de paquetes */}
                <Card 
                    icon='🔍'
                    title='Captura de Paquetes'
                    description='Capture paquetes de red en tiempo real.'
                    buttonText='Ir a Captura ->'
                    pageLink='/capture'
                />
                <Card 
                    icon='⚙️'
                    title='Manipulación de Paquetes'
                    description='Modifica y analiza los paquetes capturados.'
                    buttonText='Ir a Manipulación ->'
                    pageLink='/manipulation'
                />
            </section>
            <footer>
                { /* Aquí irá in footer */ }
            </footer>
        </>

    );
}
