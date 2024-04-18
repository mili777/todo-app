import { createAction, props } from '@ngrx/store';
import { Tasks } from './tasks';

export const invokeTasksAPI = createAction(
  '[Tasks API] Invoke Tasks Fetch API'
);

export const tasksFetchAPISuccess = createAction(
  '[Tasks API] Fetch API Success',
  props<{ allTasks: Tasks[] }>()
);

export const invokeSaveNewTaskAPI = createAction(
  '[Tasks API] Inovke save new task api',
  props<{ newTask: Tasks }>()
);

export const saveNewTaskAPISucess = createAction(
  '[Tasks API] save new task api success',
  props<{ newTask: Tasks }>()
);

export const invokeUpdateTaskAPI = createAction(
  '[Tasks API] Inovke update task api',
  props<{ updateTask: Tasks }>()
);

export const updateTaskAPISucess = createAction(
  '[Tasks API] update  task api success',
  props<{ updateTask: Tasks }>()
);

export const invokeDeleteTaskAPI = createAction(
  '[Tasks API] Inovke delete task api',
  props<{id:string}>()
);

export const deleteTaskAPISuccess = createAction(
  '[Tasks API] deleted task api success',
  props<{id:string}>()
);