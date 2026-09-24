import './ManipulationHeader.css';

function ManipulationHeader() {
    return (
        <header className='manipulation-header'>
            <h1 className='header-title'>
                Módulo de <span className='title-manipulation'>Manipulación de paquetes</span> 
            </h1>
            <p className='header-summary'>
                Manipula los paquetes capturados a tu gusto
            </p>
        </header>
    );
}

export default ManipulationHeader;
