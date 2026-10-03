import { useState } from 'react';

import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ManipulationHeader from './components/ManipulationHeader';
import FilterModal from './components/ManipulationModal';

import './index.css';

/**
 * Componente que renderiza el botón para mostrar la ventana modal del
 * filtro de capturas.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {function} props.onClick - Función callback que se ejecuta al hacer clic en el botón. 
 * @returns {React.JSX.Element}
 */
const FilterModalButton = ({ onClick }) => {
    return (
        <button  onClick={onClick} type='button' className='manipulation-modal-button'>
            <span>
                <FontAwesomeIcon
                    icon={faFileLines}
                    size='2x'
                />
            </span>
        </button>
    );
};

FilterModalButton.propTypes = {
    /** Función callback que se ejecuta al hacer clic en el botón */
    onClick: PropTypes.func.isRequired,
};

/**
 * Componente que renderiza la vista de manipulación de paquetes
 * de la aplicación.
 * 
 * @returns {React.JSX.Element}
 */
function PackageManipulation() {
    const [isModalShown, setIsModalShown] = useState(true);
    
    const toogleModal = () => {
        setIsModalShown(!isModalShown);
    };

    return (
        <div className='package-manipulation'>
            <Header />
            <main>
                <ManipulationHeader />
                <FilterModalButton onClick={toogleModal}/>
                {isModalShown && (
                    <FilterModal onClick={toogleModal} />
                )}
                <section className='temporal-section'>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default PackageManipulation;
