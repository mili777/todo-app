import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tasks } from './store/tasks';
import { BehaviorSubject } from 'rxjs';
import { log } from 'console';


@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  private currentUserIDSource = new BehaviorSubject(1);
  currentId = this.currentUserIDSource.asObservable();

  value: number;

  currentUserID(owner_id: number) {
    this.currentUserIDSource.next(owner_id)
    this.value = owner_id
  }

  get() {
    let value: string = window.localStorage.getItem('currentUser');
    let model: Object = JSON.parse(value);

    if(this.value === undefined) {
      this.value = model["id"]
    }

    if(model["admin"]) {
      return this.http.get<Tasks[]>(`http://localhost:3000/tasks`);
    }
    
    return this.http.get<Tasks[]>(`http://localhost:3000/tasks?owner_id=${this.value}`);
  }

  create(payload: Tasks) {
    return this.http.post<Tasks>('http://localhost:3000/tasks', payload);
  }

  update(payload: Tasks) {
    return this.http.put<Tasks>(
      `http://localhost:3000/tasks/${payload.id}`,
      payload
    );
  }

  delete(id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(`http://localhost:3000/tasks/${id}`, {headers: headers});

  }
}
