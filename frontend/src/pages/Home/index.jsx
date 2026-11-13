import Particles from '@/components/Particles/Particles.jsx';
import ShapeGrid from '@/components/ShapeGrid/ShapeGrid.jsx';
import LetterGlitch from '@/components/LetterGlitch/LetterGlitch.jsx';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HomeHeader from './components/HomeHeader';
import HomeOperationCards from './components/HomeOperationCards';
import HomeProtocolCards from './components/HomeProtocolCards';

import './index.css';

/**
 * Componente que renderiza la vista principal de la aplicación.
 * 
 * @returns {React.JSX.Element}
 */
function Home() {
    return (
        <div className='home'>
            <Header />
            <main className='home__main'>
                <div className='home__main--background'>
                    {/*<Particles
                        particleColors={["#dedede","#0080d0","#d3d3d3"]}
                        particleCount={4000}
                        particleSpread={14.5}
                        speed={0.4}
                        particleBaseSize={125}
                        glow={0.4}
                        twinkle={0.2}
                        moveParticlesOnHover
                        hoverEffect="parallax"
                        sizeRandomness={0.9}
                        drift="forward"
                        connections
                        clickBurst={false}
                        alphaParticles
                        disableRotation
                        lightMode={false}
                    />*/}

                    {/*<ShapeGrid
                        shape="square"
                        direction="diagonal"
                        lineColor="#0080d0"
                        hoverColor="#dedede"
                        hoverFillColor="#d3d3d3"
                        fillOpacity={0.15}
                        cellSize={40}
                        speed={0.5}
                        tiltX={0}
                        tiltY={0}
                        rainbow={false}
                    />*/}

                    <LetterGlitch
                        glitchColors={["#0080d0","#d3d3d3"]}
                        glitchAmount={0.5}
                        speed={1}
                        flow={0.5}
                        clickEffect="tear"
                        baseColor="#dedede"
                        font="system"
                        charset="classic"
                    />
                </div>
                <HomeHeader />
                <HomeOperationCards />
                <HomeProtocolCards />
            </main>
            <Footer />
        </div>
    );
}

export default Home;
