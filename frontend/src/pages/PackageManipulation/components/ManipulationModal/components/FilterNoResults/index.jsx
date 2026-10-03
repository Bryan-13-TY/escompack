import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceDizzy } from '@fortawesome/free-solid-svg-icons';

import './FilterNoResults.css';

/**
 * Componente que renderiza un 404 cuando no hay resultados que
 * coincidan con el filtro.
 * 
 * @returns {React.JSX.Element}
 */
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
