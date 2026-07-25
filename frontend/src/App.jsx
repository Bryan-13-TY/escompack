import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Welcome } from './pages/Welcome';
import { PackageCapture } from './pages/PackageCapture';
import { PackageManipulation } from './pages/PackageManipulation';

// aquí se definen que componente se muestra en cada URL
function App() {
    return (
        // sincroniza la URL con la interfaz de usuario
        <BrowserRouter>
            {/* elije que componente mostrar según la URL */}
            <Routes>
                <Route path='/' element={<Welcome />} />
                <Route path='/capture' element={<PackageCapture />}/>
                <Route path='/manipulation' element={<PackageManipulation />}/>
                <Route path='*' element={<Welcome />} />
            </Routes>  
        </BrowserRouter>
    );
}

export default App;
