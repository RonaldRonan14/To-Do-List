import { Component, Input } from '@angular/core';
import { PagesEvent } from '../../events/pages.event';
import { TaskService } from '../../services/task.service';
import { PageNotificationType } from '../../enum/page-notification-type.enum';
import { TaskEvent } from '../../events/task.event';

@Component({
  selector: 'app-button-favorite-component',
  imports: [],
  templateUrl: './button-favorite.component.html',
  styleUrl: './button-favorite.component.scss'
})
export class ButtonFavoriteComponent {
  @Input() id!: string;
  @Input() favorited!: boolean;

  constructor(
    private taskEvent: TaskEvent,
    private pagesEvent: PagesEvent,
    private taskService: TaskService
  ) { }

  setFavorited(): void {
    this.taskService.setFavorited(this.id).subscribe({
      next: (value: any) => {
        this.taskEvent.emitFavoritedTask(this.id, value.favorited);
      },
      error: (err) => {
        const msg = err?.error?.detail ?? err?.message ?? 'Erro ao favoritar a tarefa.';
        this.pagesEvent.emitNotificationActivation(PageNotificationType.Error, msg)
      }
    })
  }
}
