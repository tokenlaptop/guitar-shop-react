import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { GuitarList } from './pages/GuitarList';
import { GuitarDetail } from './pages/GuitarDetail';
import { AdminDashboard } from './pages/AdminDashboard';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <header style={{ padding: '10px 20px', background: '#333', color: '#fff' }}>
        <nav style={{ display: 'flex', gap: '20px' }}>
          <Link to="/" style={{ color: '#fff' }}>Storefront</Link>
          <Link to="/admin" style={{ color: '#fff' }}>Admin Dashboard</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<GuitarList />} />
        <Route path="/guitars/:id" element={<GuitarDetail />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;