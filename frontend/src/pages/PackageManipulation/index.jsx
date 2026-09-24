import { useState } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ManipulationHeader from './components/ManipulationHeader';
import { FilterModalButton, FilterModal } from './components/ManipulationModal';

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
