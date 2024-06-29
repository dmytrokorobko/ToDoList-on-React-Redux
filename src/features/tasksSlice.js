import { createSlice } from "@reduxjs/toolkit";
import { initialTasks } from "../data/tasks";

const tasksSlice = createSlice({
   name: "tasks",
   initialState: initialTasks,
   reducers: {
      addTask: (state, action) => {
         state.unshift(action.payload);
      },

      removeTask: (state, action) => {
         return state.filter(todo => todo.id !== action.payload);
      },

      toggleComplete: (state, action) => {
         const task = state.find(t => t.id === action.payload);
         if (task) task.completed = !task.completed;
      }
   }
});

export const {addTask, removeTask, toggleComplete} = tasksSlice.actions;
export default tasksSlice.reducer;