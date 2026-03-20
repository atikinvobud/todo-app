import { useState } from 'react';

function TodoItem({ task, onToggle, onDelete, onUpdate, isDark }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const priorityColor = {
    low: 'green',
    medium: 'orange',
    high: 'red'
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editText.trim()) {
      onUpdate(task.id, editText);
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px',
      marginBottom: '6px',
      borderRadius: '6px',
      background: isDark ? '#333' : '#fafafa'
    }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      {isEditing ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          style={{
            flex: 1,
            textDecoration: task.completed ? 'line-through' : 'none',
            cursor: 'pointer'
          }}
        >
          {task.text}
        </span>
      )}

      <span style={{ color: priorityColor[task.priority] }}>
        {task.priority}
      </span>

      <button onClick={() => onDelete(task.id)}>✕</button>
    </div>
  );
}

export default TodoItem;