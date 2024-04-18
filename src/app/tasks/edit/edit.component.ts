import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Tasks } from '../store/tasks';
import { invokeUpdateTaskAPI } from '../store/tasks.action';
import { selectTaskById } from '../store/tasks.selector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss', '../../app.component.scss'],
})
export class EditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<Appstate>
  ) {}

  taskForm: Tasks = {
    id: "0",
    title: '',
    description: '',
    priority: 0,
    owner_id: 1
  };

  ngOnInit(): void {
    let fetchData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        var id = params.get('id');
        return this.store.pipe(select(selectTaskById(id)));
      })
    );
    fetchData$.subscribe((data) => {
      if (data) {
        this.taskForm = { ...data };
      }
      else{
        this.router.navigate(['./tasks']);
      }
    });
  }

  update() {
    this.store.dispatch(
      invokeUpdateTaskAPI({ updateTask: { ...this.taskForm } })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        this.router.navigate(['./tasks']);
      }
    });
  }
}
