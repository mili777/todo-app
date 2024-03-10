import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { TasksService } from '../tasks.service';
import {
  tasksFetchAPISuccess,
  deleteTaskAPISuccess,
  invokeTasksAPI,
  invokeDeleteTaskAPI,
  invokeSaveNewTaskAPI,
  invokeUpdateTaskAPI,
  saveNewTaskAPISucess,
  updateTaskAPISucess,
} from './tasks.action';
import { selectTasks } from './tasks.selector';

@Injectable()
export class TasksEffect {
  constructor(
    private actions$: Actions,
    private tasksService: TasksService,
    private store: Store,
    private appStore: Store<Appstate>
  ) {}

  loadAllTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeTasksAPI),
      withLatestFrom(this.store.pipe(select(selectTasks))),
      mergeMap(([, taskformStore]) => {
        if (taskformStore.length > 0) {
          return EMPTY;
        }
        return this.tasksService
          .get()
          .pipe(map((data) => tasksFetchAPISuccess({ allTasks: data })));
      })
    )
  );

  saveNewTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeSaveNewTaskAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.tasksService.create(action.newTask).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveNewTaskAPISucess({ newTask: data });
          })
        );
      })
    );
  });

  updateTaskAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeUpdateTaskAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.tasksService.update(action.updateTask).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return updateTaskAPISucess({ updateTask: data });
          })
        );
      })
    );
  });

  deleteTasksAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeDeleteTaskAPI),
      switchMap((actions) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.tasksService.delete(actions.id).pipe(
          map(() => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deleteTaskAPISuccess({ id: actions.id });
          })
        );
      })
    );
  });
}
