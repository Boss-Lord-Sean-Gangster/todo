import React from 'react';
import { Todo } from '../types/todo';
import { Trash2, Check, X } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
            ${
              todo.completed
                ? 'border-green-500 bg-green-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
        >
          {todo.completed && <Check size={14} className="text-white" />}
        </button>
        <span
          className={`text-gray-800 ${
            todo.completed ? 'line-through text-gray-500' : ''
          }`}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-gray-500 hover:text-red-500 focus:outline-none"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}