import { Component, Input, OnInit } from '@angular/core';
import { CreateTaskComponent } from "../../components/create-task/create-task.component";
import { ButtonTaskComponent } from "../../components/button-task/button-task.component";
import { Task } from '../../models/task.model';
import { TabTaskType } from '../../enum/tab-task-type.enum';
import { TaskEvent } from '../../events/task.event';
import { PagesEvent } from '../../events/pages.event';
import { TaskService } from '../../services/task.service';
import { PageNotificationType } from '../../enum/page-notification-type.enum';

@Component({
  selector: 'app-tab-task-layout-component',
  imports: [
    CreateTaskComponent, 
    ButtonTaskComponent
  ],
  templateUrl: './tab-task-layout.component.html',
  styleUrl: './tab-task-layout.component.scss'
})
export class TabTaskLayoutComponent implements OnInit {
  @Input() tasks: Task[] = [];
  tabTaskType = TabTaskType;
  selectedTab: TabTaskType = TabTaskType.InProgress;

  constructor (
      private taskEvent: TaskEvent,
      private pagesEvent: PagesEvent,
      private taskService: TaskService
    ) {}

  ngOnInit(): void {
    this.taskEvent.onCreatedTask().subscribe(task => {
      this.tasks.push(task);
    });
  }

  changeTab(tab: TabTaskType): void {
    this.selectedTab = tab;
    this.taskEvent.emitChangeTabTask(this.selectedTab);
  }

  onDragStart(id: string, ev: DragEvent): void {
    ev.dataTransfer?.setData('text/plain', String(id));
    ev.dataTransfer!.effectAllowed = 'move';
    document.body.classList.add('dragging');
  }

  onDragEnd(): void {
    document.body.classList.remove('dragging');
  }

  onDragOver(ev: DragEvent): void {
    ev.preventDefault();
    ev.dataTransfer!.dropEffect = 'move';
  }

  onDrop(ev: DragEvent, tab: TabTaskType): void {
    ev.preventDefault();
    const idStr = ev.dataTransfer?.getData('text/plain');
    if (!idStr) return;
    this.moveTaskToTab(idStr, tab);
  }

  private moveTaskToTab(id: string, tab: TabTaskType): void {
    let mark = tab === TabTaskType.Completed ? true : false;
    this.taskService.markCompleted(id, mark).subscribe({
      next: () => this.taskEvent.emitCompletedTask(id, mark),
      error: (err) => {
        const msg = err?.error?.detail ?? err?.message ?? 'Erro concluir a tarefa.';
        this.pagesEvent.emitNotificationActivation(PageNotificationType.Error, msg)
      }
    })
  }
}
