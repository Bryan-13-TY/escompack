import './CaptureProgress.css';

function CaptureProgress({
    capturedCount,
    totalPackets,
    percentaje,
    networkInterface = 'enp0s8',
}) {
    return (
        <div className='form-capture-progress'>
            <header className='progress-header'>
                <p className='header-label'>Proceso de captura</p>
                <span className='header-percentage'>{percentaje}%</span>
            </header>
            <div className='progress-capture'>
                <div className='capture-bar' style={{ width: `${percentaje}%`}}></div>
            </div>
            <footer className='progress-footer'>
                <p className='footer-total-packets'>{capturedCount} / {totalPackets} paquetes</p>
                <span className='footer-interface'>Interfaz: {networkInterface}</span>
            </footer>
        </div>
    );
}

export default CaptureProgress;
