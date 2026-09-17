import './HomeHeader.css';

function HomeHeader() {
    return (
        <header className='home-header'>
            <h1 className='header-title'>
                Bienvenido a <span className='title-escom'>ESCOM</span>
                <span className='title-pack'>Pack</span>
            </h1>
            <p className='header-summary'>
                Una aplicación web para la captura y manipulación de paquetes de red
            </p>
            <p className='header-description'>
                Captura y manipula paquetes de red, y expórtalos para su posterior análisis en formato .pcap.
            </p>
        </header>
    );
}

export default HomeHeader;
