import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientFormComponent } from './client-form/client-form.component';


@NgModule({
  declarations: [
    ClientListComponent,
    ClientFormComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule
  ],
  exports: [ClientListComponent]
})
export class ClientsModule { }
