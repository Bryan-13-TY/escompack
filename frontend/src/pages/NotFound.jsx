import './NotFound.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceDizzy } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';

export function NotFound() {
    return (
        <div className='not-found'>
            <div className='not-found-wrapper'>
                {/*<Header />*/}
                <main>
                    <section className='not-found-content'>
                        <div className='content-wrapper'>
                            <FontAwesomeIcon className='content-icon' icon={faFaceDizzy} size='10x' />
                            <div className='content-desc'>
                                <h1>404</h1>
                                <h2>Esta página no existe.</h2>
                            </div>
                            <Link to={'/home'}>
                                <Button
                                    buttonText='Volver al inicio'
                                    type='button'
                                    rol='back_home'
                                    position='before'
                                />
                            </Link>
                        </div>
                    </section>
                </main>
                {/*<Footer />*/}
            </div>
        </div>
    );
}
