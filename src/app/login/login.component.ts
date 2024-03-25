import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { TasksService } from '../tasks/tasks.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message:string;
  subscription: Subscription;

  constructor(private store: Store<any>,private _router : Router, private http: HttpClient, private data: TasksService) {
  }
   
  
  usersDB = this.http.get('http://localhost:3000/users');


  // @Output() onLogin = new EventEmitter<any>();
  // @Output() onAdmin = new EventEmitter<any>();

  i = -1;
  login(username, password) {
    this.usersDB.forEach(user => {
      this.i++;
      if(user[this.i].username === username && user[this.i].password === password) {
        // this.onLogin.emit(true);
        // this.onAdmin.emit(user[this.i].admin);
        this.subscription = this.data.currentMessage.subscribe(message => this.message = user[this.i].id)
        this.data.changeMessage(user[this.i].id)
        this._router.navigateByUrl('/tasks');
      }
      
    });
  }

  ngOnInit(): void {
  }

}