import './CaptureProgress.css';

function CaptureProgress({
    capturedCount,
    totalPackets,
    percentaje,
    networkInterface = 'enp0s8',
}) {
    return (
        <div className='capture-progress'>
            <div className='progress-porcent'>
                <p className='progress-label'>Proceso de captura</p>
                <span className='porcent'>
                    {/* calculamos el porcentaje de paquetes capturados en tiempo real */}
                    {percentaje}%
                </span>
            </div>
            <div className='progress-bar'>
                <div className='bar-porcent' style={{ width: `${percentaje}%` }}></div>
            </div>
            <div className='progress-footer'>
                <p className='progress-total'>{capturedCount} / {totalPackets} paquetes</p>
                <span className='interface'>Interfaz: {networkInterface}</span>
            </div>
        </div>
    );
}

export default CaptureProgress;
