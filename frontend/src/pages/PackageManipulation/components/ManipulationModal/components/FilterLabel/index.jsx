import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollHorizontal } from '@fortawesome/free-solid-svg-icons';

import './FilterLabel.css';

function FilterLabel({ results, protocol, date }) {
    const protocolIsEmpty = !protocol || protocol.trim() === "";
    const dateIsEmpty = !date || date.trim() === "";

    return (
       <div className='label-information'>
            <FontAwesomeIcon icon={faSquarePollHorizontal} size='1x' className='information-results-icon' />
            <div className='results'>
                <p>{results} capturas encontradas para</p>
                <p>
                    {!protocolIsEmpty && (
                        <span>{protocol} </span>
                    )}

                    {!dateIsEmpty && (
                        <span>{`(${date})`}</span>
                    )}
                </p>
            </div>
        </div>
    );
}

export default FilterLabel;
