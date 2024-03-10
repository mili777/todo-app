import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tasks } from './store/tasks';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}
  get() {
    return this.http.get<Tasks[]>('http://localhost:3000/tasks');
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

  delete(id: number) {
    return this.http.delete(`http://localhost:3000/tasks/${id}`);
  }
}
