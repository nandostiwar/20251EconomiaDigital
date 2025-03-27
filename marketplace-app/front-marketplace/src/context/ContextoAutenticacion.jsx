import { createContext, useState, useContext, useEffect } from 'react';

const ContextoAutenticacion = createContext(null);

export const ProveedorAutenticacion = ({ children }) => {
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const usuarioAlmacenado = localStorage.getItem('usuario');
    if (usuarioAlmacenado) {
      setUsuarioActual(JSON.parse(usuarioAlmacenado));
    }
    setCargando(false);
  }, []);

  const iniciarSesion = (datosUsuario) => {
    setUsuarioActual(datosUsuario);
    localStorage.setItem('usuario', JSON.stringify(datosUsuario));
  };

  const cerrarSesion = () => {
    setUsuarioActual(null);
    localStorage.removeItem('usuario');
  };

  return (
    <ContextoAutenticacion.Provider value={{
      usuarioActual,
      iniciarSesion,
      cerrarSesion,
      cargando
    }}>
      {children}
    </ContextoAutenticacion.Provider>
  );
};

export const useAuth = () => useContext(ContextoAutenticacion);