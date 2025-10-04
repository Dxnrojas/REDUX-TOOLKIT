import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { saveTask, updateTask, deleteTask } from "../redux/slices/toDoSlice";
import "./ToDo.css";

/* =====================
   Interfaces (tipado)
   ===================== */
interface ToDoForm {
  title: string;
  description: string;
}

interface EditState {
  id: number | null;
  title: string;
  description: string;
}

/* =====================
   Componente
   ===================== */
const ToDo = () => {
  // Formulario para crear
  const [form, setForm] = useState<ToDoForm>({ title: "", description: "" });

  // Edición simple en línea (una tarea a la vez)
  const [edit, setEdit] = useState<EditState>({
    id: null,
    title: "",
    description: "",
  });

  // Store
  const tasks = useSelector((state: RootState) => state.toDo.tasks);
  const dispatch = useDispatch<AppDispatch>();

  // Handlers de formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const title = form.title.trim();
    const description = form.description.trim();
    if (!title) return;
    dispatch(saveTask({ title, description }));
    setForm({ title: "", description: "" });
  };

  // Editar en línea
  const startEdit = (id: number, title: string, description: string) => {
    setEdit({ id, title, description });
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEdit((prev) => ({ ...prev, [name]: value }));
  };

  const saveEditTask = () => {
    if (edit.id === null) return;
    const title = edit.title.trim();
    const description = edit.description.trim();
    if (!title) return;
    dispatch(updateTask({ id: edit.id, title, description }));
    setEdit({ id: null, title: "", description: "" });
  };

  const cancelEdit = () => {
    setEdit({ id: null, title: "", description: "" });
  };

  // Borrar: inmediato, sin confirmación
  const removeTask = (id: number) => {
    dispatch(deleteTask({ id }));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">ToDo con Redux Toolkit</h1>

      {/* Crear tarea */}
      <form onSubmit={handleAdd} className="todo-form">
        <label>
          <span className="todo-label">Título</span>
          <input
            className="todo-input"
            type="text"
            name="title"
            value={form.title}
            placeholder="Ej: Comprar pan"
            onChange={handleChange}
          />
        </label>

        <label>
          <span className="todo-label">Descripción</span>
          <textarea
            className="todo-textarea"
            rows={3}
            name="description"
            value={form.description}
            placeholder="Ej: Ir a la panadería de la esquina"
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="btn btn-primary">Agregar</button>
      </form>

      {/* Lista */}
      {tasks.length === 0 ? (
        <p>No hay tareas todavía. ¡Agregá la primera!</p>
      ) : (
        <ul className="todo-list">
          {tasks.map((t) => (
            <li key={t.id} className="todo-item">
              {edit.id === t.id ? (
                <div className="todo-edit">
                  <input
                    className="todo-input"
                    type="text"
                    name="title"
                    value={edit.title}
                    onChange={handleEditChange}
                  />
                  <textarea
                    className="todo-textarea"
                    rows={3}
                    name="description"
                    value={edit.description}
                    onChange={handleEditChange}
                  />
                  <div className="todo-actions">
                    <button className="btn btn-primary" onClick={saveEditTask}>
                      Guardar
                    </button>
                    <button className="btn btn-muted" onClick={cancelEdit}>
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <strong className="todo-item-title">{t.title}</strong>
                  <div className="todo-item-desc">{t.description}</div>
                  <div className="todo-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => startEdit(t.id, t.title, t.description)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeTask(t.id)}
                    >
                      Borrar
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ToDo;
