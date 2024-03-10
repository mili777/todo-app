import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { taskReducer } from './store/tasks.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffect } from './store/tasks.effect';
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [HomeComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    FormsModule,
    StoreModule.forFeature('mytasks', taskReducer),
    EffectsModule.forFeature([TasksEffect])
  ],
})
export class TasksModule {}