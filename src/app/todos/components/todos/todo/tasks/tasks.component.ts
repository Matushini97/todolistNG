import { Component, Input, OnInit, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { Task } from 'src/app/todos/models/tasks.modules'
import { TasksService } from 'src/app/todos/services/tasks.service'

@Component({
  selector: 'todo-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string

  tasks$?: Observable<Task[]>
  private tasksService = inject(TasksService)

  ngOnInit(): void {
    this.tasks$ = this.tasksService.getTodos(this.todoId)
  }
}
