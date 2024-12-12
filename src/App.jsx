import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/login';
import { UserProvider } from './contexts/UserContext';
import HomEmpleado from './pages/empleados/homEmpleado';
import HomeHumanos from './pages/recursos-humanos/homeHumanos';
import GestionEmpleado from './pages/recursos-humanos/gestionEmpleado';
import Registro from './pages/registro-usuarios/registro';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/empleados" element={<HomEmpleado />} />
          <Route path="/recursos-humanos" element={<HomeHumanos />} />
          <Route path="/recursos-humanos/empleados" element={<GestionEmpleado />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
    </Router>
    </UserProvider>
    
  );
};

export default App;
