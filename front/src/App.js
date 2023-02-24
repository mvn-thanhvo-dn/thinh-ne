import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}`);
    setTodos(res.data);
  };

  const viewEdit = (id) => {
    setIsEdit(true);
    setEditId(id);
    (async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/${id}`);
      setInput(res.data.task);
    })();
  };
  const handleUpsert = () => {
    (async () => {
      if (isEdit) {
        await axios.put(`${process.env.REACT_APP_API_URL}/${editId}`, {
          task: input,
        });
        alert('Update success');
        handleCancel()
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}`, {
          task: input,
        });
        alert('Add success');
        setInput("")
      }
      await getTodos()
    })()
  };
  const handleCancel = () => {
    setEditId(null)
    setIsEdit(false)
    setInput("")
  }
  const handleDelete = (id) => {
    (async () => {
      await axios.delete(`${process.env.REACT_APP_API_URL}/${id}`);
      alert('Delete success');
      await getTodos()
    })();
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App container">
      <div className="row mt-4">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Task
            </label>
            <input
              type="text"
              className="form-control"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <button
            onClick={handleUpsert}
            className="btn btn-primary"
          >
            {isEdit ? 'Update' : 'Add'}
          </button>
          {isEdit && (
            <button
              onClick={handleCancel}
              className="btn btn-primary"
            >
              Huỷ edit
            </button>
          )}
        </form>
      </div>
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Task</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return (
                <tr key={todo.id}>
                  <th scope="row">{todo.id}</th>
                  <td>{todo.task}</td>
                  <td>
                    <span
                      onClick={() => viewEdit(todo.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      Edit
                    </span>
                    <span> </span>
                    <span onClick={() => handleDelete(todo.id)} style={{ cursor: 'pointer' }}>
                      Delete
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
