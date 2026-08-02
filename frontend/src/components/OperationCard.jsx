import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from './Button';

import './OperationCard.css';

export function OperationCard({ icon, title, description, buttonText, pageLink }) {
    return (
        <div className="operation-card">
            <FontAwesomeIcon className='operation-card-icon' icon={icon} size='2x'/>
            <h3 className='operation-card-title'>{title}</h3>
            <p className='operation-card-desc'>{description}</p>
            <Link to={pageLink}>
                <Button
                    buttonText={buttonText}
                    type='button'
                />
            </Link>
        </div>
    );
}
