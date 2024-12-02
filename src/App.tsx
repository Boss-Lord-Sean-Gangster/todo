import React from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { useTodos } from './hooks/useTodos';
import { ClipboardList, AlertCircle } from 'lucide-react';

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, error } = useTodos();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <ClipboardList className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-800">Todo List</h1>
          </div>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}
          
          <TodoForm onAdd={addTodo} />
          
          <div className="mt-6">
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;