import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = localStorage.getItem('token');

    if (jwt) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt}`
        }
      });
    }
    return next.handle(req);
  }
}
