import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import './Button.css';

export function Button({ buttonText, type = 'button' }) {
    return (
        <button type={type} className='cstm-btn'>
            <span>
                {buttonText}
                <FontAwesomeIcon
                    className='cstm-btn-icon'
                    icon={faArrowRight}
                />
            </span>
        </button>
    );
}
