import { Component, OnInit } from '@angular/core';
import { SaveSkill } from '../skill-formsave';
import { SkillService } from '../skill.service';
import { responseSkill } from '../skil-response';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { SkillSharedService } from '../skill-sharedservice';
@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrl: './skill-list.component.css'
})
export class SkillListComponent implements OnInit {
  skills$!: Observable<responseSkill[]>;
  itemsPerPage = 5;
  totalPagesCount = 0;
  paginatedSkills$!: Observable<responseSkill[]>;
  currentPage$ = new BehaviorSubject<number>(1);
  constructor(private skillService: SkillService,private skillSharedService: SkillSharedService) { }
  ngOnInit() {
      this.skills$ = this.skillService.getSkills();

    // paginated list
    // total pages count
    this.skills$.subscribe(skills => {
      this.totalPagesCount = Math.ceil(
        skills.length / this.itemsPerPage
      );
    });

    // paginated skills
    this.paginatedSkills$ = combineLatest([
      this.skills$,
      this.currentPage$
    ]).pipe(
      map(([skills, page]) => {
        const start = (page - 1) * this.itemsPerPage;
        return skills.slice(start, start + this.itemsPerPage);
      })
    );

   }

/** page change */
changePage(page: number) {
  if (page < 1) return;

  this.currentPage$.next(page);
}

  prevPage() {
    if (this.currentPage$.value > 1) {
      this.currentPage$.next(this.currentPage$.value - 1);
    }
  }

  nextPage() {
    if (this.currentPage$.value < this.totalPagesCount) {
      this.currentPage$.next(this.currentPage$.value + 1);
    }
  }


  edit(item: responseSkill) {
    this.skillSharedService.setSkill(item);
    this.openAddSkill();
  }

  delete(item:responseSkill ) {
    
  }
//logic for add skill modal

    showAddModal = false;

  openAddSkill() {
    this.showAddModal = true;
  }

  closeAddSkill() {
    this.showAddModal = false;
  }

  onSkillSave(skill:SaveSkill) {
    this.skillService.addSkill(skill).subscribe({
      next: (response) => {
        console.log('Skill added successfully:', response); 
        this.closeAddSkill();
      },
      error: (error) => { 
        if (error.status === 409) {
          alert('Skill with this name already exists. Please choose a different name.');
        } else {
          //console.error('Error adding skill:', error);
          alert('An error occurred while adding the skill. Please try again later.');
        }
      }
   });
   
  }
  onSkillUpdate({id, skill}: {id: number, skill: SaveSkill}) {
    this.skillService.updateSkill(id, skill).subscribe();
    this.closeAddSkill();
  }





  showModal = false;
selectedSkillId!: number;

openDeleteModal(id: number) {
  this.selectedSkillId = id;
  this.showModal = true;
}

closeModal() {
  this.showModal = false;
}

confirmDelete() {
  this.skillService.deleteSkill(this.selectedSkillId).subscribe(() => {
    this.closeModal();
    this.skills$ = this.skillService.getSkills();
  });
  
}
}
