import { Component, OnInit } from '@angular/core';
import { InputPasswordComponent } from "../../components/input-password/input-password.component";
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputProfilePhotoComponent } from "../../components/input-profile-photo/input-profile-photo.component";
import { ButtonLoadingComponent } from "../../components/button-loading/button-loading.component";
import { PageNotificationType } from '../../enum/page-notification-type.enum';
import { PageNotificationsComponent } from "../../components/page-notifications/page-notifications.component";
import { PagesEvent } from '../../events/pages.event';
import { CreateUser } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-page-component',
  imports: [
    InputPasswordComponent,
    RouterLink,
    ReactiveFormsModule,
    InputProfilePhotoComponent,
    ButtonLoadingComponent,
    PageNotificationsComponent
],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPage implements OnInit {
  loading = false;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pagesEvent: PagesEvent,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      surname: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      photoData: [null]
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

    const data: CreateUser = this.form.value;
    this.userService.createUser(data).subscribe({
      next: () => {
        this.pagesEvent.emitNotificationActivation(PageNotificationType.Success, "Cadastro realizado com sucesso!")
        setTimeout(() => {
          this.router.navigateByUrl("/auth");
        }, 2000)
      },
      error: (err) => {
        const msg = err?.error?.detail ?? err?.message ?? 'Erro ao criar o usuário.';
        this.pagesEvent.emitNotificationActivation(PageNotificationType.Error, msg)
      }
    })
  }
}
