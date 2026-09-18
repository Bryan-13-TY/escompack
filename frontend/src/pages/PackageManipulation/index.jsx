import Header from '../../components/Header/index';
import Footer from '../../components/Footer/Footer';

import ManipulationHeader from './components/ManipulationHeader/ManipulationHeader';

import './index.css';

function PackageManipulation() {
    return (
        <div className='package-manipulation'>
            <Header />
            <main>
                <ManipulationHeader />
            </main>
            <Footer />
        </div>
    );
}

export default PackageManipulation;
