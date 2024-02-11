import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Container from './components/Container';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import { Button } from '@mui/material';
import Login from './pages/Login';
import Register from './pages/Register';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Cadastros = lazy(() => import('./pages/Cadastros'));
const Agendamentos = lazy(() => import('./pages/Agendamentos'));

const App: React.FC = () => {
  const isLoggedIn = false; // Defina isso com base na autenticação do usuário

  if (isLoggedIn) {
    return (
      <Router>
        <Container>
          
          <Sidebar>
            <Link to="/">
              <Button>Dashboard</Button>
            </Link>
            <Link to="/cadastros">
              <Button>Cadastros</Button>
            </Link>
            <Link to="/agendamentos">
              <Button>Agendamentos</Button>
            </Link>
          </Sidebar>
          <Content>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/cadastros" element={<Cadastros />} />
                <Route path="/agendamentos" element={<Agendamentos />} />
              </Routes>
            </Suspense>
          </Content>
        </Container>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/cadastro" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
