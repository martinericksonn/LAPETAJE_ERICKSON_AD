import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { AboutUsComponent } from './screens/about-us/about-us.component';
import { LoginComponent } from './screens/login/login.component';
import { MessagesComponent } from './screens/messages/messages.component';
import { SignUpComponent } from './screens/sign-up/sign-up.component';
import { UserProfileComponent } from './screens/profile/user-profile.component';

import { WelcomeComponent } from './screens/welcome/welcome.component';

import { AuthGuard } from './shared/auth-guard.service';
import { ForgetPasswordComponent } from './screens/forget-password/forget-password.component';
import { NewMessageComponent } from './screens/messages/new-message/new-message.component';
import { MessageComponent } from './screens/messages/message/message.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    // component: SidebarComponent,
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
      {
        path: 'forget-password',
        component: ForgetPasswordComponent,
      },
    ],
  },
  {
    path: 't',
    component: SidebarComponent,
    // canActivate: [AuthGuard],
    data: { some_data: 'some value' },
    children: [
      {
        path: 'messages',
        // canActivate: [AuthGuard],
        component: MessagesComponent,
        children: [
          {
            path: 'new-message',
            // canActivate: [AuthGuard],
            component: NewMessageComponent,
          },
          // {
          //   path: ':id',
          //   // canActivate: [AuthGuard],
          //   component: MessageComponent,
          // },
        ],
      },
      {
        path: 'profile/:id',

        // canActivate: [AuthGuard],
        component: UserProfileComponent,
      },
      {
        path: 'about-tabi',
        // canActivate: [AuthGuard],
        component: AboutUsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
