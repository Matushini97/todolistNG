import { Component, Input, Output, EventEmitter, inject } from '@angular/core'
import { DomainTodo, FilterType, Todo } from 'src/app/todos/models/todos.modules'
import { TodosService } from 'src/app/todos/services/todos.service'

@Component({
  selector: 'todo-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  isEditMode = false
  newTitle = ''

  @Input() todo!: DomainTodo
  @Output() removeTodoEvent = new EventEmitter<string>()
  @Output() editTodoEvent = new EventEmitter<{ todoId?: string; title: string }>()

  private todosService = inject(TodosService)

  deleteListHandler() {
    this.removeTodoEvent.emit(this.todo?.id)
  }

  toggleEditMode() {
    this.newTitle = this.todo?.title
    this.isEditMode = true
  }

  editTitleHandler() {
    this.isEditMode = false
    this.editTodoEvent.emit({ todoId: this.todo?.id, title: this.newTitle })
  }
  changeFilterHandler(filter: FilterType) {
    this.todosService.changeFilter({ filter, todoId: this.todo.id })
  }
}
