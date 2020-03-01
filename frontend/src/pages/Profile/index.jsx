import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import api from '../../services/api';
import './styles.css';

export default function Profile() {
  const apiURL = api.defaults.baseURL;
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);
  const user_id = localStorage.getItem('user');
  const socket = useMemo(
    () =>
      socketio(apiURL, {
        query: { user_id }
      }),
    [user_id]
  );

  useEffect(() => {
    socket.on('booking_request', data => {
      setRequests([...requests, data]);
    });
  }, [requests, socket]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user');
      const response = await api.get('/profile', {
        headers: {
          user_id
        }
      });

      setSpots(response.data);
    }
    loadSpots();
  }, []);

  async function handleAccept(id) {
    await api.post(`/bookings/${id}/approvals`);
    setRequests(requests.filter(request => request._id !== id));
  }

  async function handleReject(id) {
    await api.post(`/bookings/${id}/rejections`);
    setRequests(requests.filter(request => request._id !== id));
  }

  return (
    <>
      <ul className='notifications'>
        {requests.map(request => (
          <li key={request._id}>
            <p>
              <strong>{request.user.name}</strong> está solicitando uma reserva
              em <strong>{request.spot.company}</strong> para a data{' '}
              <strong>{request.date}</strong>
            </p>
            <button
              className='accept'
              onClick={() => handleAccept(request._id)}
            >
              ACEITAR
            </button>
            <button
              className='reject'
              onClick={() => handleReject(request._id)}
            >
              REJEITAR
            </button>
          </li>
        ))}
      </ul>
      <ul className='spot-list'>
        {spots.map(spot => (
          <li key={spot._id}>
            <figure>
              <img src={spot.thumbnail_url} alt={`${spot.company} Space`} />
            </figure>
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
            <details>
              <summary>Tecnologias</summary>
              <ul className='techs'>
                {spot.techs.map((tech, index) => (
                  <li key={index}>
                    <span>
                      <span className='check'>&#x2713;</span> {tech}
                    </span>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
      <Link to='/new' className='btn'>
        Cadastrar novo spot
      </Link>
    </>
  );
}
