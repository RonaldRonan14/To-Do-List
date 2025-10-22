import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-button-loading-component',
  imports: [],
  templateUrl: './button-loading.component.html',
  styleUrl: './button-loading.component.scss'
})
export class ButtonLoadingComponent {
  @Input() loading: boolean = false;
  @Input() text: string = '';
  @Input() typeButton: string = 'btn-primary'
}
