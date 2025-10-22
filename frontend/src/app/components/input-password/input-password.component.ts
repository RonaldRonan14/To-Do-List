import { Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-password-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPasswordComponent),
      multi: true
    }
  ]
})
export class InputPasswordComponent implements ControlValueAccessor {
  seePassword = false;
  value = '';
  disabled = false;

  private onChange: (v: any) => void = () => { };
  private onTouched: () => void = () => { };

  writeValue(obj: any): void {
    this.value = obj ?? '';
  }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = !!isDisabled; }

  onInput(ev: Event) {
    const v = (ev.target as HTMLInputElement).value;
    this.value = v;
    this.onChange(v);
  }
  onBlur() { this.onTouched(); }

  toggleSeePassword() {
    if (this.disabled) return;
    this.seePassword = !this.seePassword;
    setTimeout(() => {
      const el = document.getElementById('input-password');
      (el as HTMLInputElement | null)?.focus();
    }, 0);
  }
}
