import { useState, useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { NabVar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { PROTOCOLS } from '../constants';
import { Button } from '../components/Button';

import './PackageCapture.css';

const ProtocolCard = ({ id, icon, label, isSelected, onSelect }) => {
    const className = isSelected ? 'protocol-card-select selected' : 'protocol-card-select';

    return (
        <label className={className}>
            <input
                type='radio'
                name='capture-protocol'
                value={id}
                onChange={() => onSelect(id)} // Actualizamos el protocolo
                checked = {isSelected} // Marcamos el input seleccionado
            />
            <div className='protocol-content'>
                <img src={icon} alt={label} width={70}/>
                <span>{label}</span>
            </div>
        </label>
    );
};

export function PackageCapture() {
    const navigate = useNavigate(); // Hook para navegar desde código
    // Estado para cambiar el protocolo seleccionado
    const [protocolSelected, setProtocolSelected] = useState('tcp');
    // Estado en donde se guardan los paquetes capturados
    const [packets, setPackets] = useState([]);
    const wsRef = useRef(null);

    useEffect(() => {
        return () => wsRef.current?.close(); // cerrar conexión al salir de la vista
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            packets: formData.get('capture-packets'),
            protocol: protocolSelected, // Pasamos el valor del estado direectamente
        };
        
        // 1. Avisamos a la API que inicie la captura
        await axios.post("/api/capture/", data);
        
        // 2. Abrimos el Websocket para recibir los paquetes en vivo
        wsRef.current = new WebSocket("ws://localhost:8000/ws/capture/");
        wsRef.current.onmessage = (event) => {
            const packet = JSON.parse(event.data);
            setPackets((prev) => [...prev, packet]); // agrega el nuevo paquete a la tabla
        };
    };

    return (
        <>
            <NabVar />
            <main>
                <section className='capture-form-section'>
                    <form className='capture' onSubmit={handleSubmit}>
                        <div className='capture-packets-info'>
                            <label htmlFor='capture-packets'>Número de paquetes</label>
                            <input type='number' name='capture-packets' id='capture-packets' />
                        </div>

                        <div className='capture-protocol-selection'>
                            <div className='protocol-grid'>
                                {
                                    PROTOCOLS.map((protocol) => (
                                        <ProtocolCard
                                            key={protocol.id}
                                            id={protocol.id}
                                            icon={protocol.icon}
                                            label={protocol.label}
                                            isSelected={protocolSelected === protocol.id}
                                            onSelect={setProtocolSelected}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                        <div className='capture-button'>
                            <Button buttonText="Capturar" type="submit" />
                        </div>
                    </form>
                </section>
                
                <section className='capture-packets-section'>
                    <div className='packets'>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Origen</th>
                                    <th>Destino</th>
                                    <th>Protocolo</th>
                                    <th>longitud</th>
                                    <th>Resumen</th>
                                </tr>
                            </thead>
                            <tbody>
                                {packets.map((p) => (
                                    <tr key={p.number}>
                                        <td>{p.number}</td>
                                        <td>{p.origin}</td>
                                        <td>{p.destination}</td>
                                        <td>{p.protocol}</td>
                                        <td>{p.length}</td>
                                        <td>{p.summary}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
