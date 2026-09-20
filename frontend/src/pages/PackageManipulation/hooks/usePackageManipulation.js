import { useState } from "react";

import axios from "axios";

export function usePackageManipulation() {
    const [protocolSelected, setProtocolSelected] = useState('');
    const [captures, setCaptures] = useState([]);

    const resetProtocol = () => {
        setProtocolSelected('');
    }

    const getCaptures = async (e) => {
        e.preventDefault(); // evita que se recargue la página

        const formData = new FormData(e.target);
        const capturedDate = formData.get('input-captured-date');

        // se contruyen los parámetros solo con lo que se selecciono
        // formulario
        const params = {};
        if (protocolSelected) params.protocol = protocolSelected;
        if (capturedDate) params.captured_date = capturedDate;

        try {
            const response = await axios.get('/api/captures/', { params });
            setCaptures(response.data);
            console.log(captures);
        } catch (error) {
            console.error('Error al filtrar capturas:', error.response?.data || error.message);
        }
    }

    return {
        protocolSelected,
        setProtocolSelected,
        resetProtocol,
        getCaptures,
    }
}
