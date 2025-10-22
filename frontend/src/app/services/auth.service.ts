import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login.model';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth.model';
import { Router } from '@angular/router';
import { normalizePhoto } from '../util/photo.util';
import { UserEvent } from '../events/user.event';

const TOKEN_KEY = 'app_token';
const EXPIRES_KEY = 'app_token_expires';
const USER_KEY = 'app_user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private base = environment.apiUrl;

  constructor (
    private http: HttpClient,
    private router: Router
  ) {}

  login(login: Login): Observable<Auth> {
    return this.http.post<Auth>(`${this.base}/v1/auth/login`, login);
  }

  setSession(auth: Auth): void {
    localStorage.setItem(TOKEN_KEY, auth.accessToken);
    localStorage.setItem(EXPIRES_KEY, auth.expiresAt);

    const photoDataUrl = normalizePhoto(auth.photoData, 'image/png');
    this.setUser(auth.userId, auth.surname, photoDataUrl)
  }

  setUser(userId: string, surname: string, photo: string | null): void {
    localStorage.setItem(USER_KEY, JSON.stringify({
      userId: userId,
      surname: surname,
      photo: photo
    }));
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    const expires = localStorage.getItem(EXPIRES_KEY);
    if (!token || !expires) return false;
    const expiresDate = new Date(expires);
    return new Date() < expiresDate;
  }

  getUser(): { userId: string; surname: string; photo: ArrayBuffer } | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    localStorage.removeItem(USER_KEY);
    this.router.navigateByUrl("/auth");
  }
}
