import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // estado para guardar el tema seleccionado
    const [theme, setTheme] = useState(() => {
        // verificamos el tema guardado en localStorage
        const savedTheme = localStorage.getItem('theme');

        // devolvemos el tema guardado en localStorage
        if (savedTheme) return savedTheme;

        // si no hay un tema guardado, usamos el del sistema operativo
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    /* para guardar en el localStarage el tema seleccionado
    y cambiarlo la clase en el HTML
    se ejecuta cada que 'theme' cambia */
    useEffect(() => {
        const root = document.documentElement; // Elemento <html>

        // actualizamos la clase en el HTML
        if (theme === 'dark') {
            root.classList.add('dark');
            root.classList.remove('light');
        } else {
            root.classList.add('light');
            root.classList.remove('dark');
        }

        // guardamos el tema en el localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    // actualizamos el estado del tema
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

/* hook personalizado para consumir el
tema en cualquier componente */
export const useTheme = () => useContext(ThemeContext);
