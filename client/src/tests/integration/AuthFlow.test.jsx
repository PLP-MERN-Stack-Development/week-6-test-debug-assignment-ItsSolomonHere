import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

function LoginForm({ onLogin }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  return (
    <form onSubmit={async e => {
      e.preventDefault();
      setError('');
      const res = await onLogin(email, password);
      if (!res.success) setError(res.error);
    }}>
      <input
        aria-label="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        aria-label="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {error && <span role="alert">{error}</span>}
    </form>
  );
}

describe('LoginForm Auth Flow', () => {
  it('shows error on failed login', async () => {
    const onLogin = jest.fn(() => Promise.resolve({ success: false, error: 'Invalid credentials' }));
    render(<LoginForm onLogin={onLogin} />);
    fireEvent.change(screen.getByLabelText('email'), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByLabelText('password'), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByText('Login'));
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials');
    });
  });
  it('calls onLogin with email and password', async () => {
    const onLogin = jest.fn(() => Promise.resolve({ success: true }));
    render(<LoginForm onLogin={onLogin} />);
    fireEvent.change(screen.getByLabelText('email'), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByLabelText('password'), { target: { value: 'pass' } });
    fireEvent.click(screen.getByText('Login'));
    await waitFor(() => {
      expect(onLogin).toHaveBeenCalledWith('a@b.com', 'pass');
    });
  });
}); 