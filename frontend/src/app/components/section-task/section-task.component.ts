import { Component, OnInit } from '@angular/core';
import { TaskEvent } from '../../events/task.event';
import { PagesEvent } from '../../events/pages.event';
import { ButtonFavoriteComponent } from "../button-favorite/button-favorite.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageNotificationType } from '../../enum/page-notification-type.enum';
import { Task, TaskUpdate } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { ButtonFinishComponent } from "../button-finish/button-finish.component";

@Component({
  selector: 'app-section-task-component',
  imports: [
    ButtonFavoriteComponent,
    ReactiveFormsModule,
    ButtonFinishComponent
],
  templateUrl: './section-task.component.html',
  styleUrl: './section-task.component.scss'
})
export class SectionTaskComponent implements OnInit {
  sectionOpen: boolean = false;
  form!: FormGroup;
  task!: Task;

  constructor(
    private taskEvent: TaskEvent,
    private pagesEvent: PagesEvent,
    private fb: FormBuilder,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      annotations: [null],
      dueDate: [null]
    })

    this.taskEvent.onButtonTaskClick().subscribe(id => {
      this.taskService.getTaskById(id).subscribe({
        next: (task: Task) => {
          this.sectionOpen = true;
          this.form.get('title')?.setValue(task.title);
          this.form.get('annotations')?.setValue(task.annotations);
          this.form.get('dueDate')?.setValue(task.dueDate?.substring(0, 10));
          this.task = task;
        },
        error: (err) => {
          const msg = err?.error?.detail ?? err?.message ?? 'Erro ao buscar a tarefa.';
          this.pagesEvent.emitNotificationActivation(PageNotificationType.Error, msg)
        }
      })
    });

    this.pagesEvent.onChangePage().subscribe(() => {
      this.sectionOpen = false;
    })

    this.taskEvent.onFavoritedTask().subscribe(([id, favorited]) => {
      if (this.sectionOpen) {
        this.task.favorited = favorited;
      }
    })
    
    this.taskEvent.onCompletedTask().subscribe(() => {
      if (this.sectionOpen) {
        this.task.completed = !this.task.completed;
      }
    })
  }

  closeSection(): void {
    this.sectionOpen = false;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.pagesEvent.emitNotificationActivation(
        PageNotificationType.Error,
        'Por favor corrija os campos obrigatórios.'
      );
      return;
    }

    const data: TaskUpdate = this.form.value;
    this.taskService.updateTask(this.task.id, data).subscribe({
      next: (task: Task) => {
        this.taskEvent.emitUpdateTask(task);
        this.closeSection();
        this.pagesEvent.emitNotificationActivation(PageNotificationType.Success, "Tarefa alterada com sucesso!")
      },
      error: (err) => {
        const msg = err?.error?.detail ?? err?.message ?? 'Erro ao salvar a tarefa.';
        this.pagesEvent.emitNotificationActivation(PageNotificationType.Error, msg)
      }
    })
  }

  delete(): void {
    if (!confirm("Deseja deletar esta tarefa?")) return;

    this.taskService.deleteTask(this.task.id).subscribe({
      next: () => {
        this.taskEvent.emitDeleteTask(this.task.id);
        this.closeSection();
        this.pagesEvent.emitNotificationActivation(PageNotificationType.Success, "Tarefa deletada com sucesso!")
      },
      error: (err) => {
        const msg = err?.error?.detail ?? err?.message ?? 'Erro ao deletar a tarefa.';
        this.pagesEvent.emitNotificationActivation(PageNotificationType.Error, msg)
      }
    })
  }
}
