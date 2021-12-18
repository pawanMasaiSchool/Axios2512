function TodoElement({ title, status, id, handleDelete, handleToggleStatus }) {
  return (
    <div>
      <div>
        Title: {title} --- {`${status}`}
        <button onClick={() => handleToggleStatus(id, status)}>Toggle</button>
      </div>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  );
}

export default TodoElement;
