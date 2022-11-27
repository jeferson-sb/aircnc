import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../services/api';
import camera from '../../assets/camera.svg';
import './styles.css';

export default function New() {
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const navigate = useNavigate()

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    const user_id = localStorage.getItem('@aircnc/user');
    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    await api.post('/api/spots', data, {
      headers: { user_id },
    });

    navigate('/profile');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label
        id='thumbnail'
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? 'has-thumbnail' : ''}
      >
        <input type='file' onChange={(e) => setThumbnail(e.target.files[0])} />
        <img src={camera} alt='Box with icon camera to upload' />
      </label>

      <label htmlFor='company'>COMPANY *</label>
      <input
        id='company'
        value={company}
        placeholder='Your amazing company'
        onChange={(e) => setCompany(e.target.value)}
      />

      <label htmlFor='company'>
        TECH STACK * (comma separated)
      </label>
      <input
        id='techs'
        placeholder='Which technologies they use?'
        value={techs}
        onChange={(e) => setTechs(e.target.value)}
      />

      <label htmlFor='company'>
        DAILY COST * <span>(leave it blank for FREE)</span>
      </label>
      <input
        id='price'
        placeholder='How much is it cost daily ?'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button type='submit' className='btn'>
        Sign up
      </button>
    </form>
  );
}
