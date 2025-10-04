// Un slice es una "porción" del estado global. Acá guardamos las tareas.
// Importamos helpers de Redux Toolkit
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Tipo de una tarea. Bien simple.
export type Task = {
  id: number;            // un número único (usaremos Date.now())
  title: string;         // título corto
  description: string;   // descripción más larga
};

// Tipo del estado inicial del slice
type InitialState = {
  tasks: Task[];
};

// Estado inicial (arranca vacío)
const initialState: InitialState = {
  tasks: [],
};

// Creamos el slice con nombre, estado inicial y reducers (acciones que cambian el estado)
const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    // 1) Guardar una nueva tarea
    // Recibe título y descripción, arma la Task con un id y la mete al array
    saveTask: (
      state,
      action: PayloadAction<{ title: string; description: string }>
    ) => {
      const newTask: Task = {
        id: Date.now(), // súper básico para tener un id único
        title: action.payload.title,
        description: action.payload.description,
      };
      state.tasks.push(newTask);
    },

    // 2) Editar una tarea existente (por id)
    updateTask: (
      state,
      action: PayloadAction<{ id: number; title: string; description: string }>
    ) => {
      const { id, title, description } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.title = title;
        task.description = description;
      }
    },

    // 3) Borrar una tarea por id
    deleteTask: (state, action: PayloadAction<{ id: number }>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
    },
  },
});

// Exportamos las actions individuales
export const { saveTask, updateTask, deleteTask } = toDoSlice.actions;

// Exportamos el reducer para enchufarlo al store
export default toDoSlice.reducer;
