import { Routes } from '@angular/router';
import { AuthPage } from './pages/auth-page/auth-page';
import { DefaultLayout } from './layouts/default-layout/default-layout.component';
import { MyDayPage } from './pages/my-day-page/my-day-page.component';
import { FavoritesPage } from './pages/favorites-page/favorites-page.component';
import { TasksPage } from './pages/tasks-page/tasks-page.component';
import { SettingsPage } from './pages/settings-page/settings-page.component';
import { RegisterPage } from './pages/register-page/register-page.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: 'auth', component: AuthPage },
    { path: "register", component: RegisterPage },
    {
        path: '',
        component: DefaultLayout,
        canActivate: [AuthGuard],
        children: [
            { path: "my-day", component: MyDayPage },
            { path: "favorites", component: FavoritesPage },
            { path: "tasks", component: TasksPage },
            { path: "settings", component: SettingsPage },
        ]
    },
    { path: '**', redirectTo: 'auth' }
];
