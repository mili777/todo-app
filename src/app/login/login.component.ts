import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { TasksService } from '../tasks/tasks.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../app.component.scss']
})
export class LoginComponent implements OnInit {

  owner_id: number;
  subscription: Subscription;
  loginError$ = false;

  constructor(private store: Store<any>,private _router : Router, private http: HttpClient, private data: TasksService) {
  }
   
  usersDB = this.http.get('http://localhost:3000/users');

  login(username, password) {
    this.usersDB.forEach(user => {
      let result = Object.keys(user).map((key) => [user[key]]);
      result.forEach(user => {
        if(user[0].username === username && user[0].password === password) {
          this.subscription = this.data.currentId.subscribe(owner_id => this.owner_id = user[0].id)
          this.data.currentUserID(user[0].id)
          localStorage.setItem('currentUser', JSON.stringify({ username: username, admin: user[0].admin, id: user[0].id }));
          this._router.navigateByUrl('tasks');
        } else {
          this.loginError$ = true;
        }
      })
    });
  }

  ngOnInit(): void {
  }

}