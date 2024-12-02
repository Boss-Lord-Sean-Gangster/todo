import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for todos
let todos = [];

// Get all todos
app.get('/', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/', (req, res) => {
  const { text } = req.body;
  
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const newTodo = {
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: new Date()
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Toggle todo completion
app.patch('/:id', (req, res) => {
  const { id } = req.params;
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todo.completed = !todo.completed;
  res.json(todo);
});

// Delete a todo
app.delete('/:id', (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos = todos.filter(t => t.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Todo backend server running at http://localhost:${port}`);
});