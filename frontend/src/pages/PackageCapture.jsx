import { useState, useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useTheme } from '../ThemeContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { PROTOCOLS } from '../constants';
import { Button } from '../components/Button';

import './PackageCapture.css';

const ProtocolInput = ({ id, icon, label, isSelected, onSelect }) => {
    const className = isSelected ? 'target-protocol selected' : 'target-protocol';

    return (
        <label className={className}>
            <input
                type='radio'
                name='capture-protocol'
                value={id}
                /* establecemos el nuevo protocolo seleccionado
                cada que se selecciona el input */
                onChange={() => onSelect(id)}
                checked = {isSelected} // marcamos el input seleccionado
            />
            <div className='protocol-content'>
                <img src={icon} alt={label} width={70}/>
                <span>{label}</span>
            </div>
        </label>
    );
};

export function PackageCapture() {
    const navigate = useNavigate(); // hook para navegar desde código
    const { theme } = useTheme();
    // estado para cambiar el protocolo seleccionado
    const [protocolSelected, setProtocolSelected] = useState('tcp');
    // estado en donde se guardan los paquetes capturados
    const [packets, setPackets] = useState([]);
    // estado en donde se guarda el total de paquetes capturados
    const [totalPackets, setTotalPackets] = useState(0); 
    const wsRef = useRef(null);

    useEffect(() => {
        return () => wsRef.current?.close(); // cerrar conexión al salir de la vista
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        // recuperamos el número de paquetes solicitados desde el formulario
        const packetsRequested = Number(formData.get('packets-number'));

        const data = {
            packets: formData.get('packets-number'),
            protocol: protocolSelected, // pasamos el valor del estado direectamente
        };

        // guardamos el total de paquetes solicitados en el estado
        setTotalPackets(packetsRequested);
        // limpiamos la captura anterior
        setPackets([]);

        // 1. avisamos a la API que inicie la captura
        await axios.post('/api/capture/', data);
        
        /* 2. abrimos el Websocket para recibir los paquetes en vivo,
        automáticamente tomamos el host y el puerto desde donde se
        abrio la App de React */
        wsRef.current = new WebSocket(`ws://${window.location.host}/ws/capture/`);
        wsRef.current.onmessage = (event) => {
            const packet = JSON.parse(event.data);
            setPackets((prev) => [...prev, packet]); // agrega el nuevo paquete a la tabla
        };
    };

    return (
        <div className='package-capture'>
            <div className='package-capture-wrapper'>
                <Header />
                <main>
                    <section className='package-capture-form'>
                        <div className='form-wrapper'>
                            <form onSubmit={handleSubmit}>
                                <section className='packets-capture'>
                                    <div className='packets-input'>
                                        <label htmlFor='packets-number'>Número de paquetes a capturar</label>
                                        <input type='number' name='packets-number' id='packets-number' />
                                    </div>
                                    <Button
                                        buttonText='Capturar'
                                        type='submit'
                                    />
                                </section>
                                <section className='packets-protocol'>
                                    <div className='packets-protocol-wrapper'>
                                        <p>Protocolo objetivo</p>
                                        <div className='target-protocol-wrapper'>
                                            {
                                                PROTOCOLS.map((protocol_input) => (
                                                    <ProtocolInput
                                                        key={protocol_input.id}
                                                        id={protocol_input.id}
                                                        icon={protocol_input.icon[theme]}
                                                        label={protocol_input.label}
                                                        isSelected={protocolSelected === protocol_input.id}
                                                        onSelect={setProtocolSelected}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </section>
                            </form>
                            <div className='capture-progress'>
                                <div className='progress-porcent'>
                                    <p className='progress-label'>Proceso de captura</p>
                                    <span className='porcent'>
                                        {/* calculamos el porcentaje de paquetes capturados en tiempo real */}
                                        {totalPackets > 0 ? Math.round((packets.length / totalPackets) * 100) : 0}%
                                    </span>
                                </div>
                                <div className='progress-bar'>
                                    <div
                                        className='bar-porcent'
                                        style={{ width: `${totalPackets > 0 ? (packets.length / totalPackets) * 100 : 0}%` }}
                                    ></div>
                                </div>
                                <p className='progress-total'>{packets.length} / {totalPackets} paquetes</p>
                            </div>
                        </div>
                    </section>
                    <section className='package-capture-table'>
                        <div className='table-wrapper'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Longitud</th>
                                        <th>Protocolo</th>
                                        <th>Origen</th>
                                        <th>Destino</th>
                                        <th>Resumen</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        packets.map((pkt) => (
                                            <tr key={pkt.number}>
                                                <td>{pkt.number}</td>
                                                <td>{pkt.length}</td>
                                                <td>{pkt.protocol}</td>
                                                <td>{pkt.source}</td>
                                                <td>{pkt.destination}</td>
                                                <td>{pkt.summary}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </div>
    );
}
