import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Todo } from 'src/app/todos/models/todos.modules'

@Component({
  selector: 'todo-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  isEditMode = false
  newTitle = ''

  @Input() todo!: Todo
  @Output() removeTodoEvent = new EventEmitter<string>()
  @Output() editTodoEvent = new EventEmitter<{ todoId?: string; title: string }>()
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
}
