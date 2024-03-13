import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { invokeTasksAPI, invokeDeleteTaskAPI } from '../store/tasks.action';
import { selectTasks } from '../store/tasks.selector';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';


declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store, private appStore: Store<Appstate>, public dialog: MatDialog) {}

  tasks$ = this.store.pipe(select(selectTasks));

  deleteModal: any;
  idToDelete: number = 0;

  ngOnInit(): void {
    this.deleteModal = document.getElementById('deleteModal')

    this.store.dispatch(invokeTasksAPI());
  }

  openDeleteModal(id: number) {
    this.dialog.open(this.deleteModal, {
      width: '250px'
    });
    this.idToDelete = id;
    //this.deleteModal.show();
  }

  delete() {
    this.store.dispatch(
      invokeDeleteTaskAPI({
        id: this.idToDelete,
      })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.deleteModal.hide();
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
      }
    });
  }
}
