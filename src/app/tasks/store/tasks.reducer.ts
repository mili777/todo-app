import { createReducer, on } from '@ngrx/store';
import { Tasks } from './tasks';
import { tasksFetchAPISuccess, deleteTaskAPISuccess, saveNewTaskAPISucess, updateTaskAPISucess } from './tasks.action';

export const initialState: ReadonlyArray<Tasks> = [];

export const taskReducer = createReducer(
  initialState,
  on(tasksFetchAPISuccess, (state, { allTasks }) => {
    return allTasks;
  }),
  on(saveNewTaskAPISucess, (state, { newTask }) => {
    let newState = [...state];
    newState.unshift(newTask);
    return newState;
  }),
  on(updateTaskAPISucess, (state, { updateTask }) => {
    let newState = state.filter((_) => _.id != updateTask.id);
    newState.unshift(updateTask);
    return newState;
  }),
  on(deleteTaskAPISuccess, (state, { id }) => {
    let newState =state.filter((_) => _.id != id);
    return newState;
  })
);
