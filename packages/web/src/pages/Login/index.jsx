import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../services/api';

export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post('/api/sessions', { name, email });
    const { _id } = res.data;
    localStorage.setItem('@aircnc/user', _id);
    navigate('/profile');
  };

  return (
    <>
      <p>
        Offer <strong>spots</strong> for programmers and find
        <strong> talents</strong> for your company
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          placeholder='Your name'
          autoComplete='off'
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor='email'>E-mail *</label>
        <input
          type='email'
          id='email'
          placeholder='Your e-mail'
          autoComplete='off'
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type='submit' className='btn'>
          Sign up
        </button>
      </form>
    </>
  );
}
