import { useState } from 'react';

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            packets: formData.get('capture-packets'),
            protocol: protocolSelected, // Pasamos el valor del estado direectamente
        };

        try {
            const response = await axios.post('/api/capture/', data);
            console.log('Respuesta de la API:', response.data);
        } catch (error) {
            console.error('Error al enviar:', error.response?.data || error.message);
        }
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
                    <div className='packets'>hola</div>
                </section>
            </main>
            <Footer />
        </>
    );
}
