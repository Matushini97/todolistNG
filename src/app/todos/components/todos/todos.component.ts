import { Component, OnInit, inject } from '@angular/core'
import { TodosService } from '../../services/todos.service'
import { Observable } from 'rxjs'
import { DomainTodo, Todo } from '../../models/todos.modules'
import { AuthService } from 'src/app/core/services/auth.service'

@Component({
  selector: 'todo-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos$?: Observable<DomainTodo[]>
  inputText = ''

  private todosService = inject(TodosService)
  private authService = inject(AuthService)

  ngOnInit(): void {
    this.todos$ = this.todosService.todos$
    this.todosService.getTodos()
  }

  addTodoHandler() {
    this.todosService.addTodolist(this.inputText)
    this.inputText = ''
  }

  removeTodoHandler(todoId: string) {
    this.todosService.removeTodo(todoId)
  }

  editTodoHandler(data: { todoId?: string; title: string }) {
    this.todosService.editTodo(data)
  }

  logoutHandler() {
    this.authService.logout()
  }
}
