import { Link } from 'react-router-dom';

import escomPackNabvarIcon from '../assets/navbar-icon.PNG'

import './NavBar.css';

export function NabVar() {
    return (
        <nav>
            <div className='navbar-content'>
                <section className='content-image'>
                    <img src={escomPackNabvarIcon} alt="ESCOMpack icon" width={100}/>
                </section>
                <section className='content-list'>
                    <ul>
                        <Link to={'/'}><li className='list-element'>Inicio</li></Link>
                        <Link to={'/about'}><li className='list-element'>Protocolos</li></Link>
                    </ul>
                </section>
            </div>
        </nav>
    );
}
