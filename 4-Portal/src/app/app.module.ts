himport { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './screens/register/register.component';
import { LoginComponent } from './screens/login/login.component';
import { HomeComponent } from './screens/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './screens/home/table/table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './screens/settings/settings.component';
import { DatabaseComponent } from './screens/database/database.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { StatisticsComponent } from './screens/statistics/statistics.component';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    TableComponent,
    NavbarComponent,
    SidebarComponent,
    DefaultLayoutComponent,
    SettingsComponent,
    DatabaseComponent,
    DashboardComponent,
    StatisticsComponent,
    FooterComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
