import { Component } from '@angular/core';
import { TabTaskLayoutComponent } from "../../layouts/tab-task-layout/tab-task-layout.component";
import { Task } from '../../models/task.model';
import { PageNotificationType } from '../../enum/page-notification-type.enum';
import { isDueToday } from '../../util/date.util';
import { TabTaskLayoutBaseComponent } from '../../layouts/tab-task-layout/tab-task-layout-base.component';

@Component({
  selector: 'app-my-day-page-component',
  imports: [TabTaskLayoutComponent],
  templateUrl: './my-day-page.component.html',
  styleUrl: './my-day-page.component.scss'
})
export class MyDayPage extends TabTaskLayoutBaseComponent {
  public override events(): void {
    this.taskEvent.onUpdateTask().subscribe((task) => {
      if (task.dueDate == null || !isDueToday(task.dueDate)) {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      }
    })
  }

  public override getTasks(): void {
    let completed = this.getCompleted();
    this.taskService.getTaskToday(completed).subscribe({
      next: (tasks: Task[]) => this.tasks = tasks,
      error: (err) => {
        const msg = err?.error?.detail ?? err?.message ?? 'Erro ao buscar as tarefas do dia.';
        this.pagesEvent.emitNotificationActivation(PageNotificationType.Error, msg)
      } 
    })
  }
}
