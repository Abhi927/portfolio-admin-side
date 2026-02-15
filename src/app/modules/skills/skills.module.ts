import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillsRoutingModule } from './skills-routing.module';
import { SkillListComponent } from './skill-list/skill-list.component';
import { SkillFormComponent } from './skill-form/skill-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SkillListComponent,
    SkillFormComponent,
    
  ],
  imports: [
    CommonModule,
    SkillsRoutingModule,
    ReactiveFormsModule
  ],
  exports: [SkillListComponent]
})
export class SkillsModule { }
