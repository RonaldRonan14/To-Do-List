import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TaskEvent } from '../../events/task.event';
import { Task, TaskCreate, TaskModeCreate } from '../../models/task.model';
import { PagesEvent } from '../../events/pages.event';
import { TaskService } from '../../services/task.service';
import { PageNotificationType } from '../../enum/page-notification-type.enum';
import { TabTaskType } from '../../enum/tab-task-type.enum';
import { MenuType } from '../../enum/menu-type.enum';

@Component({
  selector: 'app-create-task-component',
  imports: [],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent implements OnInit, AfterViewChecked {
  createMode: boolean = false;
  value: string = '';
  tabSelected!: TabTaskType;
  menuSelected!: MenuType;
  modeCreate: TaskModeCreate = {
    completed: null,
    favorited: null,
    today: null
  }

  @ViewChild('inputAdd') inputEl?: ElementRef<HTMLInputElement>;

  constructor(
    private taskEvent: TaskEvent,
    private pagesEvent: PagesEvent,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.pagesEvent.onChangePage().subscribe((menu) => {
      this.menuSelected = menu;
      this.taskEvent.emitChangeTabTask(TabTaskType.InProgress);
    })
    this.taskEvent.onChangeTabTask().subscribe((tab) => {
      this.tabSelected = tab;
      this.value = '';
    })
  }

  setModeCreate(): void {
    this.modeCreate.completed = null;
    this.modeCreate.favorited = null;
    this.modeCreate.today = null;

    switch (this.menuSelected) {
      case MenuType.MyDay:
        this.modeCreate.today = true;
        break;
      case MenuType.Favorites:
        this.modeCreate.favorited = true;
        break;
      default:
        this.modeCreate.today = null;
        this.modeCreate.favorited = null;
    }

    switch (this.tabSelected) {
      case TabTaskType.Completed:
        this.modeCreate.completed = true;
        break;
      case TabTaskType.InProgress:
        this.modeCreate.completed = false;
    }
  }

  ngAfterViewChecked(): void {
    if (this.createMode && this.inputEl) {
      this.inputEl.nativeElement.focus();
    }
  }

  inputValue(value: string): void { this.value = value; }

  changeMode(): void { this.createMode = !this.createMode; }

  blurInput(): void {
    if (this.value.length === 0) {
      this.createMode = false;
    }
  }

  keypressInput(value: number): void {
    if (value === 13) {
      this.createTask();
    }
  }

  createTask(): void {
    if (!this.value || this.value.trim().length === 0) {
      this.pagesEvent.emitNotificationActivation(
        PageNotificationType.Error,
        "O título da tarefa é obrigatório."
      )
      return;
    }

    const newTask: TaskCreate = { title: this.value.trim() };

    this.setModeCreate();
    this.taskService.createTask(this.modeCreate, newTask).subscribe({
      next: (task: Task) => {
        this.taskEvent.emitCreatedTask(task);
        this.value = '';
      },
      error: (err) => {
        const msg = err?.error?.detail ?? err?.message ?? 'Erro ao criar tarefa.';
        this.pagesEvent.emitNotificationActivation (PageNotificationType.Error, msg);
      } 
    })
  }
}
