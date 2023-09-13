import { Component, OnInit, inject } from '@angular/core'
import { TodosService } from '../../services/todos.service'
import { Observable } from 'rxjs'
import { Todo } from '../../models/todos.modules'

@Component({
  selector: 'todo-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos$?: Observable<Todo[]>
  inputText = ''

  todosService = inject(TodosService)

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
}
