import './CaptureHeader.css';

function CaptureHeader() {
    return (
        <header className='capture-header'>
            <h1 className='header-title'>
                Módulo de <span className='title-capture'>Captura de paquetes</span>
            </h1>
            <p className='header-summary'>
                Captura un paquetes de red y ve un resumen de ello
            </p>
        </header>
    );
}

export default CaptureHeader;
