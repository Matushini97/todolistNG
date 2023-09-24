import { Component, OnInit, inject } from '@angular/core'
import { AuthService } from './core/services/auth.service'

@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService)

  ngOnInit(): void {
    this.authService.me()
  }
}
