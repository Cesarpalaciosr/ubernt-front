import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpClient,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private TOKEN = environment.token;
  private url = environment.localURL;
  constructor(private http: HttpClient) {}

  async getToken() {
    try {
      const token = await Preferences.get({ key: this.TOKEN });
      return token.value;
    } catch (error) {
      return    console.log(error);
    }
  }

  intercept(req: any, next: HttpHandler): Observable<HttpEvent<any>> {
    const excludedRoutes = [
      `${this.url}/auth/signin`,
      `${this.url}/auth/signup`
    ];

    if (excludedRoutes.includes(req.url)) {
      return next.handle(req);
    }

    return from(this.getToken()).pipe(
      switchMap((token: any) => {
        if (token) {
          const cloned = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          return next.handle(cloned);
        } else {
          return next.handle(req);
        }
      })
    );
  }
}