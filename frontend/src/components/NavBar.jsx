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
                       <li className='list-element'>Acerca de</li>
                       <li className='list-element'>Acerca de</li>
                       <li className='list-element'>Acerca de</li> 
                    </ul>
                </section>
            </div>
        </nav>
    );
}
