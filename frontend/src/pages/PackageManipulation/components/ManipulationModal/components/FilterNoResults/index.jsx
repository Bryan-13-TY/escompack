import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceDizzy } from '@fortawesome/free-solid-svg-icons';

import './FilterNoResults.css';

function FilterNoResults() {
    return (
        <div className="manipulation-no-results">
            <div className='no-results-content'>
                <FontAwesomeIcon className='content-icon' icon={faFaceDizzy} size='5x'/>
                <div className='content'>
                    <p>404</p>
                    <p>No se encontraron capturas</p>
                </div>
            </div>
        </div>
    );
}

export default FilterNoResults;
