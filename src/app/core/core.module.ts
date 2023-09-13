import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpOptionsInterceptor } from './interceptors/http-options.interceptor'
import { HTTP_INTERCEPTORS } from '@angular/common/http'

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpOptionsInterceptor, multi: true }],
})
export class CoreModule {}
