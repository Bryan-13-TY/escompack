import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from './Button';

import './OperationCard.css';

export function OperationCard({ icon, title, description, buttonText, pageLink }) {
    return (
        <div className="operation-card">
            <div className='operation-card-wrapper'>
                <FontAwesomeIcon className='operation-card-icon' icon={icon} size='2x' />
                <div className='operation-card-desc'>
                    <p className='card-title'>{title}</p>
                    <p className='card-desc'>{description}</p>
                </div>
                <Link to={pageLink}>
                    <Button
                        buttonText={buttonText}
                        type='button'
                    />
                </Link>
            </div>
        </div>
    );
}
