import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmploymentRoutingModule } from './employment-routing.module';
import { EmploymentListComponent } from './employment-list/employment-list.component';
import { EmploymentFormComponent } from './employment-form/employment-form.component';


@NgModule({
  declarations: [
    EmploymentListComponent,
    EmploymentFormComponent
  ],
  imports: [
    CommonModule,
    EmploymentRoutingModule
  ],
  exports: [EmploymentListComponent]
})
export class EmploymentModule { }
