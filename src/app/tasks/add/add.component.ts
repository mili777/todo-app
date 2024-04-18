import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Tasks } from '../store/tasks';
import { invokeSaveNewTaskAPI } from '../store/tasks.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss', '../../app.component.scss'],
})
export class AddComponent implements OnInit {
  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router
  ) {}
  
  value: string = window.localStorage.getItem('currentUser');
  model: Object = JSON.parse(this.value);
  

  taskForm: Tasks = {
    id: Math.floor(Math.random() * 1000000000).toString(),
    title: '',
    description: '',
    priority: 0,
    owner_id: this.model["id"]
  };

  ngOnInit(): void {}

  save() {
    this.store.dispatch(invokeSaveNewTaskAPI({ newTask: this.taskForm }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
         this.router.navigate(['/tasks']);
      }
    });
  }
}