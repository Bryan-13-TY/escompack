import { useState } from "react";

import axios from "axios";

/**
 * Hook para gestionar el filtrado de capturas (por ahora).
 * 
 * Maneja la petición HTTP con `/api/captures/` para obtener los
 * capturas de acuerdo al protocolo y fecha de captura.
 * 
 * @example
 * const { captures, capturedProtocol, capturedDate } =
 * usePackageManipulation();
 */
export function usePackageManipulation() {
    const [protocolSelected, setProtocolSelected] = useState('');
    const [capturedDate, setCapturedDate] = useState('');
    const [capturedProtocol, setCapturedProtocol] = useState('');
    const [captures, setCaptures] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    // reseteamos todo el filtro
    const resetProtocol = () => {
        setHasSearched(false);
        setProtocolSelected('');
        setCapturedDate('');
        setCapturedProtocol('');
        setCaptures([]);
    }

    const getCaptures = async (e) => {
        e.preventDefault(); // evita que se recargue la página

        const formData = new FormData(e.target);
        const capturedDate = formData.get('input-captured-date');
        const capturedProtocol = formData.get('capture-protocol');

        // se contruyen los parámetros solo con lo que se selecciono
        // formulario
        const params = {};
        if (capturedProtocol) params.protocol =  capturedProtocol;
        if (capturedDate) params.captured_date = capturedDate;

        try {
            const response = await axios.get('/api/captures/', { params });
            setCaptures(response.data);
            setCapturedDate(capturedDate);
            setCapturedProtocol(capturedProtocol);
            setHasSearched(true);
        } catch (error) {
            console.error('Error al filtrar capturas:', error.response?.data || error.message);
        }
    }

    return {
        protocolSelected,
        setProtocolSelected,
        resetProtocol,
        getCaptures,
        captures,
        capturedDate,
        capturedProtocol,
        hasSearched,
    }
}
