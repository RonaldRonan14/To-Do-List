import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TaskCreate, TaskModeCreate, TaskUpdate } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private base = environment.apiUrl;

  constructor (private http: HttpClient) {}

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.base}/v1/tasks/${id}`);
  }

  getTaskToday(completed: boolean): Observable<Task[]> {
    let params = new HttpParams();
    params = params.set('today', 'true');
    params = params.set('completed', String(completed));
    return this.http.get<Task[]>(`${this.base}/v1/tasks/filter`, { params });
  }

  getTaskCompleted(completed: boolean): Observable<Task[]> {
    let params = new HttpParams();
    params = params.set('completed', String(completed));
    return this.http.get<Task[]>(`${this.base}/v1/tasks/filter`, { params });
  }

  getTaskFavorited(completed: boolean): Observable<Task[]> {
    let params = new HttpParams();
    params = params.set('favorited', 'true');
    params = params.set('completed', String(completed));
    return this.http.get<Task[]>(`${this.base}/v1/tasks/filter`, { params });
  }

  getTaskExpired(): Observable<Task[]> {
    let params = new HttpParams();
    params = params.set('expired', 'true');
    return this.http.get<Task[]>(`${this.base}/v1/tasks/filter`, { params });
  }

  createTask(mode: TaskModeCreate, task: TaskCreate): Observable<Task> {
    let params = new HttpParams();
    if (mode.today !== null) params = params.set('today', String(mode.today));
    if (mode.favorited !== null) params = params.set('favorited', String(mode.favorited));
    if (mode.completed !== null) params = params.set('completed', String(mode.completed));
    return this.http.post<Task>(`${this.base}/v1/tasks`, task, { params });
  }

  updateTask(id: string, task: TaskUpdate): Observable<Task> {
    if (task.dueDate?.length === 0) {
      task.dueDate = null;
    }
    return this.http.put<Task>(`${this.base}/v1/tasks/${id}`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/v1/tasks/${id}`);
  }

  setFavorited(id: string): Observable<boolean> {
    return this.http.patch<boolean>(`${this.base}/v1/tasks/${id}/favorited`, id);
  }

  markCompleted(id: string, completed: boolean): Observable<void> {
    return this.http.patch<void>(`${this.base}/v1/tasks/${id}/completed`, completed);
  }
}
