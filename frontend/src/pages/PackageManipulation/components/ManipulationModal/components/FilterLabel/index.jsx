import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollHorizontal } from '@fortawesome/free-solid-svg-icons';

import './FilterLabel.css';

function FilterLabel({ results, protocol, date }) {
    return (
       <div className='label-information'>
            <FontAwesomeIcon icon={faSquarePollHorizontal} size='1x' className='information-results-icon' />
            <div className='results'>
                <p>{results} capturas encontradas para</p>
                <p><span>{protocol} </span>{`(${date})`}</p>
            </div>
        </div>
    );
}

export default FilterLabel;
