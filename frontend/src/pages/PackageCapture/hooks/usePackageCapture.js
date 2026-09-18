import { useState, useEffect, useRef } from "react";

import axios  from "axios";

export function usePacketCapture() {
    const [protocolSelected, setProtocolSelected] = useState('tcp');
    const [packets, setPackets] = useState([]);
    const [totalPackets, setTotalPackets] = useState(0); 
    const [isCapturing, setIsCapturing] = useState(false);
    const wsRef = useRef(null);

    // cerrar conexión WebSocket al salir de la vista
    useEffect(() => {
        return () => wsRef.current?.close(); // cerrar conexión al salir de la vista
    }, []);

    // iniciar la captura
    const startCapture = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        // recuperamos el número de paquetes desde el formulario
        const packetsRequested = Number(formData.get('input-packets-number'));

        const data = {
            packets: formData.get('input-packets-number'),
            // pasamos el valor del estado directamente
            protocol: protocolSelected,
        }

        // guardamos el total de paquetes solicitados en el estado
        setTotalPackets(packetsRequested);
        // limpiamos la captura anterior
        setPackets([]);
        // marcamos que empezó la captura
        setIsCapturing(true);

        // avisamos a la API que inicie la captura
        await axios.post('/api/capture/start', data);

        // abrimos el WebSocket paar recibir los paquetes
        wsRef.current = new WebSocket(`ws://${window.location.host}/ws/capture/`);
        wsRef.current.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.event === 'capture_finished') {
                setIsCapturing(false); // deshabilitamos 'detener'
                console.log('Captura finalizada');
                return;
            }

            // agrega el nuevo paquete a la tabla
            setPackets((prev) => [...prev, message]);
        };
    };

    // detener la captura
    const stopCapture = async () => {
        await axios.post('/api/capture/stop');
    }

    // porcentaje calculado
    const progressPercentaje = totalPackets > 0
        ? Math.round((packets.length / totalPackets) * 100)
        : 0;

    return {
        protocolSelected,
        setProtocolSelected,
        packets,
        totalPackets,
        isCapturing,
        progressPercentaje,
        startCapture,
        stopCapture,
    };
}
