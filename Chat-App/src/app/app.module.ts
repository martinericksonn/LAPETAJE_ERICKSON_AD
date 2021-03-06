import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './screens/welcome/welcome.component';
import { LoginComponent } from './screens/login/login.component';
import { SignUpComponent } from './screens/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UserProfileComponent } from './screens/profile/user-profile.component';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { PERSISTENCE } from '@angular/fire/compat/auth';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { AuthGuard } from './shared/auth-guard.service';

import { GoogleAuthProvider } from 'firebase/auth';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MessagesComponent } from './screens/messages/messages.component';
import { AboutUsComponent } from './screens/about-us/about-us.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { DiaglogComponent } from './layout/diaglog/diaglog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogUpdateComponent } from './layout/dialog-update/dialog-update.component';
import { DialogProfileComponent } from './layout/dialog-profile/dialog-profile.component';
import { MessageComponent } from './screens/messages/message/message.component';
import { NewMessageComponent } from './screens/messages/new-message/new-message.component';

import { ForgetPasswordComponent } from './screens/forget-password/forget-password.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    SignUpComponent,
    UserProfileComponent,
    SidebarComponent,
    MessagesComponent,
    AboutUsComponent,
    DiaglogComponent,
    DialogUpdateComponent,
    DialogProfileComponent,
    MessageComponent,
    NewMessageComponent,

    ForgetPasswordComponent,
  ],

  imports: [
    AngularFireStorageModule,
    MatSidenavModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    LayoutModule,
    MatToolbarModule,
    MatListModule,
  ],

  providers: [
    { provide: PERSISTENCE, useValue: 'session' },
    AuthGuard,
    GoogleAuthProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
