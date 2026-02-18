import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SkillSharedService } from '../skill-sharedservice';
import { SkillService } from '../skill.service';
import { SaveSkill } from '../skill-formsave';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrl: './skill-form.component.css'
})
export class SkillFormComponent implements OnInit  {
isEditMode = false;
selectedSkillId!: number;

@Input() open = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  @Output() update = new EventEmitter<{id: number, skill: any}>();
  constructor(private fb: FormBuilder,private skillShared: SkillSharedService,private skillService: SkillService) { 
    
  }
  ngOnInit() {
      this.skillShared.skill$.subscribe(skill => {
    if (skill) {
      this.isEditMode = true;
      this.selectedSkillId = skill.id;

      this.skillForm.patchValue({
        name: skill.name,
        category: skill.category,
        level: skill.level,
        proficiency: skill.proficiency,
        iconUrl: skill.iconUrl || ''
      });
    } else {
      this.isEditMode = false;
      this.skillForm.reset({ level: 50, proficiency: 0 });
    }
  });
  }

  skillForm = this.fb.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    level: [50,Validators.required],
    proficiency: [0],
    iconUrl: ['']
  });

  closeModal() {
    this.close.emit();
    this.skillForm.reset({ level: 50, proficiency: 0 });
  }

  submit() {
    if (this.skillForm.valid && !this.isEditMode) {
      const SaveSkill = this.skillForm.value;
      console.log('Submitting skill:', SaveSkill);
      this.save.emit(SaveSkill); // 🔥 parent ko data
       this.skillForm.reset({ level: 50, proficiency: 0 });
    }
    else if (this.isEditMode && this.skillForm.valid) {
       const SaveSkill = this.skillForm.value;
       const id: number = this.selectedSkillId;
       this.update.emit({id, skill: SaveSkill});
     } 
     else {
       alert('Please fill in all required fields.');
     }
  }
  // submit() {
  //   if (this.skillForm.valid) {
  //     const SaveSkills = this.skillForm.value;

  //     if (this.isEditMode) {
  //       //this.update.emit({id: this.selectedSkillId, skill: SaveSkill});
  //       this.skillService.updateSkill(this.selectedSkillId,SaveSkills ).subscribe(
  //         {next: (response) => {
  //           console.log('Skill updated successfully:', response); 
  //            this.skillForm.reset({ level: 50, proficiency: 0 });
  //         },
  //         error: (error) => {
  //           console.error('Error updating skill:', error);
  //         }
  //       });
  //     } else {
  //      // this.save.emit(SaveSkill);
  //       this.skillService.addSkill(SaveSkills).subscribe({
  //         next: (response) => {
  //           console.log('Skill added successfully:', response); 
  //           this.skillForm.reset({ level: 50, proficiency: 0 });
  //     },
  //     error: (error) => {
  //       console.error('Error adding skill:', error);
  //     }
  //      });
  //     }
     
  //   } else {
  //     alert('Please fill in all required fields.');
  //   }
  // }
}