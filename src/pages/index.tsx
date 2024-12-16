import React from 'react';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import { Box, Typography, Container } from '@mui/material';

const Home = () => {
  return (
    <main>
      <Container
        maxWidth="xl"
        sx={{
          paddingTop: 4,
          paddingBottom: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 3,
            fontSize: { xs: '2rem', sm: '3rem' },
          }}
        >
          TODO App
        </Typography>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            marginBottom: 4,
          }}
        >
          <TodoForm />
          <TodoList />
        </Box>
      </Container>
    </main>
  );
};

export default Home;
