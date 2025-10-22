import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Task } from '../models/task.model';
import { TabTaskType } from '../enum/tab-task-type.enum';

@Injectable({
  providedIn: 'root'
})
export class TaskEvent {
  private _buttonTaskClick = new Subject<string>();
  private _changeTabTask = new BehaviorSubject<TabTaskType>(TabTaskType.InProgress);
  private _createdTask = new Subject<Task>();
  private _updateTask = new Subject<Task>();
  private _deleteTask = new Subject<string>();
  private _favoritedTask = new Subject<[string, boolean]>();
  private _completedTask = new BehaviorSubject<[string, boolean]>(["", false]);

  emitButtonTaskClick(id: string): void { this._buttonTaskClick.next(id); }
  onButtonTaskClick(): Observable<string> { return this._buttonTaskClick.asObservable(); }

  emitChangeTabTask(tab: TabTaskType): void { this._changeTabTask.next(tab); }
  onChangeTabTask(): Observable<TabTaskType> { return this._changeTabTask.asObservable(); }

  emitCreatedTask(task: Task): void { this._createdTask.next(task); }
  onCreatedTask(): Observable<Task> { return this._createdTask.asObservable(); }

  emitUpdateTask(task: Task): void { this._updateTask.next(task) }
  onUpdateTask(): Observable<Task> { return this._updateTask.asObservable() }

  emitDeleteTask(id: string): void { this._deleteTask.next(id) }
  onDeleteTask(): Observable<string> { return this._deleteTask.asObservable() }

  emitFavoritedTask(id: string, favorited: boolean): void { this._favoritedTask.next([id, favorited]) }
  onFavoritedTask(): Observable<[string, boolean]> { return this._favoritedTask.asObservable() }

  emitCompletedTask(id: string, completed: boolean): void { this._completedTask.next([id, completed]) }
  onCompletedTask(): Observable<[string, boolean]> { return this._completedTask.asObservable() }
}
