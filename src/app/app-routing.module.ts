import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FrontpageComponent } from './frontpage/frontpage.component';

const routes: Routes = [
  {
    path: '',
    component: FrontpageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./tasks/tasks.module').then((b) => b.TasksModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}