import DotGrid from '@/components/DotGrid';
import Particles from '@/components/Particles';
import AcidSquares from '@/components/AcidSquares';
import LetterGlitch from '@/components/LetterGlitch';
import Beams from '@/components/Beams';
import GradientWaves from '@/components/GradientWaves';

import escomPackIcon from '../../../../assets/others/icon-v2.png';

import './index.css';

/**
 * Componente que renderiza el header la vista principal.
 * 
 * @returns {React.JSX.Element}
 */
function HomeHeader() {
    return (
        <header className='home-header'>
            <div className='home-header--background'>
                <Beams
    color="#0080d0"
    beamWidth={140}
    rotation={30}
    speed={1}
    glow={0.6}
  />

            </div>
            <div className='home-header__application-desc'>
                <h1 className='application-title'>
                    Bienvenido a <span className='application-title__escom'>ESCOM</span>Pack
                </h1>
                <p className='application-desc'>
                    Una aplicación web para la captura y manipulación de paquetes de red
                </p>
                <p className='application-summary'>
                    Captura y manipula paquetes de red, y expórtalos para su posterior análisis en formato .pcap.
                </p>
            </div>
            <img className='home-header__application-icon' src={escomPackIcon} alt="" width={300}/>
        </header>
    );
}

export default HomeHeader;
