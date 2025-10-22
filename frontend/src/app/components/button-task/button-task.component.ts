import { Component, Input } from '@angular/core';
import { TaskEvent } from '../../events/task.event';
import { ButtonFavoriteComponent } from "../button-favorite/button-favorite.component";

@Component({
  selector: 'app-button-task-component',
  imports: [ButtonFavoriteComponent],
  templateUrl: './button-task.component.html',
  styleUrl: './button-task.component.scss'
})
export class ButtonTaskComponent {
  @Input() id!: string;
  @Input() favorited: boolean = false;
  @Input() text: string = '';

  constructor (private event: TaskEvent) {}

  displayTask() { this.event.emitButtonTaskClick(this.id); }
}
