import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';
import { AuthModule } from '../auth/auth.module';
import { SkillsModule } from '../modules/skills/skills.module';
import { EmploymentModule } from '../modules/employment/employment.module';
import { ProjectsModule } from '../modules/projects/projects.module';
import { ClientsModule } from '../modules/clients/clients.module';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    AuthModule,
    SkillsModule,
    EmploymentModule,
    ProjectsModule,
    ClientsModule
  ]
})
export class DashboardModule { }
