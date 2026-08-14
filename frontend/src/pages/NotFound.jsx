import './NotFound.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceDizzy } from '@fortawesome/free-solid-svg-icons';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function NotFound() {
    return (
        <div className='not-found'>
            <div className='not-found-wrapper'>
                <Header />
                <main>
                    <div className='not-found-title'>
                        <FontAwesomeIcon className='not-found-icon' icon={faFaceDizzy} size='10x' />
                        <h1>404</h1>
                        <h2>Esta página no existe</h2>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}
