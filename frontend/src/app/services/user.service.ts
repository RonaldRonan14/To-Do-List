import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUser, UpdateUser, User } from '../models/user.model';
import { normalizePhoto } from '../util/photo.util';

const USER_KEY = 'app_user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private base = environment.apiUrl;

  constructor (private http: HttpClient) {}

  setUpdateUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify({
      userId: user.id,
      surname: user.surname,
      photo: normalizePhoto(user.photoData)
    }));
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.base}/v1/Users/${id}`);
  }

  createUser(user: CreateUser): Observable<User> {
    const fd = new FormData();
    fd.append('Email', user.email);
    fd.append('Password', user.password);
    fd.append('Surname', user.surname);
    if (user.photoData) {
      fd.append('PhotoData', user.photoData, user.photoData.name);
    }
    return this.http.post<User>(`${this.base}/v1/Users`, fd);
  }

  updateUser(user: UpdateUser): Observable<User> {
    const fd = new FormData();
    fd.append('Email', user.email);
    if (user.password != null) fd.append('password', user.password);
    if (user.currentPassword != null) fd.append('currentPassword', user.currentPassword);
    fd.append('Surname', user.surname);
    if (user.photoData) {
      fd.append('PhotoData', user.photoData, user.photoData.name);
    }
    return this.http.put<User>(`${this.base}/v1/Users`, fd)
  }
}
