import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {from, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {StorageService} from '../services/storage.service';
import {AuthService} from '../services/auth.service';
import {User} from "firebase/auth";

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private storageService: StorageService,
    private authService: AuthService,
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return from(this.handle(req, next));
  }
  async handle(req: HttpRequest<any>, next: HttpHandler): Promise<any> {
    const customer = this.storageService.getKey('user-data');
    const token = customer && customer.stsTokenManager.accessToken;
    let request = req;
    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`,
          contentType: 'application/json',
        },
      });
    } else {
      console.warn('No token found');
    }
    return next
      .handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.authService.user$.next(<User><unknown>null);
            this.storageService.clear();
            this.router.navigateByUrl('/login');
          }
          return throwError(err);
        }),
      )
      .toPromise();
  }
}
