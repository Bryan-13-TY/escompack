import Button from '../../../../../../components/Button';

import './FilterModalFooter.css';

function FilterModalFooter({ onClick, }) {
    return (
        <footer className="modal-footer">
            <Button
                buttonText='Cerrar'
                type='button'
                onClick={onClick}
                icon={false}
            />
        </footer>
    );
}

export default FilterModalFooter;
