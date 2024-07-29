import React, { useState } from 'react';
import API from '../services/api';

const FormComponent = () => {
  const [data, setData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post(`/api/endpoint`, { data })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
