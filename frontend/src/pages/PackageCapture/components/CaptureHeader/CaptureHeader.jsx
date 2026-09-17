import './CaptureHeader.css';

function CaptureHeader() {
    return (
        <section className='package-capture-welcome'>
            <div className='package-capture-welcome-wrapper'>
                <p className='welcome'>
                    Módulo de <span className='welcome-capture'>Captura de paquetes</span>
                </p>
                <h1 className='summary'>
                    {`Captura paquetes de red
                    y ve un resumen de lo capturado`}
                </h1>
            </div>
        </section>
    );
}

export default CaptureHeader;
