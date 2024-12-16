import React, { useState } from 'react';
import { Button, TextField, Typography, Card, CardContent, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

type TodoItemProps = {
  todo: {
    id: number;
    title: string;
    completed: boolean;
  };
  onUpdate: (id: number, title: string) => void;
  onDelete: (id: number) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (newTitle.trim()) {
      onUpdate(todo.id, newTitle);
      setIsEditing(false);
      toast.success('Todo updated successfully!'); 
    } else {
      toast.error('Title cannot be empty!');  
    }
  };

  const handleDeleteClick = () => {
    onDelete(todo.id);
  };

  return (
    <Card sx={{ marginBottom: 2, padding: 2 }}>
    <CardContent sx={{ flexGrow: 1 }}>
      {isEditing ? (
        <Box>
          <TextField
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            label="Edit Todo"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 1 }}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleSaveClick}>
              Save
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            flexDirection: { xs: 'column', sm: 'row' }, // Stack items on small screens
            gap: 1, // Add gap between elements in small view
          }}
        >
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              textDecoration: todo.completed ? 'line-through' : 'none',
              wordBreak: 'break-word', // Ensures long text breaks correctly
            }}
          >
            {todo.title}
          </Typography>
          <Box display="flex" flexDirection="row" gap={2}>
            <button
              aria-label="edit"
              className="MuiIconButton-root"
              style={{ justifyContent: 'center' }}
              onClick={handleEditClick}
            >
              <EditIcon />
            </button>
            <button
              aria-label="delete"
              className="MuiIconButton-root"
              style={{ color: 'red' }}
              onClick={handleDeleteClick}
            >
              <DeleteIcon />
            </button>
          </Box>
        </Box>
      )}
    </CardContent>
  </Card>
  
  );
};

export default TodoItem;
