import { useState } from 'react';

import Header from '../../components/Header/index';
import Footer from '../../components/Footer/Footer';
import ManipulationHeader from './components/ManipulationHeader/ManipulationHeader';
import { FilterModalButton, FilterModal } from './components/ManipulationModal/ManipulationModal';

import './index.css';

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
