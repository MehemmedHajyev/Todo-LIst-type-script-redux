import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import uuid from "react-uuid";

const initialStateMy = [];

export const todoSlice = createSlice({
  name: "todos",
  initialState : initialStateMy,
  reducers: {
    add: (state, action) => {
      const newTodo = { id: uuid(), ...action.payload , completed: false };
      state.push(newTodo);
    },
    remove: (state, action) => {
      let id = action.payload
      return state.filter((todo) => todo.id !== id);
    },
    markCompleted: (state, action) => {
      let id = action.payload
      const todo = state.find((todo) => todo.id === id);
      todo['completed'] = true;
    },
    markNotCompleted: (state, action) => {
      let id = action.payload
      const todo = state.find((todo) => todo.id === id);
      todo.completed = false;
    },
    changeStatus: (state, action) => {
        let id = action.payload
        let status =  action.payload.status
        const todo = state.find((todo) => todo.id === id);
        todo.completed = false;
    },
    markAllCompleted: (state) => {
      return state.map((todo) => ({ ...todo, completed: true }));
    },
    deleteCompleted: (state) => {
      return state.filter((todo) => !todo.completed);
    },
  },
});

export const {
  add,
  markCompleted,
  markNotCompleted,
  remove,
  markAllCompleted,
  deleteCompleted,
} = todoSlice.actions;

export default todoSlice.reducer;