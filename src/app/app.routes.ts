import { Routes } from '@angular/router';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { UsersComponent } from './pages/users/users.component';
import { NewUserComponent } from './pages/users/new-user/new-user.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    
    { path: 'calendar', component: CalendarComponent },
    { path: 'usuarios', component: UsersComponent },
    { path: 'usuarios/nuevo', component: NewUserComponent },
    { path: 'usuarios/editar/:idUser', component: NewUserComponent },
    { path: '**', component: UsersComponent },
    { path: 'login', component: LoginComponent },
];
