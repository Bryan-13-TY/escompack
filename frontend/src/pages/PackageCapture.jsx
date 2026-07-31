import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { NabVar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import './PackageCapture.css';

export function PackageCapture() {
    const navigate = useNavigate(); // Hook para navegar desde código

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            filename: formData.get('capture-filename'),
            packets: formData.get('capture-packets'),
            protocol: formData.get('capture-protocol'),
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
                        <div className='capture-input'>
                            <label htmlFor='capture-filename'>Nombre del archivo .pcap</label>
                            <input type='text' id='capture-filename' name='capture-filename' />
                        </div>
                        <div className='capture-input'>
                            <label htmlFor='capture-packets'>Número de paquetes</label>
                            <input type='number' name='capture-packets' id='capture-packets' />
                        </div>
                        <div className='capture-input'>
                            <label htmlFor='capture-protocol'>Protocolo</label>
                            <select name='capture-protocol' id='capture-protocol' defaultValue={'tcp'}>
                                <option value='arp'>ARP</option>
                                <option value='icmp'>ICMP</option>
                                <option value='igmp'>IGMP</option>
                                <option value='dvmrp'>DVMRP</option>
                                <option value='pim'>PIM</option>
                                <option value='msdp'>MSDP</option>
                                <option value='tcp'>TCP</option>
                                <option value='udp'>UDP</option>
                            </select>
                        </div>

                        <button type='submit'>
                            <span>
                                Capturar
                                <FontAwesomeIcon
                                    className='capture-btn-icon'
                                    icon={faArrowRight}
                                />
                            </span>
                        </button>
                    </form>
                </section>
                
                <section className='capture-packets-section'>

                </section>
            </main>
            <Footer />
        </>
    );
}
