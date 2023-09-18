import { Component, Input, OnInit, inject } from '@angular/core'
import { Observable, map } from 'rxjs'
import { Task, UpdateTaskModel } from 'src/app/todos/models/tasks.modules'
import { TasksService } from 'src/app/todos/services/tasks.service'

@Component({
  selector: 'todo-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string

  tasks$?: Observable<Task[]>
  taskTitle = ''
  private tasksService = inject(TasksService)

  ngOnInit(): void {
    this.tasks$ = this.tasksService.tasks$.pipe(
      map(tasks => {
        return tasks[this.todoId]
      })
    )
    this.tasksService.getTasks(this.todoId)
  }

  addTaskHandler() {
    this.tasksService.addTask({ title: this.taskTitle, todoId: this.todoId })
    this.taskTitle = ''
  }

  removeTask(data: { todoId: string; taskId: string }) {
    this.tasksService.removeTask(data)
  }

  changeTask(data: { todoId: string; taskId: string; model: UpdateTaskModel }) {
    this.tasksService.updateTask(data)
  }
}
