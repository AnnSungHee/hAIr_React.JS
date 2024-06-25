import React from 'react';
import { render, screen, act } from '@testing-library/react'; // act를 명시적으로 가져오기
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders HomePage component for the default route', () => {
  act(() => { // act로 감싸기
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
  });
  expect(screen.getByText(/welcome to the react app/i)).toBeInTheDocument();
  expect(screen.getByText(/go to form/i)).toBeInTheDocument();
});

test('renders FormPage component for the /form route', () => {
  act(() => { // act로 감싸기
    render(
      <MemoryRouter initialEntries={['/form']}>
        <App />
      </MemoryRouter>
    );
  });
  expect(screen.getByText(/submit your data/i)).toBeInTheDocument();

  const submitButtons = screen.getAllByText(/submit/i);
  expect(submitButtons.length).toBeGreaterThan(0);
});
