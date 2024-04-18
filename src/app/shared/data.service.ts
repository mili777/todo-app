import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private task_id = new Subject<string>();
  task_id$ = this.task_id.asObservable();

  setTaskId(data: string) {
    this.task_id.next(data);
    console.log(data);
    
  }
}