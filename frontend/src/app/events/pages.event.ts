import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MenuType } from '../enum/menu-type.enum';
import { PageNotificationType } from '../enum/page-notification-type.enum';

@Injectable({
  providedIn: 'root'
})
export class PagesEvent {
  private _changePage = new BehaviorSubject<MenuType>(MenuType.MyDay);
  private _notificationActivation = new Subject<[PageNotificationType, string]>();

  emitChangePage(menu: MenuType): void { this._changePage.next(menu); }
  onChangePage(): Observable<MenuType> { return this._changePage.asObservable(); }

  emitNotificationActivation(typeNotification: PageNotificationType, message: string): void { this._notificationActivation.next([typeNotification, message]); }
  onNotificationActivation(): Observable<[PageNotificationType, string]> { return this._notificationActivation.asObservable(); }
}