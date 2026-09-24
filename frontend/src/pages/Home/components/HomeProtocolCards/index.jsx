import { PROTOCOL_CARDS } from '../../../../constants';
import ProtocolCard from '../../../../components/ProtocolCard';
import { useTheme } from '../../../../hooks/ThemeContext';

import './HomeProtocolCards.css';

function HomeProtocolCards() {
    const { theme } = useTheme();

    return (
        <section className='home-protocol-cards'>
            <h2>Protocolos soportados</h2>
            <div className='cards-grid'>
                {
                    PROTOCOL_CARDS.map((protocol) => (
                        <ProtocolCard
                            key={protocol.acronym}
                            icon={protocol.icon[theme]}
                            acronym={protocol.acronym}
                            rep={protocol.rep}
                            description={protocol.description}
                        />
                    ))
                }
            </div>
        </section>
    );
}

export default HomeProtocolCards;
