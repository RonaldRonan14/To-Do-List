import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserEvent {
  private _user = new BehaviorSubject<User | null>(null);

  emitUser(user: User | null): void { this._user.next(user); }
  onUser(): Observable<User | null> { return this._user.asObservable() }
}
