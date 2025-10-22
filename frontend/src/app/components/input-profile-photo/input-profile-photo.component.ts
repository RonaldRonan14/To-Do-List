import { Component, ElementRef, forwardRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { dataURLToFile } from '../../util/photo.util';

@Component({
  selector: 'app-input-profile-photo-component',
  imports: [],
  templateUrl: './input-profile-photo.component.html',
  styleUrl: './input-profile-photo.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputProfilePhotoComponent),
      multi: true
    }
  ]
})
export class InputProfilePhotoComponent implements ControlValueAccessor {
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;
  imageDefault = 'img/persona-default.jpg';
  preview: string = this.imageDefault;
  file: File | null = null;
  disabled = false;

  private onChange: (v: File | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(obj: File | string | null): void { 
    if (!obj) {
      this.clearPreview();
      return;
    }

    if (obj instanceof File) {
      this.file = obj;
      this.readFileToPreview(obj);
      this.onChange(this.file);
    } else {
      this.file = dataURLToFile(obj);
      this.preview = obj;
      this.onChange(dataURLToFile(obj));
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = !!isDisabled;
  }

  openPicker() {
    if (this.disabled) return;
    this.fileInput?.nativeElement.click();
  }

  onFileChange(ev: Event) {
    if (this.disabled) return;
    const input = ev.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const f = input.files[0];
    this.file = f;

    this.readFileToPreview(f, () => {
      this.onChange(this.file);
    });
  }

  remove() {
    this.clearPreview();
    if (this.fileInput) this.fileInput.nativeElement.value = '';
    this.onChange(null);
  }

  onBlur() {
    this.onTouched();
  }

  private readFileToPreview(file: File, cb?: () => void) {
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = String(reader.result ?? this.imageDefault);
      cb?.();
    };
    reader.onerror = () => {
      this.preview = this.imageDefault;
      cb?.();
    };
    reader.readAsDataURL(file);
  }

  private clearPreview() {
    this.file = null;
    this.preview = this.imageDefault;
  }
}
