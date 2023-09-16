import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, map } from 'rxjs'
import { environment } from 'src/environments/environment'
import { GetTasksResponse, Task } from '../models/tasks.modules'

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks$ = new BehaviorSubject<Task[]>([])
  constructor(private http: HttpClient) {}

  getTodos(todoId: string): Observable<Task[]> {
    return this.http
      .get<GetTasksResponse>(`${environment.baseUrl}/todo-lists/${todoId}/tasks`)
      .pipe(map(res => res.items))
    // .subscribe(tasks => {
    //   this.tasks$.next(tasks)
    // })
  }
}
