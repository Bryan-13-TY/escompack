import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import escomPackIcon from '../assets/others/icon-v2.png'

import './Footer.css';

export function Footer() {
    return (
        <footer>
            <div className='footer-wrapper'>
                <div className='footer-content-wrapper'>
                    <div className='footer-secondary-icon'>
                        <img src={escomPackIcon} alt="ESCOMPack icon" width={50} />
                    </div>
                    <div className='footer-content'>
                        <div className='footer-version'>
                            <p>© 2026 ESCOMPack</p>
                            <span>v2.4.1-stable</span>
                        </div>
                        <div className='footer-main-icon'>
                            <img src={escomPackIcon} alt="ESCOMPack icon" width={50} />
                        </div>
                        <div className='footer-contact'>
                            <p>Contáctanos</p>
                            <div className='contact-social-media'>
                                <a href='mailto:bgarciae1900@alumno.ipn-mx' target='_blank'>
                                    <FontAwesomeIcon icon={faEnvelope} size='2x'/>
                                </a>
                                <a href='https://www.linkedin.com/in/bryan-alexis-garc%C3%ADa-escamilla-798512411/' target='_blank'>
                                    <FontAwesomeIcon icon={faLinkedin} size='2x'/>
                                </a>
                                <a href='https://github.com/Bryan-13-TY' target='_blank'>
                                    <FontAwesomeIcon icon={faGithub} size='2x'/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
