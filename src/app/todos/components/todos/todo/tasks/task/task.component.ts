import { Component, EventEmitter, Input, Output } from '@angular/core'
import { TaskStatusEnum } from 'src/app/core/enums/taskStatus.enum'
import { Task, UpdateTaskModel } from 'src/app/todos/models/tasks.modules'

@Component({
  selector: 'todo-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: Task
  @Output() removeTaskEvent = new EventEmitter<{ taskId: string; todoId: string }>()
  @Output() updateTaskEvent = new EventEmitter<{
    taskId: string
    todoId: string
    model: UpdateTaskModel
  }>()

  taskStatusEnum = TaskStatusEnum
  newTitle = ''
  editMode = false

  removeTaskHandler() {
    this.removeTaskEvent.emit({ todoId: this.task.todoListId, taskId: this.task.id })
  }

  changeTaskStatusHandler(event: MouseEvent) {
    const newStatus = (event.currentTarget as HTMLInputElement).checked
    this.changeTask({ status: newStatus ? TaskStatusEnum.COMPLETED : TaskStatusEnum.ACTIVE })
  }

  activateEditModeHandler() {
    this.editMode = true
    this.newTitle = this.task.title
  }

  editTitleHandler() {
    this.changeTask({ title: this.newTitle })
    this.newTitle = ''
    this.editMode = false
  }

  changeTask(patch: Partial<UpdateTaskModel>) {
    const model: UpdateTaskModel = {
      status: this.task.status,
      title: this.task.title,
      completed: this.task.completed,
      startDate: this.task.startDate,
      priority: this.task.priority,
      description: this.task.description,
      deadline: this.task.deadline,
      ...patch,
    }

    this.updateTaskEvent.emit({ todoId: this.task.todoListId, taskId: this.task.id, model })
  }
}
