import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodo } from '@/services/todoService';
import { Box, TextField, Button, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

const TodoForm = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(Yup.object({
      title: Yup.string().trim().required('Todo title is required').min(3, 'Todo must be at least 3 characters long'),
    })),
  });

  const mutation = useMutation({
    mutationFn: async (todo: { title: string; completed: boolean }) => addTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      reset(); 

   
      toast.success('Todo added successfully!');
    },
    onError: () => {
     
      toast.error('Failed to add Todo!');
    },
  });

  const onSubmit = (data: { title: string }) => {
    if (data.title.trim()) {
      mutation.mutate({ title: data.title, completed: false });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2, 
        mb: 2, 
      }}
    >
      <TextField
        {...register('title')}
        label="New Todo"
        variant="outlined"
        placeholder="Enter your todo"
        sx={{ backgroundColor: '#fff', flexGrow: 1 }}
        error={!!errors.title}
        helperText={errors.title ? errors.title.message : ''}
      />

<Button
  type="submit"
  variant="contained"
  color="primary"
  disabled={mutation.status === 'pending'}
  sx={{
    padding: '12px',
    fontWeight: 'bold',
    fontSize: '16px',
    textTransform: 'none',
  }}
>
  {mutation.status === 'pending' ? <CircularProgress size={24} color="inherit" /> : 'Add Todo'}
</Button>

    </Box>
  );
};

export default TodoForm;
