import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [aulas, setAulas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAulas();
  }, []);

  const fetchAulas = async () => {
    const { data, error } = await supabase.from('aulas').select('*');
    if (!error && data) {
      setAulas(data);
    }
  };

  const handleSelectAula = (aulaId) => {
    navigate(`/agendar?aulaId=${aulaId}`);
  };

  return (
    <div className="container py-4" style={{ maxWidth: '800px' }}>
      <h1 className="h3 mb-4 text-dark fw-bold">Aulas Disponíveis</h1>
      <div className="row g-3">
        {aulas.map((aula) => (
          <div key={aula.id} className="col-12 col-md-6">
            <div className="card h-100 border shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-dark fw-bold">{aula.nome}</h5>
                <p className="card-text text-muted mb-1">Instrutor: {aula.instrutor}</p>
                <p className="card-text text-muted mb-1">Horário: {aula.horario}</p>
                <p className="card-text text-muted mb-3">Vagas disponíveis: {aula.vagas_disponiveis}</p>
                <button
                  onClick={() => handleSelectAula(aula.id)}
                  className="btn btn-primary mt-auto w-100"
                >
                  Agendar Esta Aula
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}