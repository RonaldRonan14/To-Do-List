import { Component, OnInit } from '@angular/core';
import { TaskEvent } from '../../events/task.event';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { PagesEvent } from '../../events/pages.event';
import { PageNotificationType } from '../../enum/page-notification-type.enum';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notifications-component',
  imports: [DatePipe],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private taskEvent: TaskEvent,
    private taskService: TaskService,
    private pagesEvent: PagesEvent,
  ) { }

  ngOnInit(): void {
    this.getTaskExpired();
    this.taskEvent.onUpdateTask().subscribe(() => {
      this.getTaskExpired();
    })
    this.taskEvent.onCompletedTask().subscribe(() => {
      this.getTaskExpired();
    })
  }

  getTaskExpired(): void {
    this.taskService.getTaskExpired().subscribe({
      next: (tasks: Task[]) => this.tasks = tasks,
      error: (err) => {
        const msg = err?.error?.detail ?? err?.message ?? 'Erro ao buscar as tarefas vencidas.';
        this.pagesEvent.emitNotificationActivation(PageNotificationType.Error, msg)
      } 
    });
  }

  displayTask(id: string) { this.taskEvent.emitButtonTaskClick(id); }
}
