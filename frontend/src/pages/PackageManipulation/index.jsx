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
                        <FilterModal />
                    )
                }
                <section>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime pariatur excepturi eaque dignissimos aperiam ipsa cupiditate impedit. Rem cupiditate quasi officia ullam illo distinctio nam provident perferendis? Cum, fugit quidem!
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default PackageManipulation;
