import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the React App</h1>
      <Link to="/form">Go to Form</Link>
    </div>
  );
};

export default HomePage;
