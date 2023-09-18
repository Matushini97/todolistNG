import { Component, Input } from '@angular/core'

@Component({
  selector: 'todo-todo-date',
  templateUrl: './todo-date.component.html',
  styleUrls: ['./todo-date.component.scss'],
})
export class TodoDateComponent {
  @Input() addedDate!: string
}
