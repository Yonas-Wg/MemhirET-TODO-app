import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';
import React from 'react';

const mockOnUpdate = jest.fn();
const mockOnDelete = jest.fn();

const todo = {
  id: 1,
  title: 'Test Todo',
  completed: false,
};

describe('TodoItem', () => {
  it('renders the todo item correctly', () => {
    render(<TodoItem todo={todo} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    
    expect(screen.getByText(/Test Todo/i)).toBeInTheDocument();
  });

  it('handles edit button click', () => {
    render(<TodoItem todo={todo} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    expect(mockOnUpdate).toHaveBeenCalled();
  });

  it('handles delete button click', () => {
    render(<TodoItem todo={todo} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });
});
