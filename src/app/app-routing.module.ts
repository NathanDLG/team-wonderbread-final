import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_helpers';
//@ts-ignore
import { CalendarComponent } from './calendar';
import { HomeComponent } from './Home';
import { SearchComponent } from './search';
import { MyCalendarsComponent } from './my-calendars/my-calendars.component';
import { NewCalendarComponent } from './new-calendar/new-calendar.component';

const routes: Routes = [
  //add the home component/page here like this below
  //{path: '', component: HomeComponent, canActivate: [AuthGuard] },

  { path: 'calendar', component: CalendarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'my_calendars', component: MyCalendarsComponent },
  { path: 'new-calendar', component: NewCalendarComponent },
  //{ path: '', redirectTo: '/calendar', pathMatch: 'full'},
  //otherwise redirect back to whatever the home page is
  //{ path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
