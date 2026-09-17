import './HomeHeader.css';

function HomeHeader() {
    return (
        <section className='home-welcome'>
            <div className='home-welcome-wrapper'>
                <p className='welcome'>
                    Bienvenido a <span className='welcome-escom'>ESCOM</span>
                    <span className='welcome-pack'>Pack</span>
                </p>
                <h1 className='summary'>
                    {`Una aplicación web para
                    la captura y manipulación
                    de paquetes de red`}
                </h1>
                <p className='description'>
                    {`Captura y manipula paquetes de red, 
                    y exportalos para su posterior análisis
                    en formato .pcap.`}
                </p>
            </div>
        </section>
    );
}

export default HomeHeader;
