import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function MeusAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  const fetchAgendamentos = async () => {
    const { data, error } = await supabase
      .from('agendamentos')
      .select('*, aulas(nome, horario, instrutor)');
    
    if (!error && data) {
      setAgendamentos(data);
    }
  };

  const handleCancelar = async (id) => {
    const { error } = await supabase.from('agendamentos').delete().eq('id', id);
    if (!error) {
      setAgendamentos((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: '800px' }}>
      <h1 className="h3 mb-4 text-dark fw-bold">Agendamentos Realizados</h1>
      {agendamentos.length === 0 ? (
        <p className="text-muted">Nenhum agendamento encontrado.</p>
      ) : (
        <div className="d-flex flex-column gap-3">
          {agendamentos.map((item) => (
            <div key={item.id} className="card border shadow-sm">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title mb-1 fw-bold text-dark">{item.aulas?.nome}</h5>
                  <p className="card-text text-muted mb-1">Aluno: {item.nome_aluno} ({item.email_aluno})</p>
                  <p className="card-text text-muted mb-0">Data: {item.data_agendamento} | Horário: {item.aulas?.horario}</p>
                </div>
                <button
                  onClick={() => handleCancelar(item.id)}
                  className="btn btn-outline-danger btn-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}