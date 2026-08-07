import { useNavigate } from 'react-router-dom';

import { NabVar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { ProtocolCard } from '../components/ProtocolCard';
import { INFO_PROTOCOL_CARDS } from '../constants';

import './PackageAbout.css';

export function PackageAbout() {
    return (
        <>
            <NabVar />
                <main>
                    <section className='about-protocol-cards-section'>
                        <div className='protocol-card-section-container'>
                            {
                                INFO_PROTOCOL_CARDS.map((protocol) => (
                                    <ProtocolCard
                                        key={protocol.acronym}
                                        icon={protocol.icon}
                                        acronym={protocol.acronym}
                                        rep={protocol.rep}
                                        tcpipLayer={protocol.tcpip_layer}
                                        layerClass={protocol.layer}
                                        functions={protocol.functions}
                                    />
                                ))
                            }
                        </div>
                    </section>
                </main>
            <Footer />
        </>
    );
}
