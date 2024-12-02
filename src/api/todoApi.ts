const API_URL = 'http://localhost:3000';

export async function fetchTodos() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json();
}

export async function createTodo(text: string) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) {
    throw new Error('Failed to create todo');
  }
  return response.json();
}

export async function toggleTodo(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
  });
  if (!response.ok) {
    throw new Error('Failed to toggle todo');
  }
  return response.json();
}

export async function deleteTodo(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
}