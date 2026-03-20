import { useState, useEffect } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoFilters from './components/TodoFilters';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    const parsed = saved ? JSON.parse(saved) : [];

    return parsed.map(todo => ({
      ...todo,
      priority: todo.priority || 'medium',
      category: todo.category || 'Общее'
    }));
  });

  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const addTodo = (text, priority, category) => {
    setTodos([...todos, {
      id: Date.now(),
      text,
      completed: false,
      priority,
      category
    }]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const updateTodo = (id, text) => {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, text } : t
    ));
  };

  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const groupedTodos = filteredTodos.reduce((acc, t) => {
    if (!acc[t.category]) acc[t.category] = [];
    acc[t.category].push(t);
    return acc;
  }, {});

  const isDark = theme === 'dark';

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark ? '#1e1e1e' : '#f4f6f8',
      padding: '30px',
      color: isDark ? '#fff' : '#000'
    }}>
      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        background: isDark ? '#2a2a2a' : '#fff',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ textAlign: 'center' }}>Менеджер задач</h1>

        <div style={{
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '20px'
}}>
  <button
    onClick={() => setTheme(isDark ? 'light' : 'dark')}
    style={{
      padding: '10px 20px',
      borderRadius: '20px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 'bold',
      background: isDark
        ? 'linear-gradient(135deg, #444, #222)'
        : 'linear-gradient(135deg, #ffe082, #ffca28)',
      color: isDark ? '#fff' : '#333',
      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
      transition: '0.3s'
    }}
  >
    {isDark ? '🌙 Тёмная тема' : '☀ Светлая тема'}
  </button>
</div>

        <AddTodoForm onAdd={addTodo} />

        <TodoFilters
          filter={filter}
          onFilterChange={setFilter}
          activeCount={todos.filter(t => !t.completed).length}
        />

        {Object.keys(groupedTodos).length === 0 ? (
          <p style={{ textAlign: 'center' }}>Нет задач</p>
        ) : (
          Object.keys(groupedTodos).map(category => (
            <div key={category} style={{ marginBottom: '20px' }}>
              <h3>{category}</h3>
              {groupedTodos[category].map(todo => (
                <TodoItem
                  key={todo.id}
                  task={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onUpdate={updateTodo}
                  isDark={isDark}
                />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;