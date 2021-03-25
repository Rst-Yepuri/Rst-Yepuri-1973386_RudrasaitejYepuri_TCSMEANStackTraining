import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LoginAuthGuard } from './loginauthguard';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path:"\login", component:LoginComponent},
  {path:"\signUp",component:SignUpComponent},
  {path:"\dashboard", component:DashboardComponent,canActivate:[LoginAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
