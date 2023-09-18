import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TodosComponent } from './components/todos/todos.component'
import { TodosRoutingModule } from './todos-routing.module'
import { TodoComponent } from './components/todos/todo/todo.component'
import { FormsModule } from '@angular/forms';
import { TasksComponent } from './components/todos/todo/tasks/tasks.component';
import { TaskComponent } from './components/todos/todo/tasks/task/task.component';
import { TodoFiltersComponent } from './components/todos/todo/todo-filters/todo-filters.component';
import { TodoDateComponent } from './components/todos/todo/todo-date/todo-date.component'

@NgModule({
  declarations: [TodosComponent, TodoComponent, TasksComponent, TaskComponent, TodoFiltersComponent, TodoDateComponent],
  imports: [CommonModule, TodosRoutingModule, FormsModule],
  providers: [],
})
export class TodosModule {}
