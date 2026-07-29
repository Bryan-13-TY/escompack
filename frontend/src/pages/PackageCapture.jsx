import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function PackageCapture() {
    const navigate = useNavigate(); // Hook para navegar desde código

    const [mensaje, setMensaje] = useState('Cargando conexión con la API...');
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/capture/')
            .then((response) => {
                setMensaje(response.data.message);
            })
            .catch((err) => {
                console.error('Error al conectar con la API:', err);
                setError('No se pudo conectar con el Backend');
            });
    }, []);

    return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Prueba de Comunicación Docker</h1>
      {error ? (
        <p style={{ color: 'red' }}>❌ {error}</p>
      ) : (
        <p style={{ color: 'green', fontWeight: 'bold' }}>✅ {mensaje}</p>
      )}
    </div>
  );
}
