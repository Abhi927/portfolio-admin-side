import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SkillListComponent } from './modules/skills/skill-list/skill-list.component';
import { EmploymentListComponent } from './modules/employment/employment-list/employment-list.component';
import { ProjectListComponent } from './modules/projects/project-list/project-list.component';
import { ClientListComponent } from './modules/clients/client-list/client-list.component';
import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [
   { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login' },
  // {path:'skills',component:SkillListComponent},
  // {path:'employement',component:EmploymentListComponent},
  // {path:'project',component:ProjectListComponent},
  // {path:'clients',component:ClientListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
