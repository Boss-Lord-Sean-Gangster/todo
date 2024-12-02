import { useState, useEffect } from 'react';
import { Todo } from '../types/todo';
import * as todoApi from '../api/todoApi';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const fetchedTodos = await todoApi.fetchTodos();
      setTodos(fetchedTodos);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error(err);
    }
  }

  const addTodo = async (text: string) => {
    try {
      const newTodo = await todoApi.createTodo(text);
      setTodos(prev => [...prev, newTodo]);
      setError(null);
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const updatedTodo = await todoApi.toggleTodo(id);
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? updatedTodo : todo
        )
      );
      setError(null);
    } catch (err) {
      setError('Failed to toggle todo');
      console.error(err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  return { todos, addTodo, toggleTodo, deleteTodo, error };
}