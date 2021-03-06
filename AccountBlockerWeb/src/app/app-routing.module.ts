import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { RegisterComponent } from 'src/app/register/register.component';
import { HomeComponent } from 'src/app/home/home.component';
import { MultiUserAlertComponent } from 'src/app/multiUserAlert/multiUserAlert.component';
import { MultiAccountErrorComponent } from 'src/app/multiAccountError/multiAccountError.component';
import { AuthGuard } from 'src/app/helpers/authguard';
const routes: Routes = [
  {path:"login",component:LoginComponent, pathMatch: 'full'},
  {path:"register",component:RegisterComponent, pathMatch: 'full'},
  {path:"multiConnectionError",component:MultiUserAlertComponent, pathMatch: 'full'},
  {path:"multiAccountError",component:MultiAccountErrorComponent, pathMatch: 'full'},
  
  {path:"",component:HomeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
