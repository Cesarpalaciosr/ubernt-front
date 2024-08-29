import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpClient,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { Observable, of ,from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  private TOKEN = environment.token;
  private url = environment.localURL;
  private ROLE = environment.role;
  private USERNAME = environment.username;
  private ID = environment.id
  private FULLNAME = environment.fullname;
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
  async isLoggedIn(): Promise<boolean> {
    const { value } = await Preferences.get({ key : this.TOKEN });
    return !!value;
  }

  async getRole(){
    const {value} = await Preferences.get({key : this.ROLE}) 
    return value;
  }
  async getFullname(){
    const {value} = await Preferences.get({key : this.FULLNAME}) 
    return value;
  }
  async getUsername(){
    const {value} = await Preferences.get({key : this.USERNAME}) 
    return value;
  }
  async getUserID(){
    const {value} = await Preferences.get({key : this.ID}) 
    return value;
  }

  storeImageUrl(imageUrl: string) {
    //endpoint de la imagen
    return this.http.post(`${this.url}/auth/updateprofile`, { imageUrl });
  }
  getProfilePicture(userId: string): Observable<string> {
    return this.http.post<{ profilePhoto?: string }>(`${this.url}/auth/finduser`, { _id: userId }).pipe(
      map(response => {
      if (response.profilePhoto && response.profilePhoto.trim() !=='') {
        return response.profilePhoto;
      }else {
        return '/assets/icon/profilepic.png';
      }     
      }),
      catchError(() => of('/assets/icon/profilepic.png')) // Reemplaza con la ruta de tu imagen por defecto
    );
  }
}