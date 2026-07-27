import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import escomPackIcon from '../assets/icon.png'

import './Footer.css';

export function Footer() {
    return (
        <footer>
            <section className='footer-image'>
                <img src={escomPackIcon} alt="ESCOMPack icon" width={55} />
            </section>
            <section className='footer-info'>
                <p className='info-general'>© 2026 ESCOMPack. Todos los derechos reservados. </p>
                <p className='info-contact'>
                    Escríbenos a bgarciae1900@alumno.ipn.mx
                    <a className='contact-github'  href="https://github.com/Bryan-13-TY" target='_blank'>
                        <FontAwesomeIcon icon={faGithub} color='white' />
                    </a>
                    <a
                        className='contact-linkedin'
                        href="https://www.linkedin.com/in/bryan-alexis-garc%C3%ADa-escamilla-798512411/"
                        target='_blank'>
                        <FontAwesomeIcon icon={faLinkedin} color='white' />
                    </a>
                </p>
            </section>
        </footer>
    )
}
