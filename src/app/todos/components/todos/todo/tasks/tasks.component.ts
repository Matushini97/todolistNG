import { Component, Input, OnInit, inject } from '@angular/core'
import { Observable, combineLatest, map } from 'rxjs'
import { TaskStatusEnum } from 'src/app/core/enums/taskStatus.enum'
import { Task, UpdateTaskModel } from 'src/app/todos/models/tasks.modules'
import { TasksService } from 'src/app/todos/services/tasks.service'
import { TodosService } from 'src/app/todos/services/todos.service'

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
  private todosService = inject(TodosService)

  ngOnInit(): void {
    this.tasks$ = combineLatest([this.tasksService.tasks$, this.todosService.todos$]).pipe(
      map(res => {
        const tasks = res[0]
        let tasksForTodo = tasks[this.todoId]
        const todos = res[1]

        const activeTodo = todos.find(tl => tl.id === this.todoId)
        if (activeTodo?.filter === 'completed') {
          tasksForTodo = tasksForTodo.filter(t => t.status === TaskStatusEnum.COMPLETED)
        }
        if (activeTodo?.filter === 'active') {
          tasksForTodo = tasksForTodo.filter(t => t.status === TaskStatusEnum.ACTIVE)
        }

        return tasksForTodo
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
