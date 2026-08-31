import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          Corpo e Alma
        </Link>
        <div className="navbar-nav ms-auto">
          <Link to="/" className="nav-link">
            Aulas
          </Link>
          <Link to="/agendar" className="nav-link">
            Agendar
          </Link>
          <Link to="/meus-agendamentos" className="nav-link">
            Meus Agendamentos
          </Link>
        </div>
      </div>
    </nav>
  );
}