import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { PagesEvent } from '../../events/pages.event';
import { MenuType } from '../../enum/menu-type.enum';
import { AuthService } from '../../services/auth.service';
import { UserEvent } from '../../events/user.event';
import { normalizePhoto } from '../../util/photo.util';

@Component({
  selector: 'app-aside-component',
  imports: [RouterLink],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent implements OnInit {
  selectedMenu: string = 'my-day';
  menuType = MenuType;
  user!: any;

  constructor(
    private pagesEvent: PagesEvent,
    private authService: AuthService,
    private userEvent: UserEvent
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.userEvent.onUser().subscribe((user) => {
      if (user == null) return;
      const photoDataUrl = normalizePhoto(user.photoData, 'image/png');
      this.authService.setUser(user.id, user.surname, photoDataUrl)
      this.user = this.authService.getUser();
    })
  }

  logout(): void {
    this.authService.logout();
  }

  changeMenu(menu: MenuType): void {
    this.selectedMenu = menu;
    this.pagesEvent.emitChangePage(menu);
  }
}
