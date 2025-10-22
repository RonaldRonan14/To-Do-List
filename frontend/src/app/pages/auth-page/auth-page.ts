import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { PageNotificationType } from '../../enum/page-notification-type.enum';
import { PageNotificationsComponent } from "../../components/page-notifications/page-notifications.component";
import { InputPasswordComponent } from "../../components/input-password/input-password.component";
import { ButtonLoadingComponent } from "../../components/button-loading/button-loading.component";
import { PagesEvent } from '../../events/pages.event';
import { AuthService } from '../../services/auth.service';
import { Auth } from '../../models/auth.model';
import { Login } from '../../models/login.model';

@Component({
  selector: 'app-auth-page-component',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    PageNotificationsComponent,
    InputPasswordComponent,
    ButtonLoadingComponent
],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPage implements OnInit {
  loading = false;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pagesEvent: PagesEvent,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
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
    this.loading = true;
    const data: Login = this.form.value;

    this.authService.login(data).subscribe({
      next: (auth: Auth) => {
        this.authService.setSession(auth);
        this.router.navigateByUrl('/my-day');
      },
      error: (err) => {
        const msg = err?.error?.detail ?? err?.message ?? 'Erro ao processar o login.';
        this.pagesEvent.emitNotificationActivation(PageNotificationType.Error, msg);
        this.loading = false;
      }
    })
  }
}
