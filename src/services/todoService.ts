import axios from '@/lib/axios';
import { Todo } from '@/types/todo';

export const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const response = await axios.get('/todos');
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw new Error('Failed to fetch todos');
  }
};

export const addTodo = async (todo: { title: string; completed: boolean }): Promise<Todo> => {
  try {
    const response = await axios.post('/todos', todo);
    return response.data;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw new Error('Failed to add todo');
  }
};

export const updateTodo = async ({ id, data }: { id: number; data: { title: string; completed: boolean } }) => {
    try {
      console.log('Updating Todo:', { id, data });
      const response = await axios.put(`/todos/${id}`, data);
      console.log('Update Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  };
  
  
export const deleteTodo = async (id: number): Promise<void> => {
  try {
    await axios.delete(`/todos/${id}`);
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw new Error('Failed to delete todo');
  }
};
