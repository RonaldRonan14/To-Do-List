import { Component, Input } from '@angular/core';
import { TaskEvent } from '../../events/task.event';
import { PagesEvent } from '../../events/pages.event';
import { TaskService } from '../../services/task.service';
import { PageNotificationType } from '../../enum/page-notification-type.enum';

@Component({
  selector: 'app-button-finish-component',
  imports: [],
  templateUrl: './button-finish.component.html',
  styleUrl: './button-finish.component.scss'
})
export class ButtonFinishComponent {
  @Input() id!: string;
  @Input() concludeMode: boolean = false;

  constructor(
    private taskEvent: TaskEvent,
    private pagesEvent: PagesEvent,
    private taskService: TaskService
  ) { }

  markCompleted(): void {
    this.taskService.markCompleted(this.id, this.concludeMode).subscribe({
      next: () => this.taskEvent.emitCompletedTask(this.id, this.concludeMode),
      error: (err) => {
        const msg = err?.error?.detail ?? err?.message ?? 'Erro concluir a tarefa.';
        this.pagesEvent.emitNotificationActivation(PageNotificationType.Error, msg)
      }
    })
  }
}
