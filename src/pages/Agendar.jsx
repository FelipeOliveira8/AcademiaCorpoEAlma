import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function Agendar() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [aulas, setAulas] = useState([]);
  const [formData, setFormData] = useState({
    aulaId: searchParams.get('aulaId') || '',
    nomeAluno: '',
    emailAluno: '',
    dataAgendamento: ''
  });
  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    const loadAulas = async () => {
      const { data } = await supabase.from('aulas').select('*');
      if (data) setAulas(data);
    };
    loadAulas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { aulaId, nomeAluno, emailAluno, dataAgendamento } = formData;

    if (!aulaId || !nomeAluno || !emailAluno || !dataAgendamento) {
      setMensagem({ tipo: 'erro', texto: 'Preencha todos os campos.' });
      return;
    }

    const { error } = await supabase.from('agendamentos').insert([
      {
        aula_id: aulaId,
        nome_aluno: nomeAluno,
        email_aluno: emailAluno,
        data_agendamento: dataAgendamento
      }
    ]);

    if (error) {
      setMensagem({ tipo: 'erro', texto: 'Erro ao realizar agendamento.' });
    } else {
      setMensagem({ tipo: 'sucesso', texto: 'Agendamento realizado com sucesso!' });
      setTimeout(() => navigate('/meus-agendamentos'), 1500);
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: '500px' }}>
      <h1 className="h3 mb-4 text-dark fw-bold">Novo Agendamento</h1>
      {mensagem && (
        <div className={`alert ${mensagem.tipo === 'sucesso' ? 'alert-success' : 'alert-danger'}`} role="alert">
          {mensagem.texto}
        </div>
      )}
      <form onSubmit={handleSubmit} className="card p-4 border shadow-sm">
        <div className="mb-3">
          <label className="form-label text-muted">Selecione a Aula</label>
          <select
            name="aulaId"
            value={formData.aulaId}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">-- Selecione --</option>
            {aulas.map((aula) => (
              <option key={aula.id} value={aula.id}>
                {aula.nome} ({aula.horario})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label text-muted">Nome Completo</label>
          <input
            type="text"
            name="nomeAluno"
            value={formData.nomeAluno}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-muted">E-mail</label>
          <input
            type="email"
            name="emailAluno"
            value={formData.emailAluno}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-muted">Data</label>
          <input
            type="date"
            name="dataAgendamento"
            value={formData.dataAgendamento}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
        >
          Confirmar Agendamento
        </button>
      </form>
    </div>
  );
}