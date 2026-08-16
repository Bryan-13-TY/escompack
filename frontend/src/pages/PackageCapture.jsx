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
    const { theme } = useTheme();
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
            packets: formData.get('packets-number'),
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
                                    <span className='porcent'>45%</span>
                                </div>
                                <div className='progress-bar'>
                                    <div className='bar-porcent'></div>
                                </div>
                                <p className='progress-total'>450 / 1000 paquetes</p>
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
                                    <tr>
                                        <td>1</td>
                                        <td>64</td>
                                        <td>TCP</td>
                                        <td>192.168.1.100</td>
                                        <td>10.0.0.1</td>
                                        <td>443 > 51234 [SYN, ACK] Seq=0 Ack=1 Win=65535</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>128</td>
                                        <td>UDP</td>
                                        <td>192.168.1.100</td>
                                        <td>8.8.8.8</td>
                                        <td>Standard query 0x1a2b A www.example.com</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>98</td>
                                        <td>ICMP</td>
                                        <td>10.0.0.1</td>
                                        <td>192.168.1.100</td>
                                        <td>Echo (ping) request id=0x0001, seq=1/256, ttl=64</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>1500</td>
                                        <td>TCP</td>
                                        <td>10.0.0.1</td>
                                        <td>192.168.1.100</td>
                                        <td>443 > 51234 [ACK] Seq=1 Ack=1 Win=65535 Len=1460</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </div>
    );
    /*
    return (
        <>
            <Header />
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
    */
}
