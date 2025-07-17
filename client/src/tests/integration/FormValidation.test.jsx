import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

function SimpleForm({ onSubmit }) {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');
  return (
    <form onSubmit={e => {
      e.preventDefault();
      if (!value) setError('Field required');
      else {
        setError('');
        onSubmit(value);
      }
    }}>
      <input
        aria-label="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button type="submit">Submit</button>
      {error && <span role="alert">{error}</span>}
    </form>
  );
}

describe('SimpleForm Integration', () => {
  it('shows validation error if field is empty', () => {
    render(<SimpleForm onSubmit={jest.fn()} />);
    fireEvent.click(screen.getByText('Submit'));
    expect(screen.getByRole('alert')).toHaveTextContent('Field required');
  });
  it('calls onSubmit with value if field is filled', () => {
    const onSubmit = jest.fn();
    render(<SimpleForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText('input'), { target: { value: 'hello' } });
    fireEvent.click(screen.getByText('Submit'));
    expect(onSubmit).toHaveBeenCalledWith('hello');
  });
}); 