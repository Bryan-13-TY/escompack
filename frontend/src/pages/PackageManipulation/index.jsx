import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ManipulationHeader from './components/ManipulationHeader';
import FilterModal from './components/ManipulationModal';

import './index.css';


const FilterModalButton = ({onClick}) => {
    return (
        <button  onClick={onClick} type="button" className="manipulation-modal-button">
            <span>
                <FontAwesomeIcon
                    icon={faFileLines}
                    size="2x"
                />
            </span>
        </button>
    );
};

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
                {
                    isModalShown && (
                        <FilterModal onClick={toogleModal} />
                    )
                }
                <section className='temporal-section'>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default PackageManipulation;
