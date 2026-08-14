import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from './Button';

import './ProtocolCard.css';

export function ProtocolCard({ icon, acronym, rep, description }) {
    return (
        <div className='protocol-card'>
            <div className='protocol-card-wrapper'>
                <div className='protocol-card-label'>
                    <img src={icon} alt="" width={60}/>
                    <div className='protocol-card-acronym'>
                        <span className='acronym'>{acronym}</span>
                        <p className='rep'>{rep}</p>
                    </div>
                </div>
                <p className='protocol-card-desc'>{description}</p>
            </div>
        </div>
    );
}
