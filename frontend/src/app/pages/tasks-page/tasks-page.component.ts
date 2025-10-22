import { Component } from '@angular/core';
import { TabTaskLayoutComponent } from "../../layouts/tab-task-layout/tab-task-layout.component";
import { Task } from '../../models/task.model';
import { PageNotificationType } from '../../enum/page-notification-type.enum';
import { TabTaskLayoutBaseComponent } from '../../layouts/tab-task-layout/tab-task-layout-base.component';

@Component({
  selector: 'app-tasks-page-component',
  imports: [TabTaskLayoutComponent],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.scss'
})
export class TasksPage extends TabTaskLayoutBaseComponent {
  public override getTasks(): void {
    let completed = this.getCompleted();
    this.taskService.getTaskCompleted(completed).subscribe({
      next: (tasks: Task[]) => this.tasks = tasks,
      error: (err) => {
        const msg = err?.error?.detail ?? err?.message ?? 'Erro ao buscar as tarefas do dia.';
        this.pagesEvent.emitNotificationActivation(PageNotificationType.Error, msg)
      }
    })
  }
}