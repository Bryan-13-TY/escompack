import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { ThemeProvider } from './hooks/ThemeContext';
import Home from './pages/Home/index';
import PackageCapture from './pages/PackageCapture/index';
import PackageManipulation from './pages/PackageManipulation';
import NotFound from './pages/NotFound/NotFound';

// aquí se define que componente se muestra en cada URL
function App() {
    return (
        // todas las vistas tienen acceso al tema
        <ThemeProvider>
            {/* sincroniza la URL con la interfaz de usuario */}
            <BrowserRouter>
                {/* elije que componente mostrar según la URL */}
                <Routes>
                    {/* rediriir a Home */}
                    <Route path='/' element={<Navigate to='/home' replace />} />

                    {/* vistas validas */}
                    <Route path='/home' element={<Home />} />
                    <Route path='/capture' element={<PackageCapture />} />
                    <Route path='/manipulation' element={<PackageManipulation />} />

                    {/* cualquier otro path muestra el 404 */}
                    <Route path='*' element={<NotFound />} />
                </Routes>  
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
