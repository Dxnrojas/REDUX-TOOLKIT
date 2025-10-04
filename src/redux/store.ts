import { configureStore } from "@reduxjs/toolkit";
import toDoReducer from "./slices/toDoSlice";

// El store es el "estado global" de toda la app.
export const store = configureStore({
  reducer: {
    toDo: toDoReducer, // nombre de la llave en el estado: state.toDo
  },
});

// Tipos para usar con TypeScript sin dolor
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
