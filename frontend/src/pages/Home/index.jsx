import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HomeHeader from './components/HomeHeader/HomeHeader';
import HomeOperationCards from './components/HomeOperationCards/HomeOperationCards';
import HomeProtocolCards from './components/HomeProtocolCards/HomeProtocolCards';

import './index.css';

function Home() {
    return (
        <div className='home'>
            <div className='home-wrapper'>
                <Header />
                <main>
                    <HomeHeader />
                    <HomeOperationCards />
                    <HomeProtocolCards />
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default Home;
