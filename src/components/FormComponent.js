import React, { useState } from 'react';
import axios from 'axios';

const FormComponent = () => {
  const [data, setData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/endpoint`, { data })
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
