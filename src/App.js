import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './assets/styles/App.css';
import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/form" element={<FormPage />} />
    </Routes>
  );
}

export default App;
