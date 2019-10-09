import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await api.post('/sessions', { name, email });
    const { _id } = res.data;
    localStorage.setItem('user', _id);
    history.push('/profile');
  };

  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre
        <strong> talentos</strong> para sua empresa
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          placeholder="Seu nome"
          autoComplete="off"
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor="email">E-mail *</label>
        <input
          type="email"
          id="email"
          placeholder="Seu e-mail"
          autoComplete="off"
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit" className="btn">
          Cadastrar
        </button>
      </form>
    </>
  );
}
