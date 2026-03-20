import { useState } from 'react';

function AddTodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('Общее');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    onAdd(text, priority, category);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{
      marginBottom: '25px',
      padding: '20px',
      borderRadius: '10px',
      background: '#f1f3f5',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      {/* текст */}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите задачу..."
        style={{
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid #ccc'
        }}
      />

      {/* строка с select */}
      <div style={{
        display: 'flex',
        gap: '10px'
      }}>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{ flex: 1, padding: '10px' }}
        >
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ flex: 1, padding: '10px' }}
        >
          <option value="Общее">Общее</option>
          <option value="Учёба">Учёба</option>
          <option value="Работа">Работа</option>
          <option value="Дом">Дом</option>
          <option value="Отдых">Отдых</option>
        </select>
      </div>

      <button
  type="submit"
  style={{
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    background: 'linear-gradient(135deg, #4CAF50, #2e7d32)',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '15px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    transition: '0.2s'
  }}
>
  ➕ Добавить задачу
</button>
    </form>
  );
}

export default AddTodoForm;