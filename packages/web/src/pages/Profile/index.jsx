import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import api from '../../services/api';
import './styles.css';

export default function Profile() {
  const apiURL = api.defaults.baseURL;
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);
  const user_id = localStorage.getItem('@aircnc/user');
  const socket = useMemo(
    () =>
      socketio(apiURL, {
        query: { user_id },
      }),
    [user_id, apiURL]
  );

  useEffect(() => {
    socket.on('booking_request', (data) => {
      setRequests([...requests, data]);
    });
  }, [requests, socket]);

  useEffect(() => {
    async function loadSpots() {
      const response = await api.get('/api/profile', {
        headers: {
          user_id,
        },
      });

      setSpots(response.data);
    }
    loadSpots();
  }, []);

  async function handleAccept(id) {
    await api.post(`/api/bookings/${id}/approvals`);
    setRequests(requests.filter((request) => request._id !== id));
  }

  async function handleReject(id) {
    await api.post(`/api/bookings/${id}/rejections`);
    setRequests(requests.filter((request) => request._id !== id));
  }

  return (
    <>
      {!spots.length ? <p>You do not have any spot booked yet.</p> : null}
      <ul className='notifications'>
        {requests.map((request) => (
          <li key={request._id}>
            <p>
              <strong>{request.user.name}</strong> is requesting a spot at
              <strong>{request.spot.company}</strong> for this date:{' '}
              <strong>{request.date}</strong>
            </p>
            <button
              className='accept'
              onClick={() => handleAccept(request._id)}
            >
              ACCEPT
            </button>
            <button
              className='reject'
              onClick={() => handleReject(request._id)}
            >
              DECLINE
            </button>
          </li>
        ))}
      </ul>
      <ul className='spot-list'>
        {spots.map((spot) => (
          <li key={spot._id}>
            <figure>
              <img src={spot.thumbnail_url} alt={`${spot.company} Space`} />
            </figure>
            <strong>{spot.company}</strong>
            <span>{spot.price ? `$${spot.price}/day` : 'FREE'}</span>
            <details>
              <summary>Techs</summary>
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
        Book new spot
      </Link>
    </>
  );
}
