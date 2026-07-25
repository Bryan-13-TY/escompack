import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Welcome } from './pages/Welcome';
import { PackageCapture } from './pages/PackageCapture';
import { PackageManipulation } from './pages/PackageManipulation';

// Aquí se definen que componente se muestra en cada URL
function App() {
    return (
        // Sincroniza la URL con la interfaz de usuario
        <BrowserRouter>
            {/* Elije que componente mostrar según la URL */}
            <Routes>
                <Route path='/' element={<Welcome />} />
                <Route path='/capture' element={<PackageCapture />}/>
                <Route path='/manipulation' element={<PackageManipulation />}/>
            </Routes>  
        </BrowserRouter>
    );
}

export default App;
