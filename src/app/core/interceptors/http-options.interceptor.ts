import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment.development'

@Injectable()
export class HttpOptionsInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const modRequest = request.clone({
      headers: request.headers.set('api-key', environment.apiKey),
      // headers: new HttpHeaders().append('apiKey', environment['apiKey']),
      withCredentials: true,
    })
    return next.handle(modRequest)
  }
}
