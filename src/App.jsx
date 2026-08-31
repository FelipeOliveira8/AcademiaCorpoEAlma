import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Agendar from './pages/Agendar';
import MeusAgendamentos from './pages/MeusAgendamentos';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-vh-100 bg-light">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agendar" element={<Agendar />} />
            <Route path="/meus-agendamentos" element={<MeusAgendamentos />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}