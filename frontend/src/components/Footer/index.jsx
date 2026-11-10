import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import escomPackIcon from '../../assets/others/icon-v2.png';

import './index.css';

/**
 * Componente que renderiza un footer.
 * 
 * @returns {React.JSX.Element}
 */
function Footer() {
    return (
        <footer className='footer'>
            <div className="footer-second-icon">
                <img src={escomPackIcon} alt="" width={40}/>
            </div>
            <div className="footer-content">
                <div className='content-version'>
                    <p>© 2026 ESCOMPack</p>
                    <span>v2.4.2-stable</span>
                </div>
                <img src={escomPackIcon} alt="" width={40} className="content-main-icon"/>
                <div className="content-contact">
                    <a href='mailto:bgarciae1900@alumno.ipn-mx' target='_blank'>
                        <FontAwesomeIcon icon={faEnvelope} size='1x' />
                    </a>
                    <a href='https://www.linkedin.com/in/bryan-alexis-garc%C3%ADa-escamilla-798512411/' target='_blank'>
                        <FontAwesomeIcon icon={faLinkedin} size='1x' />
                    </a>
                    <a href='https://github.com/Bryan-13-TY' target='_blank'>
                        <FontAwesomeIcon icon={faGithub} size='1x' />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
