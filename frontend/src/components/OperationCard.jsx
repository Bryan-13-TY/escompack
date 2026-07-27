import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import './OperationCard.css';

export function OperationCard({ icon, title, description, buttonText, pageLink }) {
    return (
        <div className="card">
            <FontAwesomeIcon className='icon' icon={icon} size='2x' flip/>
            <h3>{title}</h3>
            <p>{description}</p>
            <Link to={pageLink}>
                <button>
                    <span>
                        {buttonText}
                        <FontAwesomeIcon
                            className='button-icon'
                            icon={faArrowRight}
                        />
                    </span>
                </button>
            </Link>
        </div>
    );
}
