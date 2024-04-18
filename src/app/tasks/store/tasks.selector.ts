import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Tasks } from './tasks';

export const selectTasks = createFeatureSelector<Tasks[]>('mytasks');

export const selectTaskById = (taskId: string) =>
  createSelector(selectTasks, (tasks: Tasks[]) => {
    var taskbyId = tasks.filter((_) => _.id == taskId);
    if (taskbyId.length == 0) {
      return null;
    }
    return taskbyId[0];
  });
