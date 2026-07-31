import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import './OperationCard.css';

export function OperationCard({ icon, title, description, buttonText, pageLink }) {
    return (
        <div className="operation-card">
            <FontAwesomeIcon className='operation-card-icon' icon={icon} size='2x' flip/>
            <h3 className='operation-card-title'>{title}</h3>
            <p className='operation-card-desc'>{description}</p>
            <Link to={pageLink}>
                <button>
                    <span>
                        {buttonText}
                        <FontAwesomeIcon
                            className='operation-card-btn-icon'
                            icon={faArrowRight}
                        />
                    </span>
                </button>
            </Link>
        </div>
    );
}
