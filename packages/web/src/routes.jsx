import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import New from './pages/New';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/new" element={<New />} />
      </Routes>
    </BrowserRouter>
  );
}
