import { Component, OnInit } from '@angular/core';
import { PageNotificationType } from '../../enum/page-notification-type.enum';
import { PagesEvent } from '../../events/pages.event';

@Component({
  selector: 'app-page-notifications-component',
  imports: [],
  templateUrl: './page-notifications.component.html',
  styleUrl: './page-notifications.component.scss'
})
export class PageNotificationsComponent implements OnInit {
  pageNotificationType = PageNotificationType;
  typeNotification: PageNotificationType | null = null;
  message: string | null = null;

  constructor (private pagesEvent: PagesEvent) {}

  ngOnInit(): void {
    this.pagesEvent.onNotificationActivation().subscribe(([type, message]) => {
      this.typeNotification = type;
      this.message = message;
      setTimeout(() => {
        this.closeNotification();
      }, 3000)
    })
  }

  closeNotification(): void {
    this.typeNotification = null;
    this.message = null;
  }
}
