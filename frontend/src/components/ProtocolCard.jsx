import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from './Button';

import './ProtocolCard.css';

export function ProtocolCard({ icon, acronym, rep, tcpipLayer, layerClass, functions }) {
    return (
        <div className='protocol-card'>
            <div className='protocol-card-icon'>
                <img src={icon} alt="" width={70}/>
            </div>
            <div className='protocol-card-features'>
                <h3 className='protocol-card-acronym'>{acronym}</h3>
                <p className='protocol-rep'>{rep}</p>
                <div className='protocol-layer'>
                    <p className={`protocol-${layerClass}`}>{tcpipLayer}</p>
                </div>
                <p className='protocol-functions'>{functions}</p>
            </div>
            <div className='protocol-card-button'>
                <Button buttonText='Saber más' type='button'/>
            </div>
        </div>
    );
}
