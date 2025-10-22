import { Component } from '@angular/core';
import { TabTaskLayoutComponent } from "../../layouts/tab-task-layout/tab-task-layout.component";
import { Task } from '../../models/task.model';
import { PageNotificationType } from '../../enum/page-notification-type.enum';
import { TabTaskLayoutBaseComponent } from '../../layouts/tab-task-layout/tab-task-layout-base.component';

@Component({
  selector: 'app-favorites-page-component',
  imports: [TabTaskLayoutComponent],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.scss'
})
export class FavoritesPage extends TabTaskLayoutBaseComponent {
  public override eventFavoritedTask(): void {
    this.taskEvent.onFavoritedTask().subscribe(([id, favorited]) => {
      if (favorited) {
        this.getTaskById(id);
      } else {
        this.tasks = this.tasks.filter(t => t.id !== id);
      }
    })
  }

  public override getTasks(): void {
    let completed = this.getCompleted();
    this.taskService.getTaskFavorited(completed).subscribe({
      next: (tasks: Task[]) => this.tasks = tasks,
      error: (err) => {
        const msg = err?.error?.detail ?? err?.message ?? 'Erro ao buscar as tarefas favoritas.';
        this.pagesEvent.emitNotificationActivation(PageNotificationType.Error, msg)
      }
    })
  }
}
