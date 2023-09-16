import { Component, Input } from '@angular/core'
import { Task } from 'src/app/todos/models/tasks.modules'

@Component({
  selector: 'todo-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task?: Task

  removeTaskHandler() {
    return 1
  }
}
