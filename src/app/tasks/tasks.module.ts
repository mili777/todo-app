import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { taskReducer } from './store/tasks.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffect } from './store/tasks.effects';
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';


@NgModule({
  declarations: [HomeComponent, AddComponent, EditComponent, DialogComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    FormsModule,
    StoreModule.forFeature('mytasks', taskReducer),
    EffectsModule.forFeature([TasksEffect]),
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule
  ],
})
export class TasksModule {}
