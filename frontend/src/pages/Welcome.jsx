import { useNavigate } from 'react-router-dom';

export function Welcome() {
    const navigate = useNavigate(); // Hook para navegar desde código

    return (
        <div>
            <h1>Bienvenido a la aplicación de captura y manipulación de paquetes</h1>
            <p>Esta aplicación permite capturar y manipular paquetes de red.</p>

            <section>
                {/* Contenido de la sección de bienvenida */}
            </section>
            <section>
                {/* Tarjetas para la captura y manipulación de paquetes */}
            </section>
        </div>
    );
}
