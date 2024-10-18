import { Routes } from '@angular/router';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { UsersComponent } from './pages/users/users.component';
import { NewUserComponent } from './pages/users/new-user/new-user.component';
import { LoginComponent } from './pages/login/login.component';
import { HolidaysComponent } from './pages/holidays/holidays.component';

export const routes: Routes = [
    
    { path: 'login', component: LoginComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'usuarios', component: UsersComponent },
    { path: 'holidays', component: HolidaysComponent },
    { path: 'usuarios/nuevo', component: NewUserComponent },
    { path: 'usuarios/editar/:idUser', component: NewUserComponent },
    { path: '**', component: UsersComponent },
];
