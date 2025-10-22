import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { AsideComponent } from "../../components/aside/aside.component";
import { SectionTaskComponent } from "../../components/section-task/section-task.component";
import { PagesEvent } from '../../events/pages.event';
import { MenuType } from '../../enum/menu-type.enum';
import { NotificationsComponent } from "../../components/notifications/notifications.component";
import { PageNotificationsComponent } from "../../components/page-notifications/page-notifications.component";

@Component({
  selector: 'app-default-layout-component',
  imports: [RouterOutlet, AsideComponent, SectionTaskComponent, NotificationsComponent, PageNotificationsComponent],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayout implements OnInit {
  title: string = 'Meu Dia';
  menu = MenuType;
  selectedMenu!: MenuType;
  date!: string;

  constructor(private event: PagesEvent) { }

  ngOnInit(): void {
    this.date = this.formatLongPtBr(new Date());
    this.selectedMenu = MenuType.MyDay;
    this.event.onChangePage().subscribe(menu => {
      this.titlePage(menu);
      this.selectedMenu = menu;
    })
  }

  private titlePage(menu: MenuType): void {
    switch (menu) {
      case MenuType.MyDay:
        this.title = 'Meu Dia';
        break
      case MenuType.Favorites:
        this.title = 'Favoritos';
        break
      case MenuType.Tasks:
        this.title = 'Tarefas';
        break
      case MenuType.Settings:
        this.title = 'Configurações';
        break
    };
  }

  private capitalize(s: string) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
  }

  private formatLongPtBr(date: Date | number = Date.now()): string {
  const d = typeof date === 'number' ? new Date(date) : date;
  const parts = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).formatToParts(d);

  const weekday = parts.find(p => p.type === 'weekday')?.value ?? '';
  const day = parts.find(p => p.type === 'day')?.value ?? '';
  const month = parts.find(p => p.type === 'month')?.value ?? '';
  const year = parts.find(p => p.type === 'year')?.value ?? '';

  return `${this.capitalize(weekday)}, ${day} de ${this.capitalize(month)} de ${year}`;
}
}
