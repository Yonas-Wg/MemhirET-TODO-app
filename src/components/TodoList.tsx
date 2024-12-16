import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '@/services/todoService';
import TodoItem from './TodoItem';
import { CircularProgress, Box, Typography, Grid, Card, CardContent, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const TodoList = () => {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);

  const { data: todos, isLoading, error } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] }); 
      setOpenDialog(false);
      setTodoToDelete(null);
    },
  });
  
  const addMutation = useMutation({
    mutationFn: (todo: string) => addTodo({ title: todo, completed: false }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] }); 
    },
  });
  

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Todo }) => updateTodo({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });


  const formik = useFormik({
    initialValues: {
      newTodo: '',
    },
    validationSchema: Yup.object({
      newTodo: Yup.string()
        .required('Todo is required')
        .min(3, 'Todo must be at least 3 characters')
        .max(50, 'Todo must be less than 50 characters'),
    }),
    onSubmit: (values) => {
      if (values.newTodo.trim()) {
        addMutation.mutate(values.newTodo);
        formik.resetForm();
      }
    },
  });

  const handleUpdate = (id: number, title: string) => {
    const todoToUpdate = todos?.find(todo => todo.id === id);
    if (todoToUpdate) {
      const updatedTodo = { id, title, completed: !todoToUpdate.completed };
      updateMutation.mutate({ id, data: updatedTodo });
    }
  };
  


  const handleDeleteClick = (id: number) => {
    setTodoToDelete(id);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (todoToDelete !== null) {
      deleteMutation.mutate(todoToDelete);
      toast.success('Todo deleted successfully!'); 
    }
  };

  const handleDeleteCancel = () => {
    setOpenDialog(false);
    setTodoToDelete(null);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error instanceof Error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">{`Error: ${error.message}`}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography sx={{ mt: 10, ml: 2 }} variant="h4" gutterBottom>
        Todo List
      </Typography>

      <Grid container spacing={2}>
        {todos?.map((todo) => (
          <Grid item xs={12} sm={6} md={3} key={todo.id} sx={{ m: 2 }}>
            <Card>
              <CardContent>
              <TodoItem
  todo={todo}
  onUpdate={handleUpdate}
  onDelete={handleDeleteClick}
/>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Todo</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this todo item?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TodoList;
