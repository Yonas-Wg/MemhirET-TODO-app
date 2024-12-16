import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoForm from './TodoForm';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import React from 'react';

jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('TodoForm', () => {
  it('renders the form correctly', () => {
    render(<TodoForm />);
    
    expect(screen.getByLabelText(/new todo/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /add todo/i })).toBeTruthy();
  });

  it('submits the form and shows success toast', async () => {
    const mutateMock = jest.fn();
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isLoading: false,
    });

    render(<TodoForm />);

    const input = screen.getByLabelText(/new todo/i);
    const submitButton = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith({ title: 'Test Todo', completed: false });
      expect(toast.success).toHaveBeenCalledWith('Todo added successfully!');
    });
  });
});
