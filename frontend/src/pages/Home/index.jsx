import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HomeHeader from './components/HomeHeader';
import HomeOperationCards from './components/HomeOperationCards';
import HomeProtocolCards from './components/HomeProtocolCards';

import './index.css';

function Home() {
    return (
        <div className='home'>
            <Header />
            <main>
                <HomeHeader />
                <HomeOperationCards />
                <HomeProtocolCards />
            </main>
            <Footer />
        </div>
    );
}

export default Home;
