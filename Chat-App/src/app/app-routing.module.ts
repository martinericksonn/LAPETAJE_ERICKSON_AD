import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
import { SignUpComponent } from './screens/sign-up/sign-up.component';
import { UserProfileComponent } from './screens/user-profile/user-profile.component';
import { WelcomeComponent } from './screens/welcome/welcome.component';
import { AuthGuard } from './shared/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
    ],
  },
  {
    path: 'profile/:id',
    canActivate: [AuthGuard],
    component: UserProfileComponent,
  },
  // {
  //   path: 'user',
  //   canActivate: [AuthGuard],
  //   component: UserProfileComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
