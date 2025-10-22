import { Directive, OnInit } from "@angular/core";
import { PageNotificationType } from "../../enum/page-notification-type.enum";
import { PagesEvent } from "../../events/pages.event";
import { TaskEvent } from "../../events/task.event";
import { Task } from "../../models/task.model";
import { TaskService } from "../../services/task.service";
import { TabTaskType } from "../../enum/tab-task-type.enum";
import { MenuType } from "../../enum/menu-type.enum";
import { skip } from "rxjs";

@Directive()
export abstract class TabTaskLayoutBaseComponent implements OnInit {
  public tasks: Task[] = [];
  public tabSelected: TabTaskType = TabTaskType.InProgress;
  public menuSelected: MenuType = MenuType.MyDay;

  constructor(
    protected taskEvent: TaskEvent,
    protected pagesEvent: PagesEvent,
    protected taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.taskEvent.onChangeTabTask()
    .pipe(skip(1))
    .subscribe(tab => {
      this.tabSelected = tab;
      this.getTasks();
    })
    
    this.taskEvent.onCompletedTask().subscribe(([id, completed]) => {
      if (id.length === 0) return;
      if ((this.tabSelected == TabTaskType.InProgress && completed) ||
          (this.tabSelected == TabTaskType.Completed && !completed)) {
        this.tasks = this.tasks.filter(t => t.id !== id);
      } else if ((this.tabSelected == TabTaskType.InProgress && !completed) ||
       (this.tabSelected == TabTaskType.Completed && completed)) {
        this.getTaskById(id)
      }
    })

    this.taskEvent.onUpdateTask().subscribe((task) => {
      this.tasks = this.tasks.map(t => t.id === task.id ? task : t);
    });

    this.taskEvent.onDeleteTask().subscribe((id) => {
      this.tasks = this.tasks.filter(t => t.id !== id);
    })

    this.eventFavoritedTask();
    this.events();
  }

  protected eventFavoritedTask(): void {
    this.taskEvent.onFavoritedTask().subscribe(([id, favorited]) => {
      this.tasks = this.tasks.map(t => t.id === id ? { ...t, favorited } : t);
    })
  }

  public getTaskById(id: string): void {
    this.taskService.getTaskById(id).subscribe({
      next: (task: Task) => {
        if (!this.tasks.some(t => t.id === task.id)) {
          this.tasks.push(task);
        }
      },
      error: (err) => {
        const msg = err?.error?.detail ?? err?.message ?? 'Erro ao buscar a tarefa do dia.';
        this.pagesEvent.emitNotificationActivation(PageNotificationType.Error, msg)
      }
    })
  }

  public getCompleted(): boolean {
    const completed: boolean = this.tabSelected == TabTaskType.InProgress ? false : true;
    return completed;
  }

  public abstract getTasks(): void;
  protected events(): void {}
}