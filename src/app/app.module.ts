import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient,withInterceptorsFromDi } from '@angular/common/http';
import { DashboardModule } from './dashboard/dashboard.module';
import { LayoutModule } from './layout/layout.module';
import { AuthModule } from './auth/auth.module';
import { JwtInterceptor } from './shared/jwt.interceptor';
import { SkillsModule } from './modules/skills/skills.module';
import { EmploymentModule } from './modules/employment/employment.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { ClientsModule } from './modules/clients/clients.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    LayoutModule,
    AuthModule,
    SkillsModule,
    EmploymentModule,
    ProjectsModule,
    ClientsModule
   
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide:HTTP_INTERCEPTORS,
      useClass:JwtInterceptor, 
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
