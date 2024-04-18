import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/appstate';
import { invokeDeleteTaskAPI } from '../store/tasks.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { DataService } from 'src/app/shared/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  task_id: string;
  subscription: Subscription;
  
  constructor(public dialogRef: MatDialogRef<DialogComponent>,private store: Store, private appStore: Store<Appstate>,private dataService: DataService) {
    this.subscription = this.dataService.task_id$.subscribe(task_id => {
      this.task_id = task_id;
    });
   }

  delete() {    
    
    this.store.dispatch(
      invokeDeleteTaskAPI({
        id: this.task_id,
      })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        //this.deleteModal.hide();
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
      }
    });
  }

  ngOnInit(): void {
  }

}
