import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoList from './TodoList';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import React from 'react';


jest.mock('@tanstack/react-query');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('@/services/todoService', () => ({
  fetchTodos: jest.fn(),
  addTodo: jest.fn(),
  updateTodo: jest.fn(),
  deleteTodo: jest.fn(),
}));

describe('TodoList', () => {
  it('renders todos correctly', async () => {
    const mockTodos = [
      { id: 1, title: 'Test Todo 1', completed: false },
      { id: 2, title: 'Test Todo 2', completed: true },
    ];

    (useQuery as jest.Mock).mockReturnValue({ data: mockTodos, isLoading: false, error: null });

    render(<TodoList />);

    expect(screen.getByText('Todo List')).toBeTruthy();
    expect(screen.getByText('Test Todo 1')).toBeTruthy();
    expect(screen.getByText('Test Todo 2')).toBeTruthy();
  });

  it('handles adding a todo', async () => {
    const mockAddTodo = jest.fn();
  
    (useMutation as jest.Mock).mockReturnValue({ mutate: mockAddTodo });

    render(<TodoList />);

    const input = screen.getByLabelText(/new todo/i);
    fireEvent.change(input, { target: { value: 'New Todo' } });

    const addButton = screen.getByRole('button', { name: /add todo/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockAddTodo).toHaveBeenCalledWith('New Todo');
      expect(toast.success).toHaveBeenCalledWith('Todo added successfully!');
    });
  });

  it('handles deleting a todo', async () => {
    const mockDeleteTodo = jest.fn();
    
    (useMutation as jest.Mock).mockReturnValue({ mutate: mockDeleteTodo });

    render(<TodoList />);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDeleteTodo).toHaveBeenCalledWith(1);
      expect(toast.success).toHaveBeenCalledWith('Todo deleted successfully!');
    });
  });
});
