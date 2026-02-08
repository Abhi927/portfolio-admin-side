import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';
const routes: Routes = [
   { path: 'login', component: LoginComponent },
  {
    path: '', component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'projects',
        loadChildren: () =>
          import('./modules/projects/projects.module')
            .then(m => m.ProjectsModule)
      },
      {
        path: 'skills',
        loadChildren: () =>
          import('./modules/skills/skills.module')
            .then(m => m.SkillsModule)
      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
