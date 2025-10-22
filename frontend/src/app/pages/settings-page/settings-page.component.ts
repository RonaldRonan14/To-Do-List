import { Component, OnInit } from '@angular/core';
import { InputPasswordComponent } from "../../components/input-password/input-password.component";
import { InputProfilePhotoComponent } from "../../components/input-profile-photo/input-profile-photo.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonLoadingComponent } from "../../components/button-loading/button-loading.component";
import { PagesEvent } from '../../events/pages.event';
import { PageNotificationType } from '../../enum/page-notification-type.enum';
import { UpdateUser, User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { normalizePhoto } from '../../util/photo.util';
import { UserEvent } from '../../events/user.event';

@Component({
  selector: 'app-settings-page-component',
  imports: [
    InputPasswordComponent,
    InputProfilePhotoComponent,
    ButtonLoadingComponent,
    ReactiveFormsModule
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPage implements OnInit {
  loading = false;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pagesEvent: PagesEvent,
    private userEvent: UserEvent,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      surname: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      currentPassword: [null],
      password: [null],
      photoData: [null]
    })

    const user = this.authService.getUser()
    const userId = user == null ? '' : user?.userId;
    this.userService.getUserById(userId).subscribe({
      next: (user: User) => {
        this.form.patchValue({
          surname: user.surname ?? '',
          email: user.email ?? '',
          photoData: normalizePhoto(user.photoData)
        });
      },
      error: (err) => {
        const msg = err?.error?.detail ?? err?.message ?? 'Erro ao encontrar seu usuário.';
        this.pagesEvent.emitNotificationActivation(PageNotificationType.Error, msg);
      }
    })
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

    const data: UpdateUser = this.form.value;

    if (data.password && !data.currentPassword) {
      this.pagesEvent.emitNotificationActivation(PageNotificationType.Error, "Informe a senha atual para trocar a senha.");
      return;
    }

    if (data.password && data.password.length < 6) {
      this.pagesEvent.emitNotificationActivation(PageNotificationType.Error, "A Senha deve conter no mínimo 6 digitos.");
    }

    this.userService.updateUser(data).subscribe({
      next: (user: User) => {
        this.userEvent.emitUser(user);
        this.pagesEvent.emitNotificationActivation(PageNotificationType.Success, "Informações alteradas com sucesso!");
        this.form.get('password')?.setValue(null);
        this.form.get('currentPassword')?.setValue(null);
      },
      error: (err) => {
        const msg = err?.error?.detail ?? err?.message ?? 'Erro ao atualizar seus dados.';
        this.pagesEvent.emitNotificationActivation(PageNotificationType.Error, msg);
      }
    })
  }
}
