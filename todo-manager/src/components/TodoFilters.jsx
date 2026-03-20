function TodoFilters({ filter, onFilterChange, activeCount }) {
  const filters = [
    { key: 'all', label: 'Все' },
    { key: 'active', label: 'Активные' },
    { key: 'completed', label: 'Выполненные' }
  ];

  return (
    <div style={{
      marginBottom: '20px',
      padding: '15px',
      borderRadius: '10px',
      background: '#f1f3f5'
    }}>
      <p style={{ marginBottom: '10px' }}>
        Осталось задач: <b>{activeCount}</b>
      </p>

      <div style={{
        display: 'flex',
        gap: '10px'
      }}>
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              background:
                filter === f.key
                  ? 'linear-gradient(135deg, #4CAF50, #2e7d32)'
                  : '#e0e0e0',
              color: filter === f.key ? 'white' : '#333',
              transition: '0.2s'
            }}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TodoFilters;