import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { invokeTasksAPI, invokeDeleteTaskAPI } from '../store/tasks.action';
import { selectTasks } from '../store/tasks.selector';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DataService } from 'src/app/shared/data.service';


declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../app.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store, private appStore: Store<Appstate>, public dialog: MatDialog, private _router : Router,private dataService: DataService) {}

  tasks$ = this.store.pipe(select(selectTasks));

  deleteModal: any;
  idToDelete: number = 0;

  currentUser = JSON.parse(localStorage.getItem('currentUser'))
  isAdmin

  ngOnInit(): void {    
    if(this.currentUser === null || this.currentUser === "undefined") {
      this.logout()
    } else {
      this.isAdmin = this.currentUser.admin
    }
    this.deleteModal = document.getElementById('deleteModal')
    this.store.dispatch(invokeTasksAPI());
  }

  storeID(id) {    
    this.dataService.setTaskId(id);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openDeleteModal(id: number) {
    this.dialog.open(this.deleteModal, {
      width: '250px'
    });
    this.idToDelete = id;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this._router.navigateByUrl('/login').then(() => {
      window.location.reload();})
  }
}

