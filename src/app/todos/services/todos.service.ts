import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, map } from 'rxjs'
import { DomainTodo, FilterType, Todo } from '../models/todos.modules'
import { CommonResponse } from 'src/app/core/models/core.models'

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos$ = new BehaviorSubject<DomainTodo[]>([])
  constructor(private http: HttpClient) {}

  getTodos() {
    this.http
      .get<Todo[]>(`${environment.baseUrl}/todo-lists`)
      .pipe(
        map(todos => {
          const newTodos: DomainTodo[] = todos.map(tl => ({ ...tl, filter: 'all' }))
          return newTodos
        })
      )
      .subscribe((todos: DomainTodo[]) => {
        this.todos$.next(todos)
      })
  }
  addTodolist(title: string) {
    this.http
      .post<CommonResponse<{ item: Todo }>>(`${environment.baseUrl}/todo-lists`, { title })
      .pipe(
        map(res => {
          const stateTodos = this.todos$.getValue()
          const newTodo: DomainTodo = { ...res.data.item, filter: 'all' }
          return [newTodo, ...stateTodos]
        })
      )
      .subscribe((todos: DomainTodo[]) => {
        this.todos$.next(todos)
      })
  }
  removeTodo(todoId: string) {
    this.http
      .delete<CommonResponse>(`${environment.baseUrl}/todo-lists/${todoId}`)
      .pipe(
        map(() => {
          return this.todos$.getValue().filter(todo => todo.id !== todoId)
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }

  editTodo(data: { todoId?: string; title: string }) {
    this.http
      .put<CommonResponse>(`${environment.baseUrl}/todo-lists/${data.todoId}`, {
        title: data.title,
      })
      .pipe(
        map(() => {
          return this.todos$
            .getValue()
            .map(todo => (todo.id === data.todoId ? { ...todo, title: data.title } : todo))
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }

  changeFilter(data: { filter: FilterType; todoId: string }) {
    const stateTodos = this.todos$.getValue()
    const newTodos = stateTodos.map(tl =>
      tl.id === data.todoId ? { ...tl, filter: data.filter } : tl
    )
    this.todos$.next(newTodos)
  }
}
