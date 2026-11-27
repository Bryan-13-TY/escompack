import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

import { PROTOCOL_CARDS } from '../../../constants';
import ProtocolCard from '../../../components/ProtocolCard';

import './index.css';

/**
 * Componente que renderiza la sección de las tarjetas de protocolo
 * de la vista principal.
 * 
 * @returns {React.JSX.Element}
 */
function HomeProtocolCards() {
    return (
        <section className='home-protocol-cards'>
            <div className='home-protocol-cards__title-section'>
                <div className='title'>
                    <FontAwesomeIcon
                        icon={faList}
                        size='2x'
                    />
                    <h2>Protocolos soportados</h2>
                </div>
                <p>Consulta los protocolos que <span>ESCOM</span>Pack ofrece, así como un ejemplo de una topología en GNS3 por cada uno para observar su comportamiento.</p>
            </div>
            <div className='home-protocol-cards__content-section'>
                {PROTOCOL_CARDS.map((protocol) => (
                    <ProtocolCard
                        key={protocol.acronym}
                        icon={protocol.icon}
                        acronym={protocol.acronym}
                        rep={protocol.rep}
                        description={protocol.description}
                        layer={protocol.layer}
                        layer_icon={protocol.layer_icon}
                    />
                ))}
            </div>
        </section>
    );
}

export default HomeProtocolCards;
