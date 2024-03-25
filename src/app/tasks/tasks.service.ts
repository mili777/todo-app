import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tasks } from './store/tasks';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  private messageSource = new BehaviorSubject('1');
  currentMessage = this.messageSource.asObservable();

  value: any;

  changeMessage(message: string) {
    this.messageSource.next(message)
    this.value = message
    
  }
  get() {

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

  delete(id: number) {
    return this.http.delete(`http://localhost:3000/tasks/${id}`);
  }
}
