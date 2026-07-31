import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ProtocolCard.css';

export function ProtocolCard({ icon, acronym, rep_es, rep_en, tcpip_layer, functions }) {
    return (
        <div className='protocol-card'>
            <div className='protocol-card-icon'>
                <img src={icon} alt="" width={70}/>
            </div>
            <h3 className='protocol-card-acronym'>{acronym}</h3>
            <div className='protocol-card-protocol'>
                <p className='protocol-rep-en'>{rep_en}</p>
                <p className='protocol-rep-es'>{rep_es}</p>
            </div>
            <div className='protocol-card-tcpip-layer'>
                {tcpip_layer}
            </div>
            <p className='protocol-card-functions'>{functions}</p>
        </div>
    );
}
